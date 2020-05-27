<?php

namespace NewsParserPlugin\Modifiers;

use NewsParserPlugin\Interfaces\MiddlewareInterface;

class RemoveLineBreaks implements MiddlewareInterface{
    public function __invoke($data){
        return array(array_reduce(array(
            array($this,'regexpRemoveBreak')
        ),
        function($acc,$modifier){
            return \call_user_func($modifier,$acc);
        },
        $data)
    );
    }
    protected function regexpRemoveBreak($data){
        return \preg_replace('/\n/i','',$data);
    }
}