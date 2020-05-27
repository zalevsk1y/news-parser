<?php
/*
Plugin Name: News-Parser
Plugin URI: https://github.com/zalevsk1y/news-parser
Description: Parse full text news from RSS Feed
Version: 1.0.2
Author: Evgeny S.Zalevskiy <2600@ukr.net>
Author URI: https://github.com/zalevsk1y/
License: MIT
Text Domain: news-parser
 */
?>
<?php
namespace NewsParserPlugin;


define('NEWS_PARSER_PLUGIN_VERSION', '1.0.2');
define("NEWS_PARSER_PLUGIN_SLUG", 'news-parser');
define("NEWS_PARSER_PLUGIN_ROOT_NAMESPACE", 'NewsParserPlugin');
define("NEWS_PARSER_PLUGIN_SETTINGS_SLUG", 'news_parser_settings');
define('NEWS_PARSER_PLUGIN_URL', plugins_url('', __FILE__));
define("NEWS_PARSER_PLUGIN_DIR", plugin_dir_path(__FILE__));
define("NEWS_PARSER_PLUGIN_DIR_NAME", basename(dirname(__FILE__)));
define("NEWS_PARSER_PLUGIN_NO_IMAGE_PATH", plugins_url('', __FILE__) . '/public/images/Grey-Gradient.png');
define("NEWS_PARSER_PLUGIN_AJAX_PARSING_API", 'news_parser_parsing_api');
define("NEWS_PARSER_PLUGIN_AJAX_MEDIA_API", 'news_parser_media_api');
define("NEWS_PARSER_PLUGIN_AJAX_TEMPLATE_API", 'news_parser_template_api');
define ("NEWS_PARSER_PLUGIN_VISUAL_CONSTRUCTOR","visual-constructor");
define ("NEWS_PARSER_PLUGIN_PARSER_RSS","parser-rss");


require 'autoload.php';
if(\file_exists(NEWS_PARSER_PLUGIN_DIR.'vendor/autoload.php')) require NEWS_PARSER_PLUGIN_DIR.'vendor/autoload.php';





$container_builder=new \DI\ContainerBuilder();
$container_builder->addDefinitions(NEWS_PARSER_PLUGIN_DIR.'di-config.php');
$container=$container_builder->build();

$app=Core\App::start($container);
$modifiers=array(
   new Modifiers\RemoveLineBreaks(),
   new Modifiers\ReplaceRelativePathWithAbsolute(),
   new Modifiers\ImagePrepare()
);
$app->middleware->add('htmlRaw:parse',$modifiers);


$app->event->on('media:create',array(Controller\MediaController::class,'create'));
$app->event->on('template:create',array(Controller\TemplateController::class,'create'));
$app->event->on('list:get',array(Controller\ListController::class,'get'));
$app->event->on('html:get',array(Controller\VisualConstructorController::class,'get'));
$app->event->on('post:create',array(Controller\PostController::class,'create'));


\register_uninstall_hook(__FILE__, 'Utils\Settings::deleteSettings');
