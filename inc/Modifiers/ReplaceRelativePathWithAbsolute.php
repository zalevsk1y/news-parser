<?php

namespace NewsParserPlugin\Modifiers;

use NewsParserPlugin\Interfaces\MiddlewareInterface;
/**
 * Modify HTML. Replace relative path with absolute.
 *
 * PHP version 5.6
 *
 *
 * @package  Modifiers
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class ReplaceRelativePathWithAbsolute implements MiddlewareInterface{
    /**
     * Return replaced data when called as a function.
     * 
     * @param array $data
     * @return array
     */
    public function __invoke($data){
    
        return array($this->replace($data[0],$data[1]));
    
    }
    /**
     * Gets domain name from url 
     * 
     * @param string $url
     * @return string 
     */
    protected function parseUrl($url,$type){
        $pattern= "/^(http(s|)\:\/\/)([a-zA-Z\.\-]+[^\/\:])/i";
        \preg_match($pattern,$url,$matches);
        switch ($type){
            case 'domain':
                return $matches[3];
            case 'prefix':
                return $matches[1].$matches[3]."/";
        }
        
    }
    /**
     * Replace relative path to absolute.
     * 
     * @param string $html
     * @param string $url_domain
     * 
     * @return string
     */
    protected function replace($html,$url){
        $pattern="/(src|href)=(\"|\')(?P<path>.*?)(\"|\')/i";
        $url_domain=$this->parseUrl($url,"domain");
        $url_prefix=$this->parseUrl($url,"prefix");
        return \preg_replace_callback($pattern,
            function($matches) use($url_domain, $url_prefix){
                if(preg_match("/^(www|http(s|)|{$url_domain})/i",$matches['path'])===0){
                    $test=$matches[1].'="'.$url_prefix.$matches['path'].'"';
                    return $matches[1].'="'.$url_prefix.$matches['path'].'"';
                }else {
                    return $matches[0];
                }
            },
         $html);
    }
}