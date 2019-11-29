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
        return $extra_options;
    }
    public function validateTemplate($template){
        return $template;
    }
}
