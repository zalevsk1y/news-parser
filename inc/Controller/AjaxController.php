<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Traits\ValidateDataTrait;
use NewsParserPlugin\Traits\SanitizeDataTrait;
use NewsParserPlugin\Ajax\Ajax;
use NewsParserPlugin\Interfaces\ControllersFactoryInterface;


/**
 * Ajax singleton class provide API to the front end
 *
 * @package Controller
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

class AjaxController extends Ajax
{
    /**
     * Factory instance for controllers.
     *
     * @var ControllersFactoryInterface
     */
    protected $controllersFactory;
    /**
     * Instance of this class
     *
     * @var AjaxController
     */
    protected static $instance;

    /**
     * Methods to validate input data.
     * 
     * @method validateUrl()
     * @method validateImageUrl()
     * @method validateMediaOptions()
     * @method validateExtraOptions()
     * @method validateTemplate()
     */
    use ValidateDataTrait;
    /**
     * Methods to sanitize input data.
     * 
     * @method sanitizeMediaOptionsArray()
     * @method sanitizeExtraOptions()
     * @method sanitizeTemplate()
     */
    use SanitizeDataTrait;
    /**
     * Init method
     *
     * @param ControllersFactoryInterface $controllersFactory Controller factory instance.
     * @return void
     */
    protected function __construct(ControllersFactoryInterface $controllersFactory)
    {
        $this->controllersFactory=$controllersFactory;
        $this->init();
    }
    /**
     * Singleton static method to get instance of class.
     *
     * @param ControllersFactoryInterface $controllersFactory Controller factory instance.
     * @return AjaxController
     */
    public static function getInstance(ControllersFactoryInterface $controllersFactory)
    {
       
        if (static::$instance) {
            var_dump(get_class(static::$instance));
            return static::$instance;
        } else {
            static::$instance = new static($controllersFactory);
            return static::$instance;
        }
    }
    /**
     * Add WP actions to use wp_ajax
     *
     * @return void
     */
    protected function init()
    {
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API, array($this, 'parsingApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_MEDIA_API, array($this, 'mediaApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_OPTIONS_API, array($this, 'optionsApi'));

    }
    /**
     * Check if user have relevant rights  and check nonce.
     *
     * @param string $nonce Nonce slug that was used.
     * @return true|\WP_Error
     */
    protected function checkPermission($nonce)
    {
        if (!\check_ajax_referer($nonce)||!\is_admin()) {
            return new \WP_Error('ajax_forbidden', Errors::text('NO_RIGHTS_TO_PUBLISH'));
        }
        return true;
    }
    /**
     * Callback that handles media api requests.
     * 
     * @uses ValidateDataTrait::validateImageUrl()
     * @uses ValidateDataTrait::validateMediaOptions()
     * @uses SanitizeDataTrait::sanitizeMediaOptions()
     * @uses Ajax::getJsonFromInput()
     * @return void
     */
    public function mediaApi()
    {  
        $this->checkPermission('parsing_news_api');
        //Get application\json encode data
        $json_post = $this->getJsonFromInput();
        $request=$this->prepareArgs($json_post,array(
                'url'=>array(
                    'description'=>'Featured image url.',
                    'type'=>'string',
                    'validate_callback'=>array($this,'validateImageUrl'),
                    'sanitize_callback'=>function($input_url){
                        return esc_url_raw($input_url);
                    }
                ),
                'options'=>array(
                    'description'=>'Featured image options.',
                    'type'=>'array',
                    'validate_callback'=>array($this,'validateMediaOptions'),
                    'sanitize_callback'=>array($this,'sanitizeMediaOptions')
                )
        ));
       $response=$this->visualConstructorController()->saveMedia($request['url'],$request['options']['postId'],$request['options']['alt']);
       echo $response;
        \wp_die();
    }
    /**
     * Callback that handles options api requests.
     * 
     * @uses ValidateDataTrait::validateExtraOptions()
     * @uses ValidateDataTrait::validateTemplate()
     * @uses SanitizeDataTrait::sanitizeExtraOptions()
     * @uses SanitizeDataTrait::sanitizeTemplate()
     * @return void
     */
    public function optionsApi()
    {
        $this->checkPermission('parsing_news_api');
        //Get application\json encode data
        $json_post = $this->getJsonFromInput();
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
        $respond=$this->optionsController()->save($request['url'],$options);
        echo $respond;
        wp_die();
    }
    /**
     * Callback that handles parsing api requests.
     *
     * @return void
     */
    public function parsingApi()
    {
        $this->checkPermission('parsing_news_api');
        //ToDo:Make redirect to main page when parameter is missing.
        $request_args=array(
            'url'=>isset($_GET['url'])?$_GET['url']:\wp_die(),
            'status'=>isset($_GET['status'])?$_GET['status']:\wp_die()
        );
        $request=$this->prepareArgs($request_args,array(
            'url'=>array(
                'description'=>esc_html__('Page url ',NEWS_PARSER_PLUGIN_SLUG),
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
                $response = $this->listController()->get($url);
                break;
            case 'single':
                $response = $this->visualConstructorController()->getRawHTML($url);
                break;
            case 'multi':
                $response=$this->postController()->get($url);
                break;
            default:
                $response='';
                break;
        }
        echo $response;
        \wp_die();
    }
    /**
     * List controller
     *
     * @return ListController
     */
    protected function listController()
    {
        return $this->controllersFactory->rssList();
    }
    /**
     * Post controller.
     *
     * @return PostController
     */
    protected function postController()
    {
       return $this->controllersFactory->post();
    }
    /**
     * Options controller
     *
     * @return OptionsController
     */
    protected function optionsController()
    {
       return $this->controllersFactory->option();
    }
    /**
     * Visual constructor controller
     *
     * @return VisualConstructorController
     */
    protected function visualConstructorController()
    {
        return $this->controllersFactory->visual();
    }
}
