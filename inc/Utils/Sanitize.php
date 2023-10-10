<?php
namespace NewsParserPlugin\Utils;

/**
 * Class load menu config file.
 * 
 * @package Utils
 * @author  Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license MIT https://opensource.org/licenses/MIT
 */

Class Sanitize{

    static public function sanitizeURL($url){
        $link=self::pipe($url)
        ->func('trim',array('data'))
        ->func('preg_replace',array('/^(http(s)?)?:?\/*/u','http$2://','data'))
        ->func('str_replace',array(array('*','<','>','\\','(',')'),'','data'))
        ->func('htmlspecialchars',array('data', 11,'UTF-8',true))
        ->get();
        return $link;
    }
    
    static public function sanitizeImageURL($url){
        $link=self::pipe($url)
        ->func('trim',array('data'))
        ->func('preg_replace',array('/^(http(s)?)?:?\/*/u','http$2://','data'))
        ->func('str_replace',array(array('=','&','+','*','<','>','\\','(',')'),'','data'))
        ->func('htmlspecialchars',array('data', 11,'UTF-8',true))
        ->get();
        return $link;
    }

    static function sanitizeUrlArray(array $urls_array)
    {
        $output = [];
        foreach ($urls_array as $key => $item) {
            $output[$key] = static::sanitizeImageURL($item);
        }
        return $output;
    }
    static protected function pipe($input_data){
        return new PipeController('',$input_data);
    }
}