<?php

namespace NewsParserPlugin\Modifiers;

use NewsParserPlugin\Interfaces\MiddlewareInterface;

class ReplaceRelativePathWithAbsolute implements MiddlewareInterface{
    public function __invoke($data){
        return $data;
    }
}