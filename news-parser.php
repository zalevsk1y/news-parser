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
use DI\ContainerBuilder;

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
if(\file_exists(NEWS_PARSER_PLUGIN_DIR.'vendor/autoload.php')) require NEWS_PARSER_PLUGIN_DIR.'vendor/autoload.php';

$container_builder=new ContainerBuilder();
$container_builder->addDefinitions(NEWS_PARSER_PLUGIN_DIR.'di-config.php');
$container=$container_builder->build();
$event_controller=$container->get('Controllers\EventController');

$event_controller->on('media:create',array('Controllers\MediaController','create'));
$event_controller->on('options:create',array('Controllers\OptionsController','create'));
$event_controller->on('list:get',array('Controllers\ListController','get'));
$event_controller->on('html:get',array('Controllers\VisualConstructorController','get'));
$event_controller->on('post:create',array('Controllers\PostController','create'));

Controller\AjaxController::create($event_controller);

Core\Main::start();

\register_uninstall_hook(__FILE__, 'Utils\Settings::deleteSettings');
