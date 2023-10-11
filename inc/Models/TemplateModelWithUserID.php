<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;

/**
 * Class TemplateModelWithPostOptions
 *
 * This class extends the TemplateModel class and adds support for post options.
 *
 * @package  Models
 * @license  MIT
 */

class TemplateModelWithUserID extends TemplateModelWithPostOptions
{
    /**
     * ID of user that saves template info
     */
    protected $userID;
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
        !isset($options['postOptions'])||
        !isset($options['userID'])){
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
        parent::assignOptions($options);
        $this->userID=$options['userID'];
    }
   
    /**
     * Returns ID of user saved template data.This ID will be used to save automatioc parsed posts.
     */
    public function getUserID()
    {
        return $this->userID;
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
            'postOptions'=>$this->postOptions,
            'userID'=>$this->userID
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
}