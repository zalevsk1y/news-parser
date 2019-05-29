<?php

namespace Controller;
use Utils\Settings;

use Utils\ResponseFormatter;
use Parser\ParseContent;

use Message\Success;
use Message\Error;

use Interfaces\ControllerInterface; 
use Interfaces\FactoryInterface; 

use Exception\MyException;


class ListController implements ControllerInterface{
    public function __construct(ParseContent $listParser,Settings $settings,ResponseFormatter $formatter,FactoryInterface $listFactory){
        $this->listParser=$listParser;
        $this->settings=$settings;
        $this->formatResponse=$formatter;
        $this->listFactory=$listFactory;
    }
    public function get(string $url,string $options=null){
        try{
            $listData=$this->listParser->get($url);
            $list=$this->listFactory->get($listData);
            $response=$this->formatResponse->list($list->getAttributes())->message('success',Success::RSS_LIST_PARSED)->get('json');
        }catch(MyException $e){
            $response=$this->formatResponse->message('error',$e->getMessage())->get('json');
        }
        return $response;
    }

}