<?php
namespace NewsParserPlugin\Ajax;

class Ajax{
    protected function checkArgType($arg,$type,$description=''){
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
    protected function prepareArgs($dirty_request,$args_params){
        $dirty_post=$dirty_request;
        $clean_post=[];
        foreach($args_params as $key=>$arg){
            if(key_exists($key,$dirty_post)){
                $dirty_arg=$dirty_post[$key];
                if(is_wp_error($e=$this->checkArgType($dirty_arg,$arg['type'],$arg['description']))){
                    $this->sendError($e->get_error_message());
                }
                //validate arguments.
                if(!call_user_func($arg['validate_callback'],$dirty_arg)){
                    $this->sendError($arg['description'].' is not valid parameter.');
                }
                //sanitize arguments.
                if($clean_arg=call_user_func($arg['sanitize_callback'],$dirty_arg)){
                    $clean_post[$key]=$clean_arg;
                }
            }
        }
        return $clean_post;
    }
    protected function sendError($message){
        $clean_message=esc_html($message);
        $response=array('error'=>$clean_message);
        \wp_send_json($response);
    }
}