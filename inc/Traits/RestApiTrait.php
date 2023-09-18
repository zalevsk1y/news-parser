<?php
namespace NewsParserPlugin\Traits;

/**
 * Helper methods for ApiControllers
 *
 * PHP version 5.6
 *
 * @package  Traits
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */
trait RestApiTrait
{
    /**
     * Send json message on error.
     *
     * @param \WP_Error $error
     * @return void
     */
    protected function sendError($error)
    {
        if (!is_wp_error($error)) {
            return;
        }
        $response_message=array(
            'msg'=>array(
                'type'=>'error',
                'text'=>esc_html($error->get_message())
            ),
            'code'=>esc_html($error->get_code())
        );
        wp_send_json($response_message, $error->get_code());
    }
    /**
     * Send response.
     *
     * @param NewsParserPlugin\Utils\ResponseFormatter $response
     * @param string $response
     * @return void
     */
    protected function sendResponse($response)
    {
        switch ($response->contentType) {
            case 'json':
                wp_send_json($response->get('array'));
                break;
            case 'text':
                echo $response->get('text');
                wp_die();
                break;
        }
    }

    /**
     * Get application/json encoded data using php://input
     *
     * @return array
     */
    protected function getJsonFromInput()
    {
        return json_decode(file_get_contents('php://input'), true);
    }
}