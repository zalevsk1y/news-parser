<?php
namespace NewsParserPlugin\Traits;
/**
 * Methods to validate input data.
 * 
 * PHP version 5.6
 *
 * @package  Parser
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
     * @return false|string
     */
    public function validateImageUrl($input_url)
    {
        $filetype=wp_check_filetype($input_url);
        $mime_type=$filetype['type'];
        if(false!==strpos($mime_type,'image')){
            return $input_url;
        }
        return false;
    }
    /**
     * Validate structure of input media options.
     * Structure:[postId,alt]
     *
     * @param array $options 
     * @return bool
     */
    public function validateMediaOptionsArray($options)
    {
        if(!array_key_exists('postId',$options)) return false;
        if(!array_key_exists('alt',$options)) return false;
        return true;
    }
    /**
     * Validate structure of input extra options.
     * Structure:['addSource','addFeaturedMedia','saveParsingTemplate','url']
     *
     * @param array $extra_options
     * @return bool
     */
    public function validateExtraOptions($extra_options)
    {
        $extra_option_should_have_keys=array(
            'addSource',
            'addFeaturedMedia',
            'saveParsingTemplate',
            'url'
        );
        return $this->checkArrayKeys($extra_option_should_have_keys,$extra_options);
    }
    /**
     * Validate structure of template patterns.
     * Structure:[ 'tagName','searchTemplate','className','children']
     *
     * @param array $template
     * @return bool
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
        if(!is_array($template['children'])) return false;
        foreach ($template['children'] as $child){
            if(!$this->checkArrayKeys($child_should_have_keys,$child)) return false;
        }   
        return true;
    }
    /**
     * 
     * Checks if the given array includes all keys that are in the mask array
     *
     * @param array $must_have_keys
     * @param array $array
     * @return boolean
     */
    protected function checkArrayKeys($must_have_keys,$array)
    {
        $given_keys=array_keys($array);
        $has_difference=array_diff($must_have_keys,$given_keys);
        if(empty($has_difference)) return true;
        return false;
    }
}
