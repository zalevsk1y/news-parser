<?php
/**
 *
 * @package  Menu
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
$menu_config=json_decode(json_encode(include 'menu-config.php'), false);
return  array(
    'global'=>array(
        NEWS_PARSER_PLUGIN_SLUG . '-admin-menu-icon'=>NEWS_PARSER_PLUGIN_URL . '/public/css/admin-menu-icon.css',
        NEWS_PARSER_PLUGIN_SLUG . '-fonts'=>NEWS_PARSER_PLUGIN_URL . '/public/css/font.css',
    ),
    'shared'=> array(
        NEWS_PARSER_PLUGIN_SLUG . '-bootstrap'=>'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
        NEWS_PARSER_PLUGIN_SLUG . '-bootstrap-icons'=> 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css',
        NEWS_PARSER_PLUGIN_SLUG . '-media_views'=>NEWS_PARSER_PLUGIN_URL . '/public/css/media-views.css'
    ),
    $menu_config->menu->subs[0]->menu_slug=>array(
        NEWS_PARSER_PLUGIN_SLUG . '-parser-rss'=> NEWS_PARSER_PLUGIN_URL.'/public/css/parser_rss-'.NEWS_PARSER_PLUGIN_VERSION.'.css'
    ),
    $menu_config->menu->subs[1]->menu_slug=>array(
        NEWS_PARSER_PLUGIN_SLUG . '-parser-page'=>NEWS_PARSER_PLUGIN_URL.'/public/css/parser_rss-'.NEWS_PARSER_PLUGIN_VERSION.'.css'
    ),
    $menu_config->menu->subs[2]->menu_slug=>array(
        NEWS_PARSER_PLUGIN_SLUG . '-autopilot'=>NEWS_PARSER_PLUGIN_URL.'/public/css/parser_rss-'.NEWS_PARSER_PLUGIN_VERSION.'.css'
    ),
    $menu_config->menu->subs[3]->menu_slug=>array(
        NEWS_PARSER_PLUGIN_SLUG . '-style-about'=>NEWS_PARSER_PLUGIN_URL . '/public/css/about-news-parser.css'
    )
);
