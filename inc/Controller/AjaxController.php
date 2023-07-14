<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Traits\ValidateDataTrait;
use NewsParserPlugin\Traits\SanitizeDataTrait;
use NewsParserPlugin\Ajax\Ajax;
use NewsParserPlugin\Interfaces\EventControllerInterface;
use NewsParserPlugin\Message\Errors;

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
     * Event controller.
     *
     * @var EventControllerInterface
     */
    protected $event;
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
     * @param EventControllerInterface $event Controller factory instance.
     */
    protected function __construct(EventControllerInterface $event)
    {
        $this->event=$event;
        $this->init();
    }
    /**
     * Singleton static method to get instance of class.
     *
     * @param EventControllerInterface $event Controller factory instance.
     * @return AjaxController
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
     * Add WP actions to use wp_ajax
     *
     * @return void
     */
    protected function init()
    {
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_list', array($this, 'parsingListApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_html', array($this, 'parsingHTMLApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_page', array($this, 'parsingPageApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_MEDIA_API, array($this, 'mediaApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_TEMPLATE_API, array($this, 'templateApi'));
    }
  
    /**
     * Check if user have relevant rights  and check nonce.
     *
     * @param string $action Should give context to what is taking place and be the same when nonce was created.
     * @param array $request_args Request arguments should contain _wpnonce field,
     * @return true|\WP_Error
     */
    protected function checkPermission($action, $request_args)
    {
        if (!array_key_exists('_wpnonce', $request_args)) {
            return new \WP_Error('ajax_forbidden', Errors::text('NO_RIGHTS_TO_PUBLISH'));
        }
        if (!\wp_verify_nonce($request_args['_wpnonce'], $action)||!\is_admin()) {
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
     * @uses EventController::trigger()
     * @return void
     */
    public function mediaApi()
    {
        //Get application\json encode data
        $json_post = $this->getJsonFromInput();
        $this->checkPermission('parsing_news_api', $json_post);
        $request=$this->prepareArgs($json_post, array(
                'url'=>array(
                    'description'=>'Featured image url.',
                    'type'=>'string',
                    'validate_callback'=>array($this,'validateImageUrl'),
                    'sanitize_callback'=>function ($input_url) {
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
       
        $response=$this->event->trigger('media:create', array($request['url'],$request['options']['post_id'],$request['options']['alt']));
        $this->sendResponse($response);
    }
    /**
     * Callback that handles options api requests.
     *
     * @uses ValidateDataTrait::validateExtraOptions()
     * @uses ValidateDataTrait::validateTemplate()
     * @uses SanitizeDataTrait::sanitizeExtraOptions()
     * @uses SanitizeDataTrait::sanitizeTemplate()
     * @uses EventController::trigger()
     * @return void
     */
    public function templateApi()
    {
        //Get application\json encode data
        $json_post = $this->getJsonFromInput();
        $this->checkPermission('parsing_news_api', $json_post);

        $request=$this->prepareArgs($json_post, array(
            'url'=>array(
                'description'=>'Url of post that was taken as example of template',
                'type'=>'string',
                'validate_callback'=>function ($url) {
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function ($input_url) {
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
        $response=$this->event->trigger('template:create', array($request['url'],$options));
        
        $this->sendResponse($response);
    }
    /**
     * Callback that handles parsing list of posts from RSS api requests.
     *
     * @uses EventController::trigger()
     * @return void
     */
    public function parsingListApi()
    {
        //Get application\json encode data
        $json_post = $this->getJsonFromInput();
        $this->checkPermission('parsing_news_api', $json_post);
        //ToDo:Make redirect to main page when parameter is missing.
     
        $request=$this->prepareArgs($json_post, array(
            'url'=>array(
                'description'=>'Parsing RSS XML list url',
                'type'=>'string',
                'validate_callback'=>function ($url) {
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function ($input_url) {
                    return esc_url_raw($input_url);
                }
            )
        ));
        
 
        $url = $request['url'];

        $response = $this->event->trigger('list:get', array($url));
        $this->sendResponse($response);
    }
     /**
     * Callback that handles parsing single page api requests and returns HTML of the page.
     *
     * @uses EventController::trigger()
     * @return void
     */
    public function parsingHTMLApi()
    {
        //Get application\json encode data
        $json_post = $this->getJsonFromInput();
        $this->checkPermission('parsing_news_api', $json_post);
        //ToDo:Make redirect to main page when parameter is missing.
     
        $request=$this->prepareArgs($json_post, array(
            'url'=>array(
                'description'=>'Parsing page url',
                'type'=>'string',
                'validate_callback'=>function ($url) {
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function ($input_url) {
                    return esc_url_raw($input_url);
                }
            )
        ));
        
         
        $url = $request['url'];
        $response = $this->event->trigger('html:get', array($url));
        $this->sendResponse($response);
    }
     /**
     * Callback that handles parsing single page api requests and create WP post draft using saved parsing templates.
     * If there is no template for that domain name returns error.
     *
     * @uses EventController::trigger()
     * @return void
     */
    public function parsingPageApi()
    {
        //Get application\json encode data
        $json_post = $this->getJsonFromInput();
        $this->checkPermission('parsing_news_api', $json_post);
        //ToDo:Make redirect to main page when parameter is missing.
     
        $request=$this->prepareArgs($json_post, array(
            'url'=>array(
                'description'=>'Parsing page url',
                'type'=>'string',
                'validate_callback'=>function ($url) {
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function ($input_url) {
                    return esc_url_raw($input_url);
                }
            ),
            '_id'=>array(
                'description'=>'Front end requested page index',
                'type'=>'integer',
                'validate_callback'=>function ($_id) {
                    preg_match('/[^0-9]/i', $_id, $matches);
                    if (empty($matches)) {
                        return true;
                    } else {
                        return false;
                    }
                },
                'sanitize_callback'=>function ($_id) {
                    return preg_replace('/[^0-9]/i', '', $_id);
                }
            ),
            'templateUrl'=>array(
                'description'=>'Url that identifies template',
                'type'=>'string',
                'validate_callback'=>function ($url) {
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function ($input_url) {
                    return esc_url_raw($input_url);
                }
            ),
        ));

        $response=$this->event->trigger('post:create', array($request['url'],$request['_id'],$request['templateUrl']));
        $this->sendResponse($response);
    }
}
