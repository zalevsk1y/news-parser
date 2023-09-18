<?php
namespace NewsParserPlugin\Traits;

/**
 * Helper methods for autoloading functions
 *
 * PHP version 5.6
 *
 * @package  Traits
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */
trait FunctionAutoloadTrait
{

    protected function loadFunction ($function)
    {
        $path_str = str_replace(array(NEWS_PARSER_PLUGIN_ROOT_NAMESPACE.'\\','\\'), array('', '/'), $function);
        $function_path_array=explode('\\', $function);
        $path = NEWS_PARSER_PLUGIN_DIR .'inc'. DIRECTORY_SEPARATOR .  $path_str . ".php";
        if (file_exists($path)) {
           return $path;
        }

    }
}