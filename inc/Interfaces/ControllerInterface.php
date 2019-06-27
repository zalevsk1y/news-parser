<?php
namespace NewsParserPlugin\Interfaces;

interface ControllerInterface{
    public function get(string $url,string $options);
}