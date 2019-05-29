<?php

namespace Parser;
use Interfaces\ParserInterface;
use Exception\MyException;
use Message\Errors;
use Utils\ChainController;
use Utils\PipeController;
/**
 * Class for parsing XML files from rss-feed to get list of posts.
 * 
 * PHP version 7.2.1
 * 
 * @category Parser
 * @package  XMLParser
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT 
 * @link     https://github.com/2600BottlesOnTheWall
 */

class XMLParser implements ParserInterface
{
    protected $chainController;

    public function parse($xml){

        $data=$this->xmlParser($xml);
        $structuredData=$this->formatData($data);
        return $structuredData;

    }

    protected function xmlParser(string $str){
        libxml_use_internal_errors(true);
        $data=simplexml_load_string($str);
        $errors = libxml_get_errors();
        
        if($errors){
            libxml_clear_errors();
            throw new MyException(Errors::XML_PARSING);
        }
        
        return $data;
    }
    protected function sanitizeUrl($url){
        return (string)$url;
    }
    protected function sanitizeText($str){
        return (string)$str;
    }
    protected function formatData($data){
        $response=array();
        $namespaces=$data->getNamespaces(true); 
        foreach($data->channel->item as $item)
        {   $image=null;

           
            $title=(string)($item->title);
           
            $date=$this->sanitizeText($item->pubDate);
            $description=$this->parseDescription($item->description);
            $link=$this->sanitizeUrl($item->link);
            $image=$this->parseImage($item,$item->description);
            $response[]=(object)array(
                'title'=>$title,
                'pubDate'=>$date,
                'description'=>$description,
                'link'=>$link,
                'image'=>$image,
                'status'=>'parsed'
            );
        }
        return $response;
    }
    protected function convertToStdClass(&$obj){
        $temp_json=json_encode($obj);
        $obj=json_decode($temp_json);
      
    }
    protected function parseDescription($data){
        if(gettype($data)=="object"){
            $data=(string)$data;
        }
        $text=$this->pipe($data)
            ->func('trim',array("data"))
            ->regExp('\<p\>(.*)\<\/p\>')
            ->removeTags()
            ->cutText(24)
            ->get();

        return $text;
    }

    protected function parseImage($xml,$text){
        $image=$this->chain()
            ->parseImageEnclosure($xml)
            ->parseImageMedia($xml)
            ->parseImageDescription($text)
            ->get();
        return $image?:PARSER_NO_IMAGE_PATH;
    }
    public function cutText($length,$text){
        $text=$this->pipe($text)
            ->func('explode',array(" ","data"))
            ->func('array_slice',array('data',0,$length))
            ->func('implode',array(" ","data"))
            ->get();
            return $text.'...';
    }
    public function removeTags($data, $pattern = '@(<[^>]*>)@')
    {
        return preg_replace($pattern, '', $data);
    }
    public function regExp($pattern, $string){
        $string=str_replace(PHP_EOL,'',$string);
        preg_match_all('@'.$pattern.'@i',$string,$match);
        if(count($match[1])){
            $data=$this->removeTags($match[1]);
            return (string)$data[0];
        }
        
        return false;
    }
    public function parseImageEnclosure($xml){
        $image=false;
        if(property_exists($xml,'enclosure')){
            $image=(string)$xml->enclosure->attributes()->url;
        }
        return $image?:false;
    }
    public function parseImageMedia($xml){
        $image=false;
        $media_node = $xml->children('media',true);
        if(isset($media_node->thumbnail)){
            $image=(string)$media_node->thumbnail->attributes()->url;
        }
        return $image?:false;
    }
    public function parseImageDescription($text){
        $image=false;
        if(gettype($text)=="object"){
            $text=(string)$text;
        }
        $text=trim($text);
        $image=$this->regExp('src\=\"([^\"|\']*\.[jpg|png|tiff]..)',$text);
        return $image?:false;
    }
    protected function chain(){
       return (new ChainController())->build($this);
    }
    protected function pipe($input_data){
        return (new PipeController())->build($input_data,$this);
    }
}