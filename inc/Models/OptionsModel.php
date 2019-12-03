<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;

class OptionsModel implements ModelInterface{
    protected $resourceUrl;
    protected $extraOptions;
    protected $parseTemplate;
    protected $hash;
    public function __construct($url){
        $this->resourceUrl=$url;
        $this->hash=sha1($this->resourceUrl);
      
    }
    public function save($options){
        $data=array(
            'extraOptions'=>$options['extraOptions'],
            'template'=>$options['template']
        );
        return update_option($this->hash,$data,'','no');
    }
    public function delete(){
        return delete_option($this->hash);
    }
    protected function get(){
        return get_option($this->hash);
    }
    public function getTemplate(){
        return $this->parseTemplate;
    }
    public function getExtraOptions(){
        return $this->extraOptions;
    }
    public function getAttributes($format){
        $options=$this->get();
        if(!$options) throw new myException(Errors::text('NO_TEMPLATE'));
        $data=array(
            'extraOptions'=>$options['extraOptions'],
            'template'=>$options['template']
        );
        $this->parseTemplate=$options['template'];
        $this->extraOptions=$options['extraOptions'];
        switch($format){
            case 'array':
                return $data;
            case 'object':
                return $this;
            case 'json':
                return json_encode($data);
        }
    }
}