<?php
/*
Plugin Name: News Parser
Plugin URI: http://bestplugin.com
Description: Parse full text news from RSS Feed
Version: 0.1.0
Author: Evgeny S.Zalevskiy <2600@ukr.net>
Author URI: https://github.com/zalevsk1y/
License: MIT
 */
?>
<?php

include 'autoload.php';
include 'vendor/autoload.php';


define('NEWS_PARSER_VERSION',    '1.0.0');
define("NEWS_PARSER_SLUG",       'news-parser');
define("NEWS_PARSER_SETTINGS_SLUG",       'news_parser_settings');
define('NEWS_PARSER_PLUGIN_URL', plugins_url('',__FILE__));
define("NEWS_PARSER_DIR",        plugin_dir_path( __FILE__ ));
define("PARSER_CACHE_FILE_PATH", plugin_dir_path( __FILE__ ).'cache/');
define("PARSER_CACHE_FILENAME",  'parsing_cache');
define("PARSER_NO_IMAGE_PATH",   plugins_url('',__FILE__).'/images/no-image.svg');
define("AJAX_PARSING_API",       'news_parser_parsing_api');
define("AJAX_SETTINGS_API",      'news_parser_settings_api');


$modules=[];
$conf=include(NEWS_PARSER_DIR.'/config.php');
//---Admin menu modules
$modules['menu_page']         =new Menu\Admin\MenuPage();
$modules['main']              =new Core\Main($modules['menu_page']);
//---Parser modules
$modules['XML_parser']        =new Parser\XMLParser();
//--vendor HTML parser
$modules['sunra_parser']      =new Sunra\PhpSimple\HtmlDomParser();
$modules['html_parser']       =new Parser\HTMLParser($modules['sunra_parser']);
//--facades for parser
$modules['parsing_post']      =new Parser\ParseContent($modules['html_parser'],3600);
$modules['parsing_rss_list']  =new Parser\ParseContent($modules['XML_parser']);
//---Controllers 
//--deps
$modules['settings']          =new Utils\Settings();
$modules['response_formatter']=new Utils\ResponseFormatter();
$modules['list_factory']      =new Factory\ListFactory();
$modules['post_factory']      =new Factory\PostFactory();
//--controllers
$module['list_controller']    =new Controller\ListController($modules['parsing_rss_list'],$modules['settings'],$modules['response_formatter'],$modules['list_factory']);
$module['post_controller']    =new Controller\PostController($modules['parsing_post'],$modules['settings'],$modules['response_formatter'],$modules['post_factory']);
$module['settings_controller']=new Controller\SettingsController($modules['settings'],$modules['response_formatter']);
//---Ajax
$modules['ajax_controller']   =new Ajax\Ajax($module['list_controller'],$module['post_controller'],$module['settings_controller'] );


register_uninstall_hook( __FILE__, array($modules['settings'],'deleteSettings'));