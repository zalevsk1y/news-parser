<?php

namespace NewsParserPlugin\Modifiers;

use NewsParserPlugin\Interfaces\MiddlewareInterface;
/**
 * Modify HTML. Remove line breaks.
 *
 * PHP version 5.6
 *
 *
 * @package  Modifiers
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class RemoveLineBreaks extends Modifier implements MiddlewareInterface{
    protected $modifiers;
    /**
     * init function
     */
    public function __construct(){
        
        $this->modifiers=array(array($this,'regexpRemoveBreak'));
        
    }
    /**
     * Remove line breaks using regexp.
     */
    protected function regexpRemoveBreak($data){
        return \preg_replace('/\n/i','',$data);
    }
}