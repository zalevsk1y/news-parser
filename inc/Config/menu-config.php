<?php
/**
 *
 * @package  Menu
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */

return  array(
    'menu' =>  array(
        'page_title' => 'News Parser Menu',
        'menu_title' => __('News Parser', 'news-parser'),
        'capability' => 'manage_options',
        'menu_slug' => NEWS_PARSER_PLUGIN_SLUG . '-main-menu',
        'template' => NEWS_PARSER_PLUGIN_DIR . '/template/menu/main-menu.php',
        'icon'=> 'dashicons-'.NEWS_PARSER_PLUGIN_SLUG,
        'subs' => array(
             array(
                'page_title' => 'Parsing RSS',
                'parent_slug' => NEWS_PARSER_PLUGIN_SLUG . '-main-menu',
                'menu_title' => __('Parsing RSS', 'news-parser'),
                'capability' => 'manage_options',
                'menu_slug' => NEWS_PARSER_PLUGIN_SLUG . '-main-menu',
                'template' => NEWS_PARSER_PLUGIN_DIR . '/template/menu/parsing-rss-menu.php',
            ),
            array(
                'page_title' => 'Parsing page',
                'parent_slug' => NEWS_PARSER_PLUGIN_SLUG . '-main-menu',
                'menu_title' => __('Parsing page', 'news-parser'),
                'capability' => 'manage_options',
                'menu_slug' => NEWS_PARSER_PLUGIN_SLUG . '-menu-parse-page',
                'template' => NEWS_PARSER_PLUGIN_DIR . '/template/menu/parsing-page-menu.php',
            ),
            array(
                'page_title' => 'Autopilot',
                'parent_slug' => NEWS_PARSER_PLUGIN_SLUG . '-main-menu',
                'menu_title' => __('Autopilot', 'news-parser'),
                'capability' => 'manage_options',
                'menu_slug' => NEWS_PARSER_PLUGIN_SLUG . '-menu-autopilot',
                'template' => NEWS_PARSER_PLUGIN_DIR . '/template/menu/autopilot-page-menu.php',
            ),
             array(
                'page_title' => 'About News Parser',
                'parent_slug' => NEWS_PARSER_PLUGIN_SLUG . '-main-menu',
                'menu_title' => __('About', 'news-parser'),
                'capability' => 'manage_options',
                'menu_slug' => NEWS_PARSER_PLUGIN_SLUG . '-menu-about',
                'template' => NEWS_PARSER_PLUGIN_DIR . '/template/menu/about-menu.php',
            ),
        ),
    ),
);
