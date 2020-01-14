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
     * @uses EventController::trigger()
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
       $response=$this->event->trigger('media:create',array($request['url'],$request['options']['postId'],$request['options']['alt']));
       echo $response;
       wp_die();
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
    public function optionsApi()
    {
        $this->checkPermission('parsing_news_api');
        //Get application\json encode data
        $json_post = $this->getJsonFromInput();
        $request=$this->prepareArgs($json_post,array(
            'url'=>array(
                'description'=>'Url of post that was taken as example of template',
                'type'=>'string',
                'validate_callback'=>function($url)
                {
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function($input_url)
                {
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
        $respond=$this->event->trigger('options:create',array($request['url'],$options));
        echo $respond;
        wp_die();
    }
    /**
     * Callback that handles parsing api requests.
     *
     * @uses EventController::trigger()
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
                'description'=>'Parsing page url',
                'type'=>'string',
                'validate_callback'=>function($url)
                {
                    return wp_http_validate_url($url);
                },
                'sanitize_callback'=>function($input_url)
                {
                    return esc_url_raw($input_url);
                }
            ),
            'status'=>array(
                'description'=>'Action status that should be applied.',
                'type'=>'string',
                'validate_callback'=>function($status)
                {
                    if(in_array($status,array('list','single','multi'))===false) return new \WP_Error(
                        'wrong_parsing_status',
                        'Parsing status should be: list,single,multi.But '.esc_html($status).' was set.');
                    return true;
                },
                'sanitize_callback'=>function($status)
                {
                    return sanitize_text_field($status);
                }
            )
        ));
        
            $status = $request['status'];
            $url = $request['url'];
        switch ($status) {
            case 'list':
                $response = $this->event->trigger('list:get',array($url));
                break;
            case 'single':
                $response = $this->event->trigger('html:get',array($url));
                break;
            case 'multi':
                $response=$this->event->trigger('post:create',array($url));
                break;
            default:
                $response='';
                break;
        }
        echo $response;
        wp_die();
    }
}
