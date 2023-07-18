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

class CronApiController extends \WP_REST_Controller

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
     * @var CronApiController
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
     * @return CronApiController
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
        $base = 'cron';

        register_rest_route($namespace, '/' . $base, array(
            array(
                'methods' => \WP_REST_Server::READABLE,
                'callback' => array($this, 'getCronOptions'),
                'permission_callback' => array($this, 'checkPermission'),
                'args'=> array(
                    'url'=>array(
                        'description' => 'Cron options id',
                        'required' => false,
                        'validate_callback'=>array($this,'validateUrl')
                    )
                )
            ),
            array(
                'methods' => \WP_REST_Server::DELETABLE,
                'callback' => array($this, 'deleteCronOptions'),
                'permission_callback' => array($this, 'checkPermission'),
                'args'=> array(
                    'url'=>array(
                        'description' => 'Cron options id',
                        'required' => true,
                        'validate_callback'=>array($this,'validateUrl')
                    )
                )
            ),
            array(
                'methods' => \WP_REST_Server::EDITABLE,
                'callback' => array($this, 'updateCronOptions'),
                'permission_callback' => array($this, 'checkPermission'),
                'args'=> array(
                    'url'=>array(
                        'validate_callback'=>array($this,'validateUrl')
                    ),
                    'timestamp'=>array(
                        'sanitize_callback'=>array($this,'sanitizeInteger')
                    ),
                    'status'=>array(
                        'validate_callback'=>function($status){
                            if($status!='idle'&&$status!='active'){
                                return new \WP_Error(400, 'Wrong cron status format should be "active" or "idle"');
                            }
                            return true;
                        }
                    ),
                    'maxCronCalls'=>array(
                        'validate_callback'=>function ($cron_calls){
                            if($cron_calls<1||$cron_calls>100){
                                return new \WP_Error(400, 'Wrong maximum cron calls format should be 0-100');
                            }
                            return true;
                        },
                        'sanitize_callback'=>function ($max_cron_calls){
                            return intval($max_cron_calls);
                        }
                    ),
                    'maxPostsParsed'=>array(
                        'validate_callback'=>function ($posts_parsed){
                            if($posts_parsed<1||$posts_parsed>100){
                                return new \WP_Error(400, 'Wrong maximum posts parsed format should be 0-100');
                            }
                            return true;
                        },
                        'sanitize_callback'=>function ($max_cron_calls){
                            return intval($max_cron_calls);
                        }
                    ),
                    'interval'=>array(
                        'validate_callback'=>function ($interval){
                            if($interval!='hourly'&&$interval!='twicedaily'&&$interval!='daily'&&$interval!='weekly'){
                                return new \WP_Error(400, 'Cron option.interval has wrong format should be hourly,twicedaily,daily,weekly');
                            }
                            return true;
                        },
                        'sanitize_callback'=>function ($interval){
                            return preg_replace('/[^h,o,u,r,l,y,t,w,i,c,e,d,a,k]/i','',$interval);
                        }
                    )
                    
                )
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
 * Get autopilot cron options.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response Response object on success, or WP_Error object on failure.
 */
public function getCronOptions($request){

    try{
        $cron_params=$request->get_query_params();
        $response=$this->event->trigger('cron:get', array(isset($cron_params['url'])?$cron_params['url']:null));
    }catch(Exception $e){
        $response=ResponseFormatterStatic::format()->error($e->getCode())->message('error', $e->getMessage());
    }
    $wp_response = new \WP_REST_Response( $response->get('array'),$response->getCode() );
    return $wp_response;

}

/**
 * Create a new cron options.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
 */
    public function updateCronOptions($request)
    {
        try{
            $cron_params=$request->get_params();
            $response=$this->event->trigger('cron:update', array($cron_params));
        }catch(Exception $e){
            $response=ResponseFormatterStatic::format()->error($e->getCode())->message('error', $e->getMessage());
        }
        
        $wp_response = new \WP_REST_Response( $response->get('array'),$response->getCode());
        return $wp_response;
    }

/**
 * Delete an existing cron options.
 *
 * @param WP_REST_Request $request Full data about the request.
 * @return WP_REST_Response|WP_Error Response object on success, or WP_Error object on failure.
 */
    public function deleteCronOptions($request)
    {
        try{
            $cron_params=$request->get_query_params();
            $response=$this->event->trigger('cron:delete', array($cron_params['url']));
        }catch(Exception $e){
            $response=ResponseFormatterStatic::format()->error($e->getCode())->message('error', $e->getMessage());
        }
        $wp_response = new \WP_REST_Response( $response->get('array'),$response->getCode() );
        return $wp_response;
    }
}