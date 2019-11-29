<?php
/*
Plugin Name: News-Parser
Plugin URI: https://github.com/zalevsk1y/news-parser
Description: Parse full text news from RSS Feed
Version: 0.8.0
Author: Evgeny S.Zalevskiy <2600@ukr.net>
Author URI: https://github.com/zalevsk1y/
License: MIT
Text Domain: news-parser
 */
?>
<?php
namespace NewsParserPlugin;


define('NEWS_PARSER_PLUGIN_VERSION', '0.8.0');
define("NEWS_PARSER_PLUGIN_SLUG", 'news-parser');
define("NEWS_PARSER_PLUGIN_ROOT_NAMESPACE", 'NewsParserPlugin');
define("NEWS_PARSER_PLUGIN_SETTINGS_SLUG", 'news_parser_settings');
define('NEWS_PARSER_PLUGIN_URL', plugins_url('', __FILE__));
define("NEWS_PARSER_PLUGIN_DIR", plugin_dir_path(__FILE__));
define("NEWS_PARSER_PLUGIN_DIR_NAME", basename(dirname(__FILE__)));
define("NEWS_PARSER_PLUGIN_NO_IMAGE_PATH", plugins_url('', __FILE__) . '/images/no-image.svg');
define("NEWS_PARSER_PLUGIN_AJAX_PARSING_API", 'news_parser_parsing_api');
define("NEWS_PARSER_PLUGIN_AJAX_MEDIA_API", 'news_parser_media_api');
define("NEWS_PARSER_PLUGIN_AJAX_OPTIONS_API", 'news_parser_options_api');

require 'autoload.php';
require 'vendor/autoload.php';

$modules = [];
//---Menu config file loader module
$modules['menu_config']=new Utils\MenuConfig(NEWS_PARSER_PLUGIN_DIR.'menu-config.php');
//---Admin menu modules
$modules['menu_page'] = new Menu\Admin\MenuPage();
$modules['main'] = new Core\Main($modules['menu_page'],$modules['menu_config']);
//---Parser modules
$modules['XML_parser'] = new Parser\XMLParser();
$modules['html_raw']=new Parser\HTMLRaw(600);
//--vendor HTML parser
$modules['sunra_parser'] = new \Sunra\PhpSimple\HtmlDomParser();
$modules['html_parser'] = new Parser\HTMLParser($modules['sunra_parser'], 3600);
$modules['html_pattern_parser'] = new Parser\HTMLPatternParser($modules['sunra_parser'], 3600);
//---Controllers
//--deps
$modules['settings'] = new Utils\Settings();
$modules['response_formatter'] = new Utils\ResponseFormatter();
$modules['list_factory'] = new Factory\ListFactory();
$modules['post_factory'] = new Factory\PostFactory();
$modules['options_factory'] = new Factory\OptionsFactory();
//--controllers
$modules['list_controller'] = new Controller\ListController($modules['XML_parser'], $modules['settings'], $modules['response_formatter'], $modules['list_factory']);
$modules['post_controller'] = new Controller\PostController($modules['html_pattern_parser'], $modules['options_factory'], $modules['response_formatter'], $modules['post_factory']);
$modules['settings_controller'] = new Controller\SettingsController($modules['settings'], $modules['response_formatter']);
$module['option_controller']=new Controller\OptionsController($modules['options_factory'],$modules['response_formatter']);
$modules['visual_constructor_controller']=new Controller\VisualConstructorController($modules['html_raw'],$modules['response_formatter']);
//---Ajax
$modules['ajax_controller'] =  Ajax\Ajax::getInstance($modules['list_controller'], $modules['visual_constructor_controller'],$modules['post_controller'],$module['option_controller']);
//---Rest
$modules['rest_visual_constructor']= new Rest\VisualConstructorRestController($modules['visual_constructor_controller']);
\register_uninstall_hook(__FILE__, 'Utils\Settings::deleteSettings');
