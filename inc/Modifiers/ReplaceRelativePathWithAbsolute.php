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
        $domain=$this->getDomainFromUrl($data[1]);
        return array($this->replace($data[0],$domain));
    
    }
    /**
     * Gets domain name from url 
     * 
     * @param string $url
     * @return string 
     */
    protected function getDomainFromUrl($url){
        $pattern= '/(^(http:\/\/|https\:\/\/).*?)\//i';
        \preg_match($pattern,$url,$matches);
        return $matches[1];
    }
    /**
     * Replace relative path to absolute.
     * 
     * @param string $html
     * @param string $url_domain
     * 
     * @return string
     */
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