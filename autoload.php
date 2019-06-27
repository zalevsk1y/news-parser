<?php
/**
 * Autoload function for news-parser-plugin
 *
 * @param string $class full class name
 * 
 * @return void
 */
function news_parser_plugin_autoload($class)
{   
    $cl = str_replace(array(NEWS_PARSER_PLUGIN_ROOT_NAMESPACE,'\\'), array('', '/'), $class);

    $path = __DIR__ . DIRECTORY_SEPARATOR . 'inc' . DIRECTORY_SEPARATOR . $cl . ".php";
    if (file_exists($path)) {
        include $path;
    }
}

spl_autoload_register("news_parser_plugin_autoload");
