<?php
namespace NewsParserPlugin\Parser;


/**
 * Get not parsed HTML data
 *
 * PHP version 5.6
 *
 *
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class HTMLRaw extends AbstractParseContent
{
    /**
     * Init function.
     * 
     * @param int $cache_expiration Cache expiration value in seconds.
     */
    public function __construct($cache_expiration = 600)
    {
        parent::__construct($cache_expiration);
   
    }
    /**
     * Get page raw html data.
     *
     * @param string $data Html raw data.
     * @param array $options Array of options ['remove_scripts']
     * @return string
     */
    protected function parse($data,$options)
    {
        if(array_key_exists('remove_scripts',$options)&&$options['remove_scripts']){
            return $this->removeScriptTags($data);
        }
        return $data;

    }
}