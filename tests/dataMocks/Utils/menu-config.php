<?php
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
            )
        ),
    ),
);
