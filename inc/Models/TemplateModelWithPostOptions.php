<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Models\TemplateModel;  


class TemplateModelWithPostOptions extends TemplateModel{

    protected $postOptions;
    
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
     * Getter function for post options.
     *
     * @return false|array
     */
    public function getPostOptions()
    {
        return isset($this->postOptions)?$this->postOptions:false;
    }
}