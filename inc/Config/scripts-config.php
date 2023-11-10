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
        NEWS_PARSER_PLUGIN_SLUG . '-388-chunk'=>array(
            'path'=>NEWS_PARSER_PLUGIN_URL . '/public/js/388-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
            'depends_on'=>array()
        ),
        NEWS_PARSER_PLUGIN_SLUG . '-589-chunk'=>array(
            'path'=>NEWS_PARSER_PLUGIN_URL . '/public/js/589-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
            'depends_on'=>array()
        ),
        NEWS_PARSER_PLUGIN_SLUG . '-748-chunk'=>array(
            'path'=>NEWS_PARSER_PLUGIN_URL . '/public/js/748-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
            'depends_on'=>array()
        ),
        NEWS_PARSER_PLUGIN_SLUG . '-771-chunk'=>array(
            'path'=>NEWS_PARSER_PLUGIN_URL . '/public/js/771-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
            'depends_on'=>array()
        ),
        NEWS_PARSER_PLUGIN_SLUG.'-google-analitics'=>array(
            'path'=>'https://www.googletagmanager.com/gtag/js?id=G-ZPX4NQDFKG',
            'depends_on'=>array()
        )
    ),
    $menu_config->menu->subs[0]->menu_slug=>array(
        'main-parser-rss-bundle'=> array(
            'path'=>NEWS_PARSER_PLUGIN_URL . '/public/js/parser_rss-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
            'depends_on'=>array('wp-i18n')
        )
    ),
    $menu_config->menu->subs[1]->menu_slug=>array(
        'main-parser-page-bundle'=>array(
            'path'=>NEWS_PARSER_PLUGIN_URL . '/public/js/parser_page-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
            'depends_on'=>array('wp-i18n')
        )
    ),
    $menu_config->menu->subs[2]->menu_slug=>array(
        'main-parser-autopilot-bundle'=>array(
            'path'=>NEWS_PARSER_PLUGIN_URL . '/public/js/autopilot-'.NEWS_PARSER_PLUGIN_VERSION.'.bundle.js',
            'depends_on'=>array('wp-i18n')
        )
    ),
    $menu_config->menu->subs[3]->menu_slug=>array(
    
    )
);
