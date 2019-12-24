<?php
namespace NewsParserPlugin\Traits;
/**
 * Methods to validate input data.
 * 
 * PHP version 5.6
 *
 * @package  Traits
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */
trait ValidateDataTrait{
    /**
     * Validate is input data is url.
     *
     * @param string $input_url Url that should be validate.
     * @return string
     */
    public function validateUrl($input_url)
    {
        return \wp_http_validate_url($input_url);
    }
      /**
     * Validate is input url is link to the image.
     *
     * @param string $input_url Image Url.
     * @return true|\WP_Error
     */
    public function validateImageUrl($input_url)
    {
        $filetype=wp_check_filetype($input_url);
        $mime_type=$filetype['type'];
        if(false!==strpos($mime_type,'image')){
            return true;
        }
        return new \WP_Error('not_valid_url','Given url is not a valid image url.URL:'.esc_url_raw($input_url));
    }
    /**
     * Validate structure of input media options.
     * Structure:[postId,alt]
     *
     * @param array $options 
     * @return true|\WP_Error
     */
    public function validateMediaOptions($options)
    {
        if(!array_key_exists('postId',$options)) return new \WP_Error('no_needed_array_key','Media no needed key.Missing key:postId');
        if(!array_key_exists('alt',$options)) return new \WP_Error('no_needed_array_key','Media no needed key.Missing key:alt');
        return true;
    }
    /**
     * Validate structure of input extra options.
     * Structure:['addSource','addFeaturedMedia','saveParsingTemplate','url']
     *
     * @param array $extra_options
     * @return true|\WP_Error
     */
    public function validateExtraOptions($extra_options)
    {
        $extra_option_should_have_keys=array(
            'addSource',
            'addFeaturedMedia',
            'saveParsingTemplate'
        );
    
        return $this->checkArrayKeys($extra_option_should_have_keys,$extra_options);
    }
    /**
     * Validate structure of template patterns.
     * Structure:[ 'tagName','searchTemplate','className','children']
     *
     * @param array $template
     * @return true|/WP_Error
     */
    public function validateTemplate($template)
    {
        $container_should_have_keys=array(
            'tagName',
            'searchTemplate',
            'className',
            'children'
        );
        $child_should_have_keys=array_slice($container_should_have_keys,0,-2);
        array_push($child_should_have_keys,'position');
        if(!$this->checkArrayKeys($container_should_have_keys,$template)) return false;
        if(!is_array($template['children'])) return new \WP_Error('wrong_template_format','Template patterns array should have children section.');
        foreach ($template['children'] as $child){
            if(is_wp_error($result=$this->checkArrayKeys($child_should_have_keys,$child))) return $result;
        }   
        return true;
    }
    /**
     * 
     * Checks if the given array includes all keys that are in the mask array
     *
     * @param array $must_have_keys
     * @param array $array
     * @return true|\WP_Error
     */
    protected function checkArrayKeys($must_have_keys,$array)
    {
        $given_keys=array_keys($array);
        $has_difference=array_diff($must_have_keys,$given_keys);
        if(empty($has_difference)) return true;
        return new \WP_Error('no_needed_array_key','No needed parameters in extraOptions parsing options array.Missing keys:'.implode(',',$has_difference));
    }
}
