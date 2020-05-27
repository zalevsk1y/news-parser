<?php

namespace NewsParserPlugin\Modifiers;

use NewsParserPlugin\Interfaces\MiddlewareInterface;

class ImagePrepare implements MiddlewareInterface{
    public function __invoke($data){
        return array(array_reduce(array(
                array($this,'dataSrc'),
                array($this,'pictureTag')
            ),
            function($acc,$modifier){
                return \call_user_func($modifier,$acc);
            },
            $data)
        );
    }
    protected function dataSrc($data){
        return \preg_replace_callback('/(<img.*?>)/i',
            function($matches){
                if(preg_match('/data-src=(\'|\")(.*?)(\'|\")/i',$matches[1],$path)===1){
                    return preg_replace('/src=(\'|\")(.*?)(\'|\")/i','src="'.$path[2].'"',$matches[1]);
                } 
                return $matches[1];
            },
            $data);
    }
    protected function pictureTag($data){
        return \preg_replace_callback('/(<picture.*?>.*?<\/picture>)/i',
            function($matches){
                if(preg_match('/data-srcset=(\'|\")(.*?)(\'|\")/i',$matches[1],$path)===1){
                    return preg_replace('/srcset=(\'|\")(.*?)(\'|\")/i','srcset="'.$path[2].'"',$matches[1]);
                } 
                return $matches[1];
            },
        $data);
                
    }
    
}