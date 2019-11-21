<?php
namespace NewsParserPlugin\Ajax;

use NewsParserPlugin\Controller\ListController;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Controller\VisualConstructorController;

/**
 * Ajax singleton class provide API to the front end
 *
 * @package Ajax
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

class Ajax
{
    protected $post;
    protected $list;
    protected $visual;
    protected static $instance;

    protected function __construct(ListController $listController,VisualConstructorController $visual,PostController $post)
    {
        $this->list = $listController;
        $this->visual  = $visual;
        $this->post=$post;
        $this->init();
    }
    public static function getInstance(ListController $listController,VisualConstructorController $visual,PostController $post)
    {
        if (self::$instance) {
            return self::$instance;
        } else {
            self::$instance = new self($listController, $visual,$post);
            return self::$instance;
        }
    }
    protected function init()
    {
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API, array($this, 'parsingApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_MEDIA_API, array($this, 'mediaApi'));

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
    protected function checkArgType($arg,$type,$description=''){
        $error_message='%s %s should be a %s but %s given.';
        $desc=$description?:'Argument';
        $arg_type=gettype($arg); 
        if($arg_type!==$type)  return new \WP_Error('wrong_argument_type',
            esc_html(sprintf($error_message,
                $desc,
                $arg,
                $arg_type)
            ));
        return true;
    }
    protected function prepareArgs($dirty_request,$args_params){
        $dirty_post=$dirty_request;
        $clean_post=[];
        foreach($args_params as $key=>$arg){
            if(key_exists($key,$dirty_post)){
                $dirty_arg=$dirty_post[$key];
                if(is_wp_error($e=$this->checkArgType($dirty_arg,$arg['type'],$arg['description']))){
                    $this->sendError($e->get_error_message());
                }
                //validate arguments.
                if(!call_user_func($arg['validate_callback'],$dirty_arg)){
                    $this->sendError($arg['description'].' is not valid parameter.');
                }
                //sanitize arguments.
                if($clean_arg=call_user_func($arg['sanitize_callback'],$dirty_arg)){
                    $clean_post[$key]=$clean_arg;
                }
            }
        }
        return $clean_post;
    }
    protected function sendError($message){
        $clean_message=esc_html($message);
        $response=array('error'=>$clean_message);
        \wp_send_json($response);
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
                    'validate_callback'=>array($this,'validateOptionsArray'),
                    'sanitize_callback'=>array($this,'sanitizeOptionsArray')
                )
        ));
       $response=$this->visual->saveMedia($request['url'],$request['options']['postId'],$request['options']['alt']);
       echo $response;
        \wp_die();
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
                $response = $this->createList($url);
                break;
            case 'single':
                $response = $this->visual->getRawHTML($url, array('remove_scripts'=>true));
                break;
            case 'multi':
                $response=$this->post->get($url);
        }
        echo $response;
        \wp_die();
    }

        /**
     * Validate is input data is url.
     *
     * @param string $input_url String that should be validate.
     * @return void
     */
    public function validateUrl($input_url){
        return \wp_http_validate_url($input_url);
    }
      /**
     * Validate is input url is link to the image.
     *
     * @param string $input_image_url String that should be validate.
     * @return void
     */
    public function validateImageUrl($input_url){
        $filetype=wp_check_filetype($input_url);
        $mime_type=$filetype['type'];
        if(strpos($mime_type,'image')!==false){
            return $input_url;
        }
        return false;
    }
    public function validateOptionsArray($options){
        if(!array_key_exists('postId',$options)) return false;
        if(!array_key_exists('alt',$options)) return false;
        return $options;
    }
    public function sanitizeOptionsArray($options){
        $new_array=[];
        $new_array['postId']=preg_replace('/[^0-9]/','',$options['postId']);
        $new_array['alt']=sanitize_title($options['alt']);
        return $new_array;
    }
    protected function createList($url)
    {
        return $this->list->get($url);
    }
    protected function createPostDraft($url, $options)
    {
        return $this->post->get($url, $options);
    }

}
