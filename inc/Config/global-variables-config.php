<?php
/**
 *
 * @package  Menu
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
$menu_config=json_decode(json_encode(include 'menu-config.php'), false);
$nonce=array(
    'restRoot'=>esc_url_raw(rest_url()),
    'pluginUrl'=>esc_url_raw(NEWS_PARSER_PLUGIN_URL),
    'restApiNonce'=>wp_create_nonce('news_parser_wp_rest'),
    'ajaxApiNonce'=>wp_create_nonce('parsing_news_api'),
    'wpRestApiNonce'=>wp_create_nonce('wp_rest'),
    'editPostLink'=>esc_url_raw(admin_url('post.php?post=${postId}&action=edit'))
);
$rest_api_endpoints=array(
    'root'=>esc_url_raw(rest_url()),
    'rssPageName'=>$menu_config->menu->subs[0]->menu_slug,
    'singlePageName'=>$menu_config->menu->subs[1]->menu_slug,
    NEWS_PARSER_PLUGIN_VISUAL_CONSTRUCTOR.'.media'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_MEDIA_API)),
    'list'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_list')),
    'rawHTML'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_html')),
    NEWS_PARSER_PLUGIN_PARSER_RSS.'.page'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_page')),
    NEWS_PARSER_PLUGIN_VISUAL_CONSTRUCTOR.'.template'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_TEMPLATE_API)),
    'rootRestApi'=>esc_url_raw(rest_url()),
    'templateGetRestApi'=>esc_url_raw(rest_url()),
    'rootAjaxApi'=>esc_url_raw(admin_url('admin-ajax.php'))
);
return  array(
    'global'=>array(),
    'shared'=> array(
    ),
    $menu_config->menu->subs[0]->menu_slug=>array(
        array(
            'script_name'=>'main-parser-rss-bundle',
            'name'=>'newsParserSettings',
            'value'=>$nonce
        ),
        array(
            'script_name'=>'main-parser-rss-bundle',
            'name'=>'newsParserApiEndpoints',
            'value'=>$rest_api_endpoints
        )
    ),
    $menu_config->menu->subs[1]->menu_slug=>array(
        array(
            'script_name'=>'main-parser-page-bundle',
            'name'=>'newsParserSettings',
            'value'=>$nonce
        ),
        array(
            'script_name'=>'main-parser-page-bundle',
            'name'=>'newsParserApiEndpoints',
            'value'=>$rest_api_endpoints
        )
    ),
    $menu_config->menu->subs[2]->menu_slug=>array(
        array(
            'script_name'=>'main-parser-autopilot-bundle',
            'name'=>'newsParserSettings',
            'value'=>$nonce
        ),
        array(
            'script_name'=>'main-parser-autopilot-bundle',
            'name'=>'newsParserApiEndpoints',
            'value'=>$rest_api_endpoints
        )
    ),
    $menu_config->menu->subs[3]->menu_slug=>array(
    
    )
);
