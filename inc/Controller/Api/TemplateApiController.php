<?php
namespace NewsParserPlugin\Controller\Api;

use NewsParserPlugin\Interfaces\EventControllerInterface;
use NewsParserPlugin\Utils\ResponseFormatterStatic;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Traits\RestApiTrait;
use NewsParserPlugin\Traits\SanitizeDataTrait;
use NewsParserPlugin\Traits\ValidateDataTrait;

/**
 * Class saves received template options.
 *
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class TemplateApiController extends \WP_REST_Controller

{

    /**
     * Event controller.
     *
     * @var EventControllerInterface
     */
    protected $event;
    /**
     * Response formatter controller.
     *
     * @var ResponseFormatterInterface
     */
    protected $formatter;
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
     * Methods to format input and output data.
     *
     * @method sendError()
     * @method sendResponse()
     * @method getJsonFromInput()
     */
    use RestApiTrait;
    /**
     * Init method
     *
     * @param EventControllerInterface $event Controller factory instance.
     */
    protected function __construct(EventControllerInterface $event)
    {
        $this->event = $event;
        $this->init();
    }
    /**
     * Initializes the object by registering its routes as a REST API endpoint.
     *
     * @return void
     */
    protected function init()
    {
        
        add_action('rest_api_init', array($this,'register_routes'));

    }
    /**
     * Singleton static method to get instance of class.
     *
     * @param EventControllerInterface $event Controller factory instance.
     * @return TemplateApiController
     */
    public static function create(EventControllerInterface $event)
    {

        if (static::$instance) {
            return static::$instance;
        } else {
            static::$instance = new static($event);
            return static::$instance;
        }
    }

/**
 * Register the routes for the objects of the controller.
 */
    public function register_routes()
    {
        $version = '1';
        $namespace = 'news-parser-plugin/v' . $version;
        $base = 'templates';

        register_rest_route($namespace, '/' . $base, array(
            array(
                'methods' => \WP_REST_Server::READABLE,
                'callback' => array($this, 'getTemplates'),
                'permission_callback' => array($this, 'checkPermission'),
                'args' => array(
                    'url'=> array(
                        'validate_callback'=> array($this, 'validateUrl')
                    )
                )
            ),
            array(
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => array($this, 'createTemplate'),
                'permission_callback' => array($this, 'checkPermission'),
                'args' => array(
                    'url' => array (
                        'validate_callback'=>array($this,'validateTemplate'),
                        'sanitize_callback'=>array($this,'sanitizeTemplate')
                    )
                )
            ),
            array(
                'methods' => \WP_REST_Server::EDITABLE,
                'callback' => array($this, 'updateTemplate'),
                'permission_callback' => array($this, 'checkPermission'),
            ),
        ));
    }


/**
 * Check if user have relevant rights  and check nonce.
 *
 * @param string $action Should give context to what is taking place and be the same when nonce was created.
 * @param array $request_args Request arguments should contain _wpnonce field,
 * @return true|\WP_Error
 */
    public function checkPermission($request)
    {
        
        if (!current_user_can('manage_options')) {
           return new \WP_Error('rest_api_forbidden', Errors::text('NO_RIGHTS_TO_PUBLISH'));
        }
        $headers = $request->get_headers();
        $nonce = isset($headers['x_wp_nonce']) ? $headers['x_wp_nonce'][0] : '';

        if (!wp_verify_nonce($nonce,'wp_rest')) {
             return new WP_Error('rest_forbidden', esc_html__('Invalid nonce.', 'news-parser-template'), array('status' => 403));
        }

        return true;
    }
/**
 * Get a list of templates.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response Response object on success, or WP_Error object on failure.
 */
public function getTemplates($request){

    try{
        $template_name=$request->get_query_params();
        $response=$this->event->trigger('template:get', array($template_name['url']));
    }catch(Exception $e){
        $response=ResponseFormatterStatic::format()->error($e->getCode())->message('error', $e->getMessage());
    }
    $wp_response = new \WP_REST_Response( $response->get('array'),$response->getCode() );
    return $wp_response;

}

/**
 * Create a new template.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
 */
    public function createTemplate($request)
    {
        try{
            $template=$request->get_params();
            $response=$this->event->trigger('template:create', array($template['template']['url'],$template['template']));
        }catch(Exception $e){
            $response=ResponseFormatterStatic::format()->error($e->getCode())->message('error', $e->getMessage());
        }
        
        $wp_response = new \WP_REST_Response( $response->get('array'),$response->getCode());
        return $wp_response;
    }

/**
 * Update an existing template.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
 */
    public function updateTemplate($request)
    {
        // TODO: Implement method to update template
    }
}
