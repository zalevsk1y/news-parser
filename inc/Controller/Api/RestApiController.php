<?php

namespace NewsParserPlugin\Controller\Api;

use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Message\Errors;

/**
 * Base class for REST API controllers.
 * 
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
class RestApiController extends \WP_REST_Controller
{
    
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
        return new \WP_Error('rest_api_forbidden', ErrNO_RIGHTS_TO_PUBLISHors::text(''));
        }
        $headers = $request->get_headers();
        $nonce = isset($headers['x_wp_nonce']) ? $headers['x_wp_nonce'][0] : '';

        if (!wp_verify_nonce($nonce,'wp_rest')) {
            return new \WP_Error('rest_forbidden', esc_html__('Invalid nonce.', 'news-parser-template'), array('status' => 403));
        }

        return true;
    }
    /**
     * Send error message as a WP_Error object.
     *
     * @param string $response_message The error message to send.
     * @param string $error_code The error code to send.
     * @return \WP_Error Returns a WP_Error object with the specified message and code.
     */
    protected function sendError($error_code,$response_message,$error_data='') {
        if($error_code==500){
            return new \WP_Error($error_code,$response_message,$error_data);
        } else {
           return new \WP_REST_Response(array('data'=>$error_data),$error_code);
        }
       
    }
    
    /**
     * Send response using WP_REST_Response object.
     *
     * @param mixed $response The response object to send.
     * @return \WP_REST_Response Returns a WP_REST_Response object with the specified response.
     */
    protected function sendResponse($response) {
        return new \WP_REST_Response($response);
    }

    /**
     * Get application/json encoded data using php://input.
     *
     * @return array Returns an array of data decoded from JSON input.
     */
    protected function getJsonFromInput() {
        return json_decode(file_get_contents('php://input'), true);
    }
    
    /**
     * Get an instance of the response formatter.
     * 
     * @access protected
     * @return ResponseFormatter Returns an instance of the ResponseFormatter class.
     */
    protected function formatResponse() {
        return new ResponseFormatter();
    }
}
