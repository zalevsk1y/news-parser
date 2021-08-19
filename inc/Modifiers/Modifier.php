<?php

namespace NewsParserPlugin\Modifiers;

use NewsParserPlugin\Interfaces\MiddlewareInterface;
/**
 * Class implements __invoke for modifiers. 
 * It is abstract to make instance creation impossible. 
 *
 * PHP version 5.6
 *
 *
 * @package  Modifiers
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
abstract class Modifier {
    protected $modifiers=array();
    /**
     * Call methods and path them html data.
     * 
     * @param string $data
     * @return array 
     */
    public function __invoke($data){
        return array(array_reduce(
            $this->modifiers,
            function($acc,$modifier){
                return \call_user_func($modifier,$acc);
            },
            $data)
        );
    }
}