<?php

define('NEWS_PARSER_PLUGIN_VERSION', '0.8.0');
define("NEWS_PARSER_PLUGIN_SLUG", 'news-parser');
define("NEWS_PARSER_PLUGIN_ROOT_NAMESPACE", 'NewsParserPlugin');
define("NEWS_PARSER_PLUGIN_SETTINGS_SLUG", 'news_parser_settings');
define('NEWS_PARSER_PLUGIN_URL', plugins_url('', __FILE__));
define("NEWS_PARSER_PLUGIN_DIR", plugin_dir_path(__FILE__).'/..');
define("NEWS_PARSER_PLUGIN_DIR_NAME", basename(dirname(__FILE__)));
define("NEWS_PARSER_PLUGIN_NO_IMAGE_PATH", plugins_url('', __FILE__) . '/images/no-image.svg');
define("NEWS_PARSER_PLUGIN_AJAX_PARSING_API", 'news_parser_parsing_api');
define("NEWS_PARSER_PLUGIN_AJAX_MEDIA_API", 'news_parser_media_api');
define("NEWS_PARSER_PLUGIN_AJAX_OPTIONS_API", 'news_parser_options_api');
