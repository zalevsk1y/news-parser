<?php
namespace NewsParserPlugin\Parser;

use NewsParserPlugin\Parser\HTMLPatternParser;
use NewsParserPlugin\Interfaces\AdapterInterface;
use NewsParserPlugin\Traits\FunctionAutoloadTrait;
/**
 * Class HTMLPatternParser
 *
 * Parse HTML using pre-saved template pattern.
 *
 * @package NewsParserPlugin\Parser
 */
class HTMLPatternParserWithModifiers extends HTMLPatternParser
{
/**
     * Methods to get function psr-4 like way
     *
     * @method loadFunction()
    
     */
    use FunctionAutoloadTrait;

    public function __construct(AdapterInterface $adapter, $cache_expiration = 3600,$modifiers=[])
    {
        parent::__construct($adapter,$cache_expiration);
        $this->modifiers=$modifiers;
    }
    protected function parseContainer($elements)
    {
        return $this->addModifiers(parent::parseContainer($elements));
    }
    protected function addModifiers($body_array){
        //implement modification
        if(count($this->modifiers)>0){
            $body_array=array_reduce($this->modifiers,array($this,'modefierExecuterCallback'),$body_array );
        }
        return \apply_filters('news_parser_post_body',$body_array);
    }
    protected function modefierExecuterCallback($body_array,$modifier_function){
        $modifier_function_path=$this->loadFunction($modifier_function); 
        if(!is_null($modifier_function_path)){
            include $modifier_function_path;
            if (function_exists($modifier_function)){
                return call_user_func($modifier_function, $body_array);
            }
        }
        return $body_array;
    }
    

}