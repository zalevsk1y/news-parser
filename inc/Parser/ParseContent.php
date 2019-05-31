<?php
namespace Parser;

use Exception\MyException;
use Message\Errors;

use Interfaces\ParserInterface;

class ParseContent
{
    protected $parser;
    protected $response;
    protected $cache_expiration;
    public function __construct(ParserInterface $parser,$cache_expiration=60){
        $this->parser=$parser;
        $this->cache_expiration=$cache_expiration;
    }
    public function get(string $url){
        $data=$this->parse($url);
      
        return $data;
    }

    protected function getFromCache($url){
        //add error handling?
        $hashId=sha1($url);
        return get_transient( $hashId );
      
    }
    protected function setCache($url,$data){
        $hashId=sha1($url);
        return set_transient($hashId,$data,$this->cache_expiration);
    }
    protected function download($url)
    {
        $data = file_get_contents($url);
        if(!$data)throw new MyException(Errors::text('FILE_DOWNLOAD'));   
        return $data;
    }
    protected function parse($url){
       $data=$this->getFromCache($url);
        if($data){
            $response = $this->parser->parse($data);
            return $response;
        }
        $data = $this->download($url);
        $this->setCache($url,$data);
        $response = $this->parser->parse($data);
       
        return $response;
    }

}