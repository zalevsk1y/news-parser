<?php
/*
Plugin Name: News-Parser
Plugin URI: https://github.com/zalevsk1y/news-parser
Description: Parse full text news from RSS Feed
Version: 2.0.0
Author: Evgeny S.Zalevskiy <2600@ukr.net>
Author URI: https://github.com/zalevsk1y/
License: MIT
Text Domain: news-parser
 */
?>
<?php



define('NEWS_PARSER_PLUGIN_VERSION', '2.0.1');
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
define ("NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME","news_parser_plugin_template_options");
define ("NEWS_PURSER_PLUGIN_CRON_OPTIONS_NAME","news_parser_plugin_cron_options");
define ("NEWS_PARSER_CRON_ACTION_PREFIX","news_parser_cron_");


require 'autoload.php';
if(\file_exists(NEWS_PARSER_PLUGIN_DIR.'vendor/autoload.php')) require NEWS_PARSER_PLUGIN_DIR.'vendor/autoload.php';
require 'bootstrap.php';

add_action('init','NewsParserPlugin\news_parser_init');

 
require 'tear-down.php';
