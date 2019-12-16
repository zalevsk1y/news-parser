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
if(\file_exists('vendor/autoload.php')) require 'vendor/autoload.php';

$modules = [];
//---Menu config file loader module
$modules['menu_config']=new Utils\MenuConfig(NEWS_PARSER_PLUGIN_DIR.'menu-config.php');
//---Admin menu modules
$modules['menu_page'] = new Menu\Admin\MenuPage();
$modules['main'] = new Core\Main($modules['menu_page'],$modules['menu_config']);
//Response formatter
$modules['response_formatter'] = new Utils\ResponseFormatter();
//Factories
$modules['parser_factory']=new Factory\ParserFactory();
$modules['controllers_factory']=new Factory\ControllersFactory($modules['response_formatter'],$modules['parser_factory']);
//---Ajax Singleton
$modules['ajax_controller'] =  Ajax\AjaxController::getInstance($modules['controllers_factory']);
\register_uninstall_hook(__FILE__, 'Utils\Settings::deleteSettings');
