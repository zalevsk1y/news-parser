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

class HTMLRaw extends Abstracts\AbstractParseContent
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
     * @return string
     */
    protected function parse($data)
    {
       
        $data=apply_filters('htmlRaw:parse',$data);
       
        if (is_array($this->options)&&array_key_exists('remove_scripts', $this->options)&&$this->options['remove_scripts']) {
            return $this->removeScriptTags($data);
        }
        return ($data);
    }
}
