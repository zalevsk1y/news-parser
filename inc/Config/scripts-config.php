<?php
/**
 *
 * @package  Menu
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
$menu_config= json_decode(json_encode(include 'menu-config.php'), false);
return  array(
    'global'=>array(),
    'shared'=> array(
        NEWS_PARSER_PLUGIN_SLUG . '-748-chunk'=>NEWS_PARSER_PLUGIN_URL . '/public/js/748-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
        NEWS_PARSER_PLUGIN_SLUG . '-127-chunk'=>NEWS_PARSER_PLUGIN_URL . '/public/js/127-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
        NEWS_PARSER_PLUGIN_SLUG . '-340-chunk'=>NEWS_PARSER_PLUGIN_URL . '/public/js/340-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
        NEWS_PARSER_PLUGIN_SLUG . '-951-chunk'=>NEWS_PARSER_PLUGIN_URL . '/public/js/951-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
    ),
    $menu_config->menu->subs[0]->menu_slug=>array(
        'main-parser-rss-bundle'=> NEWS_PARSER_PLUGIN_URL . '/public/js/parser_rss-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js'
    ),
    $menu_config->menu->subs[1]->menu_slug=>array(
        'main-parser-page-bundle'=>NEWS_PARSER_PLUGIN_URL . '/public/js/parser_page-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js'
    ),
    $menu_config->menu->subs[2]->menu_slug=>array(
        'main-parser-autopilot-bundle'=>NEWS_PARSER_PLUGIN_URL . '/public/js/autopilot-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js'
    ),
    $menu_config->menu->subs[3]->menu_slug=>array(
    
    )
);
