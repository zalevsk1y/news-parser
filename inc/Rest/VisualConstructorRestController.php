<?php
namespace NewsParserPlugin\Rest;
use   NewsParserPlugin\Controller\VisualConstructorController;
use   NewsParserPlugin\Message\Errors;
/**
 * Rest controller for Visual constructor modal window.
 * GET /news-parser/v1/visual-constructor/{url} return content of site from requested url.
 * POST /news-parser/v1/visual-constructor/media/
 * 
 * PHP version 7.0
 * 
 * @package NewsParserPlugin\Rest
 * @author  Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license MIT
 */

 class VisualConstructorRestController{
      /**
     * Namespace.
     *
     * @var string
     */
    protected $namespace = "news-parser/v1";
    /**
     * Name of resource.
     *
     * @var string
     */
    protected $resource_name = "visual-constructor";
    /**
     * Controller that handles parsing and formating response data.
     *
     * @var HtmlRawController
     */
    protected $rawHTML;
    /**
     * Init function.
     */
    public function __construct(VisualConstructorController $rawHTML)
    {
        $this->rawHTML=$rawHTML;
        $this->init();
    }
    /**
     * Initialization.Add action for rest function registration.
     *
     * @return void
     */
    protected function init()
    {
        add_action('rest_api_init', array($this, 'registerRouts'));
    }
    /**
     * Register routes.
     *
     * @return void
     */
    public function registerRouts()
    {
        register_rest_route(
            $this->namespace,
            $this->resource_name . '/(?P<url>.+)',
            array(
                'methods' => 'GET',
                'callback' => array($this, 'getPostDataRaw'),
                'permission_callback' => array($this, 'checkPermission'),
                'args' => array(
                    'url' => array(
                        'description' => 'parsing page url',
                        'type' => 'string',
                        'validate_callback' =>array($this,'validateUrl'),
                        'sanitize_callback'=>function($input_url){
                            return esc_url_raw($input_url);
                        }
                    )
                
                ),
            )
        );
        register_rest_route(
            $this->namespace,
            $this->resource_name.'/media',
            array(
                'methods'=>'POST',
                'callback'=>array($this,'downloadMedia'),
                'permission_callback'=>array($this,'checkPermission'),
                'args'=>array(
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
                )
            )
        );   
        
    }
    /**
     * Gets raw html of page.
     *
     * @param \WP_REST_Request $request Instance contains info about request.
     * @return string
     */
    public function getPostDataRaw(\WP_REST_Request $request){
        $page_url=$request['url'];
    
        return $this->rawHTML->get($page_url,array('remove_scripts'=>true));
    
    }
    public function downloadMedia(\WP_REST_Request $request){
        $media_url=$request['url'];
        $media_options=$request['options'];
        $img_id = \media_sideload_image($media_url, $media_options['postId'], $media_options['alt'], 'id');
        if (\is_wp_error($img_id)) {
            return $img_id->get_error_message();
        } 
        if($media_options['type']==='featured_image'){
            \set_post_thumbnail($media_options['postId'], $img_id);
        }
        return get_post($img_id);
    }
    /**
     * Check if user have rights to read posts.
     *
     *
     * @return void
     */
    public function checkPermission()
    {
        if (!current_user_can('publish_posts')) {
            return new \WP_Error('rest_forbidden', Errors::text('NO_RIGHTS_TO_PUBLISH'));
        }

        return true;
    }
    /**
     * Validate that input data is string.
     * 
     * @param string $inputData Data that would be checked.
     */
    public function validateInputIsString($input_data){
        return is_string($inputData);
    }
    /**
     * Validate is input data is url.
     *
     * @param string $input_url String that should be validate.
     * @return void
     */
    public function validateUrl($input_url){
        return wp_http_validate_url($input_url);
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
        if(!array_key_exists('type',$options)) return false;
        if(!array_key_exists('alt',$options)) return false;
        return $options;
    }
    public function sanitizeOptionsArray($options){
        $new_array=[];
        $new_array['postId']=preg_replace('/[^0-9]/','',$options['postId']);
        if(strpos('featured_image',$options['type'])) $new_array['type']='featured_image';
        if(strpos('post_image',$options['type'])) $new_array['type']='post_image';
        $new_array['alt']=sanitize_title($options['alt']);
        return $new_array;
    }
 }