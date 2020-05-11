<?php
namespace NewsParserPlugin\Interfaces;

interface MiddlewareInterface{
    public function __invoke($data);
}