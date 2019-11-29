<?php
namespace NewsParserPlugin\Traits;

trait ValidateDataTrait{
    /**
     * Validate is input data is url.
     *
     * @param string $input_url String that should be validate.
     * @return void
     */
    public function validateUrl($input_url){
        return \wp_http_validate_url($input_url);
    }
      /**
     * Validate is input url is link to the image.
     *
     * @param string $input_image_url String that should be validate.
     * @return void
     */
    public function validateImageUrl($input_url){
        $filetype=wp_check_filetype($input_url);
        $mime_type=$filetype['type'];
        if(strpos($mime_type,'image')!==false){
            return $input_url;
        }
        return false;
    }
    public function validateOptionsArray($options){
        if(!array_key_exists('postId',$options)) return false;
        if(!array_key_exists('alt',$options)) return false;
        return $options;
    }
    public function validateExtraOptions($extra_options){
        $extra_option_should_have_keys=array(
            'addSource',
            'addFeaturedMedia',
            'saveParsingTemplate',
            'url'
        );
        return $this->checkArrayKeys($extra_option_should_have_keys,$extra_options);
    }
    public function validateTemplate($template){
        $container_should_have_keys=array(
            'tagName',
            'searchTemplate',
            'className',
            'children'
        );
        $child_should_have_keys=array_slice($container_should_have_keys,0,-2);
        array_push($child_should_have_keys,'position');
        if(!$this->checkArrayKeys($container_should_have_keys,$template)) return false;
        if(!is_array($template['children'])) return false;
        foreach ($template['children'] as $child){
            if(!$this->checkArrayKeys($child_should_have_keys,$child)) return false;
        }   
        return true;
    }
    protected function checkArrayKeys($must_have_keys,$array){
        $given_keys=array_keys($array);
        $has_difference=array_diff($must_have_keys,$given_keys);
        if(empty($has_difference)) return true;
        return false;
    }
}
