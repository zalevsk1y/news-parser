<?php


function my_class($class){
    $cl=str_replace('\\','/',$class);
    $path=__DIR__.DIRECTORY_SEPARATOR.'inc'.DIRECTORY_SEPARATOR.$cl.".php";
    if (file_exists($path)) {
        include $path;
    }
}
//set_include_path(__DIR__);
spl_autoload_register("my_class");
?>