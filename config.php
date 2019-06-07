<?php
/**
 *
 * @package  Menu
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 * @link     https://github.com/2600BottlesOnTheWall
 */

return (object) array(
    'menu' => (object) array(
        'page_title' => 'News Parser Menu',
        'menu_title' => __('News Parser','news-parser'),
        'capability' => 'manage_options',
        'menu_slug' => NEWS_PARSER_SLUG . '-main-menu',
        'template' => NEWS_PARSER_DIR . '/template/menu/main-menu.php',
        'icon'=> 'dashicons-'.NEWS_PARSER_SLUG,
        'subs' => array(
            (object) array(
                'page_title' => 'Parsing News',
                'parent_slug' => NEWS_PARSER_SLUG . '-main-menu',
                'menu_title' => __('Parsing','news-parser'),
                'capability' => 'manage_options',
                'menu_slug' => NEWS_PARSER_SLUG . '-main-menu',
                'template' => NEWS_PARSER_DIR . '/template/menu/parsing-menu.php',
            ),
            (object) array(
                'page_title' => 'News Parser Settings',
                'parent_slug' => NEWS_PARSER_SLUG . '-main-menu',
                'menu_title' => __('Settings','news-parser'),
                'capability' => 'manage_options',
                'menu_slug' => NEWS_PARSER_SLUG . '-menu-settings',
                'template' => NEWS_PARSER_DIR . '/template/menu/settings-menu.php',
            ),
            (object) array(
                'page_title' => 'About News Parser',
                'parent_slug' => NEWS_PARSER_SLUG . '-main-menu',
                'menu_title' => __('About','news-parser'),
                'capability' => 'manage_options',
                'menu_slug' => NEWS_PARSER_SLUG . '-menu-about',
                'template' => NEWS_PARSER_DIR . '/template/menu/about-menu.php',
            ),
        ),
    ),
);
