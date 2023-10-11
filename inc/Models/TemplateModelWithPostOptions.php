<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Models\TemplateModel;  

/**
 * Class TemplateModelWithPostOptions
 *
 * This class extends the TemplateModel class and adds support for post options.
 *
 * @package  Models
 * @license  MIT
 */

class TemplateModelWithPostOptions extends TemplateModel{
    /**
     * Post options.
     *
     * @var array
     */
    protected $postOptions;
    /**
     * Check if the options have a valid format.
     *
     * @param array $options The options to validate.
     *
     * @return bool Returns true if the options have a valid format, false otherwise.
     */
    protected function isOptionsValid($options)
    {
        if(!isset($options['extraOptions'])||
        !isset($options['template'])||
        !isset($options['postOptions'])){
            return false; 
        }
        return true;
    }
    /**
     * Assign options to object properties.
     *
     * @param array $options
     * @return void
     */
    protected function assignOptions($options)
    {
        $this->resourceUrl=$options['url'];
        $this->parseTemplate=$options['template'];
        $this->extraOptions=$options['extraOptions'];
        $this->postOptions=$options['postOptions'];
    }
    /**
     * Return options data in proper format.
     * 
     * @param string $format accept array|object|json.
     * @return array|object|string
     */
    protected function formatAttributes($format)
    {
        $data=array(
            'url'=>$this->resourceUrl,
            'extraOptions'=>$this->extraOptions,
            'template'=>$this->parseTemplate,
            'postOptions'=>$this->postOptions
        );
        switch ($format) {
            case 'array':
                return $data;
            case 'object':
                return $this;
            case 'json':
                return json_encode($data);
        }
    }
    /**
     * Format the post options array to match the expected format.
     *
     * @param array $postOptions The post options to format.
     *
     * @return array Returns the formatted post options array.
     */

    protected function formatPostOptions($postOptions)
    {
        if (isset($postOptions['status'])){
           $postOptions['post_status']=$postOptions['status'];
            unset($postOptions['status']);
        }
        if (isset($postOptions['categories'])){
            $postOptions['post_category']=$postOptions['categories'];
            unset($postOptions['categories']);
        }
        if (isset($postOptions['tags'])){
            $postOptions['tags_input']=$postOptions['tags'];
            unset($postOptions['tags']);
        }
        return $postOptions;
    } 
    /**
     * Getter function for post options.
     *
     * @return false|array Returns the post options as an array, or false if no options are set.
     */

    public function getPostOptions()
    {
        return isset($this->postOptions)?$this->formatPostOptions($this->postOptions):false;
    }
}