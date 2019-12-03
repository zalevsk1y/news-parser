<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;

class OptionsController{
    protected $optionsFactory;
    protected $formatResponse;

    public function __construct(FactoryInterface $optionsFactory,ResponseFormatter $formatter){
        $this->optionsFactory=$optionsFactory;
        $this->formatResponse=$formatter;
    }
    public function save($url,$options){
        $parsed_url=parse_url($url);
     
        try{
            if(!is_array($parsed_url)) throw new MyException (Errors::text('WRONG_OPTIONS_URL'));
            $optionsModel=$this->optionsFactory->get($parsed_url);
            $optionsModel->save($options);
            $response=$this->formatResponse->message('success',Success::text('TEMPLATE_SAVED'))->get('json');
            
        }catch(myException $e){
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }    
        return $response;
    }
    
}