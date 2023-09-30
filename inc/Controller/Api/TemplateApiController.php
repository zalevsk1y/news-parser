<?php
namespace NewsParserPlugin\Controller\Api;

use NewsParserPlugin\Interfaces\EventControllerInterface;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Traits\SanitizeDataTrait;
use NewsParserPlugin\Traits\ValidateDataTrait;
use NewsParserPlugin\Exception\MyException;

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

class TemplateApiController extends RestApiController

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
     * @var TemplateApiController
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
                    'url' => array (
                        'required' => false,
                        'validate_callback'=>array($this,'validateUrl')
                    )
                )
            ),
            array(
                'methods' => \WP_REST_Server::CREATABLE,
                'callback' => array($this, 'createTemplate'),
                'permission_callback' => array($this, 'checkPermission'),
                'args' => array(
                    'template' => array (
                        'validate_callback'=>array($this,'validateTemplate'),
                        'sanitize_callback'=>array($this,'sanitizeTemplate')
                    )
                )
                ),
                array(
                    'methods' => \WP_REST_Server::DELETABLE,
                    'callback' => array($this, 'deleteTemplate'),
                    'permission_callback' => array($this, 'checkPermission'),
                    'args' => array(
                        'url' => array (
                            'required' => true,
                            'validate_callback'=>array($this,'validateUrl')
                        )
                    )
                )
        ));
    }


/**
 * Get a list of templates.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
 */
public function getTemplates($request){

    try{
        $template_params=$request->get_query_params();
        $template_data=isset($template_params['url'])?$this->event->trigger('template:get', array($template_params['url'])):$this->event->trigger('template.keys:get', array());

        $response_data=$this->formatResponse()->options( $template_data)->get('array');
        return $this->sendResponse($response_data);
    }catch(MyException $e){
        $error_data=$this->formatResponse()->error($e->getCode())->message('error', $e->getMessage())->get('array');
        $error_code=$e->getCode();
        $error_message=$e->getMessage();
        return $this->sendError($error_code,$error_message,$error_data);
    }
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
            $new_template_data=$this->event->trigger('template:create', array($template['template']));
            $response_data=$this->formatResponse()->message('success', Success::text('TEMPLATE_SAVED'))->options( $new_template_data)->get('array');
            return $this->sendResponse($response_data);
        }catch(MyException $e){
            $error_data=$this->formatResponse()->error($e->getCode())->message('error', $e->getMessage())->get('array');
            $error_code=$e->getCode();
            $error_message=$e->getMessage();
            return $this->sendError($error_code,$error_message,$error_data);
        }
    }
/**
 * Delete template.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
 */
    public function deleteTemplate($request)
    {
        try{
            $template=$request->get_params();
            $templates_data=$this->event->trigger('template:delete', array($template['url']));
            $response_data=$this->formatResponse()->message('success', Success::text('TEMPLATE_DELETE'))->options($templates_data)->get('array');
            return $this->sendResponse($response_data);
        }catch(MyException $e){
            $error_data=$this->formatResponse()->error($e->getCode())->message('error', $e->getMessage())->get('array');
            $error_code=$e->getCode();
            $error_message=$e->getMessage();
            return $this->sendError($error_code,$error_message,$error_data);
        }
    }
}
