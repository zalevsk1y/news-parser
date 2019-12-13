<?php
namespace NewsParserPlugin\Interfaces;

interface ResponseFormatterInterface
{
   /**
     * Return new instance of ResponseFormatter class
     * 
     * @return ResponseFormatterInterface
     */
    public static function format();
}