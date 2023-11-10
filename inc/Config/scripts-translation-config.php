<?php

return  array(
    'global'=>array(),
    'shared'=> array(),
    $menu_config->menu->subs[0]->menu_slug=>array(
        'main-parser-rss-bundle'=> NEWS_PARSER_PLUGIN_SLUG
    ),
    $menu_config->menu->subs[1]->menu_slug=>array(
        'main-parser-page-bundle'=>NEWS_PARSER_PLUGIN_SLUG
    ),
    $menu_config->menu->subs[2]->menu_slug=>array(
        'main-parser-autopilot-bundle'=>NEWS_PARSER_PLUGIN_SLUG
    ),
    $menu_config->menu->subs[3]->menu_slug=>array(
    )
);