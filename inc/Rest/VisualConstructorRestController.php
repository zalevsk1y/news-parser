<?php
namespace NewsParserPlugin\Rest;
use   NewsParserPlugin\Controller\VisualConstructorController;
;
/**
 * Rest controller for Visual constructor modal window.
 * GET /news-parser/v1/visual-constructor/{url} return content of site from requested url.
 * POST /news-parser/v1/visual-constructor/
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
                'method' => 'GET',
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
            $this->resource_name,
            array(
                'method'=>'POST',
                'callback'=>array($this,'createPostDraft'),
                'permission_callback'=>array($this,'checkPermission'),
                'args'=>array(
                        'title'=>array(
                            'description'=>esc_html__('Post title',NEWS_PARSER_PLUGIN_SLUG),
                            'type'=>'string',
                            'validate_callback'=>array($this,'validateInputIsString'),
                            'sanitize_callback'=>function($title){
                                return sanitize_title($title);
                            }
                        ),
                        'body'=>array(
                            'description'=>esc_html__('Post body',NEWS_PARSER_PLUGIN_SLUG),
                            'type'=>'string',
                            'validate_callback'=>array($this,'validateInputIsString'),
                            'sanitize_callback'=>function($post_body){
                                return wp_filter_post_kses($post_body);
                            }
                        ),
                        'image'=>array(
                            'description'=>esc_html__('Featured image url',NEWS_PARSER_PLUGIN_SLUG),
                            'type'=>'string',
                            'validate_callback'=>array($this,'validateImageUrl'),
                            'sanitize_callback'=>function($url){
                                return esc_url_raw($url);
                            }
                        ),
                        'sourceUrl'=>array(
                            'description'=>esc_html__('Urs of source page',NEWS_PARSER_PLUGIN_SLUG),
                            'type'=>'string',
                            'validate_callback'=>array($this,'validateUrl'),
                            'sanitize_callback'=>function($url){
                                return esc_url_raw($url);
                            }
                        ),
                        'options'=>array(
                            'description'=>esc_html__('Array of page parsing options',NEWS_PARSER_PLUGIN_SLUG),
                            'type'=>'array',
                            'validate_callback'=>function($options){
                                return is_array($options);
                            },
                            'sanitize_callback'=>array($this,'sanitizeArrayOfOptions')
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
    function getPostDataRaw(\WP_REST_Request $request){
        $page_url=$request['url'];
    
        return $this->rawHTML->get($page_url,array('remove_scripts'=>true));
    
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
    function validateInputIsString($input_data){
        return is_string($inputData);
    }
    /**
     * Validate is input data is url.
     *
     * @param string $input_url String that should be validate.
     * @return void
     */
    function validateUrl($input_url){
        return wp_http_validate_url($input_url);
    }
      /**
     * Validate is input url is link to the image.
     *
     * @param string $input_image_url String that should be validate.
     * @return void
     */
    function validateImageUrl($input_url){
        $filetype=wp_check_filetype($input_url);
        $mime_type=$filetype['type'];
        if(strpos($mime_type,'image')!==false){
            return $input_url;
        }
        return false;
    }
 }