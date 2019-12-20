<?php
namespace NewsParserPlugin\Ajax;
/**
 * Ajax parent class that provide methods for handles input arguments.
 *
 * @package Ajax
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */
class Ajax
{
    /**
     * Checks input argument type.
     *
     * @param mixed $arg 
     * @param string $type
     * @param string $description
     * @return true|\WP_Error
     */
    protected function checkArgType($arg,$type,$description='')
    {
        $error_message='%s should be a %s but %s given.';
        $desc=$description?:'Argument';
        $arg_type=gettype($arg); 
        if($arg_type!==$type)  return new \WP_Error('wrong_argument_type',
            esc_html(sprintf($error_message,
                $desc,
                $type,
                $arg_type)
            ));
        return true;
    }
    /**
     * Sanitize and validate input arguments.
     *
     * @param array $dirty_request
     * @param array $args_params
     * Structure:
     * description - descriptions of the argument.Using to send as additional error info.
     * type - argument type
     * validate_callback - validation callback should return boolean
     * sanitize_callback - sanitize input data callback.
     * @return void
     */
    protected function prepareArgs($dirty_request,$args_params)
    {
        $clean_request=array();
        foreach($args_params as $key=>$arg){
            if(key_exists($key,$dirty_request)){
                $dirty_arg=$dirty_request[$key];
                if(is_wp_error($e=$this->checkArgType($dirty_arg,$arg['type'],$arg['description']))){
                    $this->sendError($e->get_error_message());
                }
                //validate arguments.
                if(is_wp_error($e=call_user_func($arg['validate_callback'],$dirty_arg))){
                    $this->sendError($e->get_error_message());
                }
                //sanitize arguments.
                if($clean_arg=call_user_func($arg['sanitize_callback'],$dirty_arg)){
                    $clean_request[$key]=$clean_arg;
                }
            }
        }
        return $clean_request;
    }
    /**
     * Send json message on error.
     *
     * @param string $message
     * @return void
     */
    protected function sendError($message)
    {
        $clean_message=esc_html($message);
        $response=array('error'=>$clean_message);
        \wp_send_json($response);
    }
    /**
     * Get application/json encoded data using php://input
     *
     * @return array
     */
    protected function getJsonFromInput(){
        json_decode(file_get_contents('php://input'),TRUE);
    }
}