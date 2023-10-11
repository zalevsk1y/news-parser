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
trait ValidateDataTrait
{
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
        $imageFileTypes = array(
            'jpg|jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'bmp' => 'image/bmp',
            'svg' => 'image/svg+xml',
            'webp' => 'image/webp',
            'ico' => 'image/x-icon'
        );
        
        $filetype=wp_check_filetype($input_url,$imageFileTypes);
        $mime_type=$filetype['type'];
        if (false!==strpos($mime_type, 'image')) {
            return true;
        }
        return new \WP_Error(400, 'Given url is not a valid image url.URL: '.esc_url_raw($input_url));
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
        if (!array_key_exists('post_id', $options)) {
            return new \WP_Error(400, 'Media no needed key.Missing key:post_id');
        }
        if (!array_key_exists('alt', $options)) {
            return new \WP_Error(400, 'Media no needed key.Missing key:alt');
        }
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
            'groupImagesRow',
            'addFeaturedMedia',
            'addSrcSetAndSizes'
        );
    
        return $this->checkArrayKeys($extra_option_should_have_keys, $extra_options);
    }
    /**
     * Validate structure of template patterns.
     * Structure:[ 'tagName','searchTemplate','className','children']
     *
     * @param array $template
     * @return true|/WP_Error
     */
    public function validateHTMLTemplate($html_template)
    {
        $container_should_have_keys=array(
            'tagName',
            'searchTemplate',
            'className',
            'children'
        );
        $child_should_have_keys=array_slice($container_should_have_keys, 0, -2);
        array_push($child_should_have_keys, 'position');
        if (!$this->checkArrayKeys($container_should_have_keys, $html_template)) {
            return false;
        }
        if (!is_array($html_template['children'])) {
            return new \WP_Error(400, 'Template patterns array should have children section.');
        }
        foreach ($html_template['children'] as $child) {
            if (is_wp_error($result = $this->checkArrayKeys($child_should_have_keys, $child))) {
                return $result;
            }
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
    protected function checkArrayKeys($must_have_keys, $array)
    {
        $given_keys=array_keys($array);
        $has_difference=array_diff($must_have_keys, $given_keys);
        if (empty($has_difference)) {
            return true;
        }
        return new \WP_Error(400, 'No needed parameters in extraOptions parsing options array.Missing keys:'.implode(',', $has_difference));
    }
    public function validateTemplate($template){
        $template_should_have_keys=array(
            'url',
            'extraOptions',
            'template',
            'postOptions'
        );
        if (!$this->checkArrayKeys($template_should_have_keys, $template)) {
            return false;
        }
        return $this->validateExtraOptions($template['extraOptions'])&&$this->validateHTMLTemplate($template['template']);
    }
}
