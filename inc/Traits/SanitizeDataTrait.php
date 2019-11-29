<?php
namespace NewsParserPlugin\Traits;

trait SanitizeDataTrait{
    public function sanitizeOptionsArray($options){
        $new_array=[];
        $new_array['postId']=preg_replace('/[^0-9]/','',$options['postId']);
        $new_array['alt']=sanitize_title($options['alt']);
        return $new_array;
    }
    public function sanitizeExtraOptions($extra_options){
        return $extra_options;
    }
    public function sanitizeTemplate($template){
        return $template;
    }
}