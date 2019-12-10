<?php
namespace NewsParserPlugin\Ajax;

use NewsParserPlugin\Controller\ListController;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Controller\VisualConstructorController;
use NewsParserPlugin\Controller\OptionsController;
use NewsParserPlugin\Traits\ValidateDataTrait;
use NewsParserPlugin\Traits\SanitizeDataTrait;
use NewsParserPlugin\Ajax\Ajax;


/**
 * Ajax singleton class provide API to the front end
 *
 * @package Ajax
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

class AjaxController extends Ajax
{
    protected $post;
    protected $list;
    protected $visual;
    protected $options;
    protected static $instance;

    use ValidateDataTrait;
    use SanitizeDataTrait;

    protected function __construct(ListController $listController,VisualConstructorController $visual,PostController $post, OptionsController $options)
    {
        $this->list = $listController;
        $this->visual  = $visual;
        $this->post=$post;
        $this->options=$options;
        $this->init();
    }
    public static function getInstance(ListController $listController,VisualConstructorController $visual,PostController $post,OptionsController $options)
    {
        if (self::$instance) {
            return self::$instance;
        } else {
            self::$instance = new self($listController, $visual,$post,$options);
            return self::$instance;
        }
    }
    protected function init()
    {
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API, array($this, 'parsingApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_MEDIA_API, array($this, 'mediaApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_OPTIONS_API, array($this, 'optionsApi'));

    }
    /**
     * Check if user have rights to publish posts and check nonce.
     *
     * @param string $nonce Nonce slug that was used.
     * @return \WP_Error|bool
     */
    protected function checkPermission($nonce){
        if (!\check_ajax_referer($nonce)||!\is_admin()) {
            return new \WP_Error('ajax_forbidden', Errors::text('NO_RIGHTS_TO_PUBLISH'));
        }
        return true;
    }
    public function getPostDataRaw($request){
        $page_url=$request['url'];
        return $this->visual->getRawHTML($page_url,array('remove_scripts'=>true));
    }
    
    public function mediaApi()
    {  
        $this->checkPermission('parsing_news_api');
        $json_post = json_decode(file_get_contents('php://input'),TRUE);
        $request=$this->prepareArgs($json_post,array(
                'url'=>array(
                    'description'=>esc_html__('Image url',NEWS_PARSER_PLUGIN_SLUG),
                    'type'=>'string',
                    'validate_callback'=>array($this,'validateImageUrl'),
                    'sanitize_callback'=>function($input_url){
                        return esc_url_raw($input_url);
                    }
                ),
                'options'=>array(
                    'description'=>esc_html__('Post body',NEWS_PARSER_PLUGIN_SLUG),
                    'type'=>'array',
                    'validate_callback'=>array($this,'validateMediaOptionsArray'),
                    'sanitize_callback'=>array($this,'sanitizeMediaOptionsArray')
                )
        ));
       $response=$this->visual->saveMedia($request['url'],$request['options']['postId'],$request['options']['alt']);
       echo $response;
        \wp_die();
    }

    public function optionsApi(){
        $this->checkPermission('parsing_news_api');
        $json_post=json_decode(file_get_contents('php://input'),TRUE);
        $request=$this->prepareArgs($json_post,array(
            'url'=>array(
                'description'=>'Url of post that was taken as example of template',
                'type'=>'string',
                'validate_callback'=>function($url){
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function($input_url){
                    return esc_url_raw($input_url);
                }
            ),
            'extraOptions'=>array(
                'description'=>'Extra options for automated parsing pages',
                'type'=>'array',
                'validate_callback'=>array($this,'validateExtraOptions'),
                'sanitize_callback'=>array($this,'sanitizeExtraOptions')
            ),
            'template'=>array(
                'description'=>'Template for automate parsing post',
                'type'=>'array',
                'validate_callback'=>array($this,'validateTemplate'),
                'sanitize_callback'=>array($this,'sanitizeTemplate')
            )
        ));
        $options=array(
            'extraOptions'=>$request['extraOptions'],
            'template'=>$request['template']
        );
        $respond=$this->options->save($request['extraOptions']['url'],$options);
        echo $respond;
        wp_die();
    }
    public function parsingApi()
    {
        $this->checkPermission('parsing_news_api');
        $request=$this->prepareArgs($_GET,array(
            'url'=>array(
                'description'=>esc_html__('Page url',NEWS_PARSER_PLUGIN_SLUG),
                'type'=>'string',
                'validate_callback'=>function($url){
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function($input_url){
                    return esc_url_raw($input_url);
                }
            ),
            'status'=>array(
                'description'=>esc_html__('Action status that should be applied.',NEWS_PARSER_PLUGIN_SLUG),
                'type'=>'string',
                'validate_callback'=>function($status){
                    if(strpos('list',$status)!==false) return 'list';
                    if(strpos('single',$status)!==false) return 'single';
                    if(strpos('multi',$status)!==false) return 'multi';
                    return false;
                },
                'sanitize_callback'=>function($status){
                    return sanitize_text_field($status);
                }
            )
        ));
        
            $status = $request['status'];
            $url = $request['url'];
        switch ($status) {
            case 'list':
                $response = $this->list->get($url);
                break;
            case 'single':
                $response = $this->visual->getRawHTML($url);
                break;
            case 'multi':
                $response=$this->post->get($url);
                break;
            default:
                $response='';
                break;
        }
        echo $response;
        \wp_die();
    }

}
