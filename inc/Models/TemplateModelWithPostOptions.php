<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Models\TemplateModel;  


class TemplateModelWithPostOptions extends TemplateModel{

    protected $postOptions;
    /**
     * Save options using wp function update_option.
     *
     * @throws MyException if options have wrong format.
     * @param array $options
     * @return boolean
     */
    public function save($options)
    {
        if (!isset($options['postOptions'])||!isset($options['extraOptions'])||!isset($options['template'])) {
            throw new MyException(Errors::text('OPTIONS_WRONG_FORMAT'), Errors::code('BAD_REQUEST'));
        }
        $data=array(
            'postOptions'=>$options['postOptions'],
            'extraOptions'=>$options['extraOptions'],
            'template'=>$options['template']
        );
        $result=update_option($this->hash, $data, '', 'no');
        if ($result) {
            $this->assignOptions($data);
        }
        return $result;
    }
    /**
     * Assign options to object properties.
     *
     * @param array $options
     * @return void
     */
    protected function assignOptions($options)
    {
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