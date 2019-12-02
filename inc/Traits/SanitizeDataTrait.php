<?php
namespace NewsParserPlugin\Traits;

trait SanitizeDataTrait{
    public function sanitizeMediaOptionsArray($options){
        $new_array=array();
        $new_array['postId']=preg_replace('/[^0-9]/','',$options['postId']);
        $new_array['alt']=sanitize_title($options['alt']);
        return $new_array;
    }
    public function sanitizeExtraOptions($extra_options){
        $clean_data=array();
        foreach ($extra_options as $key=>$option){
            switch($key){
                case 'addFeaturedMedia':
                case 'saveParsingTemplate':
                case 'addSource':
                    $clean_data[$key]=boolval($option);
                    break;
                case 'url':
                    $clean_data[$key]=esc_url_raw($option);
                    break;
            }
        }
        return $clean_data;
    }
    public function sanitizeTemplate($template){
       $clean_data=$this->sanitizeTemplateElement($template);
       $clean_data['children']=array();
        foreach ($template['children'] as $child){
            array_push($clean_data['children'],$this->sanitizeTemplateElement($child));    
        }
        return $clean_data;
    }
    protected function sanitizeTemplateElement($el){
        $clean_data=array();
        foreach($el as $key=>$param){
            switch($key){
                case 'tagName':
                    $clean_data[$key]=preg_replace('/[^a-z0-9]/i','',$param);
                    break;
                case 'className':
                    $clean_data[$key]=preg_replace('/[^a-zA-Z0-9\_\-]/i','',$param);
                    break;
                case 'searchTemplate':
                    $clean_data[$key]=preg_replace('/[^a-zA-Z0-9\=\[\]\_\-\.\s\S]/i','',$param);
                    break;
                case 'position':
                    $clean_data[$key]=preg_replace('/[^a-z0-9]/i','',$param);
            }
        }
       return $clean_data;
    }
}