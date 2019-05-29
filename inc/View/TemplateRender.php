<?php
namespace View;

class TemplateRender
{
    public function render($template_path,$object_args){
        if(!file_exists($template_path)){
            throw new \Exception('Cannot load template file '.$template_path);
        }
        foreach($object_args as $key=>$item){
            ${$key}=$item;
        }
        ob_start();
        include ($template_path);
        $content=ob_get_contents();
        ob_end_clean();
        return $content;
    }


}
