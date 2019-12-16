<?php
namespace NewsParserPlugin\Parser;

class ParserDispatcher{
    public function __construct(ParserFactory $factory){
        $this->factory=$factory;
    }
    public function html($url,$options){
        return $this->factory->htmlParser()->get($url,$options);
    }
    public function xml($url,$options){
        return $this->factory->xmlParser()->get($url,$options);
    }
    public function rawHTML($url,$options){
        return $this->factory->rawHTML()->get($url,$options);
    }
}