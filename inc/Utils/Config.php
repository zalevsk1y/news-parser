<?php
namespace Utils;
class Config{
    protected static $config;
    public static function get(){
        if(!static::$config){
            
            static::$config=include (NEWS_PARSER_DIR.'config.php');
        }
        return static::$config;
    }
}