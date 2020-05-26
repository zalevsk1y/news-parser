<?php

namespace NewsParserPlugin\Modifiers;

use NewsParserPlugin\Interfaces\MiddlewareInterface;

class ReplaceRelativePathWithAbsolute implements MiddlewareInterface{
    public function __invoke($data){
        $domain=$this->getDomainFromUrl($data[1]);
        return $this->replace($data[0],$domain);
    
    }
    protected function getDomainFromUrl($url){
        $pattern= '/(^(http:\/\/|https\:\/\/).*?)\//i';
        \preg_match($pattern,$url,$matches);
        return $matches[1];
    }
    protected function replace($html,$url_domain){
        $pattern='/(src|href)=(\"|\')(?P<path>.*?)(\"|\')/i';
        return \preg_replace_callback($pattern,
            function($matches) use($url_domain){
                if(preg_match('/^\//i',$matches['path'],$begin)===1){
                    return $matches[1].'="'.$url_domain.$matches['path'].'"';
                 } else {
                    return $matches[0];
                }
            },
         $html);
    }
}