<?php

namespace NewsParserPlugin\Core;

use NewsParserPlugin\Interfaces\MenuPageInterface;
use NewsParserPlugin\Utils\MenuConfig;

/**
 * Main class.Initialize the plugin. Load settings.
 *
 * @package Core
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

class Main
{
    protected $menuPage;
    protected $config;
    protected static $instance;
    /**
     * Initialize the plugin
     */

    protected function __construct(MenuPageInterface $menu_page,MenuConfig $config)
    {
        $this->config = $config->get();
        $this->init();
        $menu_page->init($config);
    }
    public static function start(MenuPageInterface $menu_page,MenuConfig $config)
    {
        if(!isset(self::$instance)){
            self::$instance=new self($menu_page,$config);
        }
    }
    /**
     * Initialize plugin when it was activated.
     *
     * @return void
     */
    public function init()
    {
      
        \add_action('admin_enqueue_scripts', array($this, 'setStyles'));
        \add_action('init', array($this, 'loadTextDomain'));

    }

    public function setStyles($hook)
    {
        \wp_enqueue_style(NEWS_PARSER_PLUGIN_SLUG . '-fonts', NEWS_PARSER_PLUGIN_URL . '/public/css/font.css');
        \wp_enqueue_style(NEWS_PARSER_PLUGIN_SLUG . '-admin-menu-icon', NEWS_PARSER_PLUGIN_URL . '/public/css/admin-menu-icon.css');
        if (strrpos($hook, $this->config->menu->subs[0]->menu_slug) !== false||strrpos($hook, $this->config->menu->subs[1]->menu_slug) !== false) {

            \wp_enqueue_style(NEWS_PARSER_PLUGIN_SLUG . '-media_views', NEWS_PARSER_PLUGIN_URL . '/public/css/media-views.css');
            \wp_enqueue_script('main-parser-bundle-main', NEWS_PARSER_PLUGIN_URL . '/public/js/parser_rss.bundle.js');
            wp_enqueue_script(array(NEWS_PARSER_PLUGIN_SLUG.'-rest-nonce',NEWS_PARSER_PLUGIN_SLUG.'-rest-api') );
            $nonce=array(
                'root'=>esc_url_raw(rest_url()),
                'pluginUrl'=>esc_url_raw(NEWS_PARSER_PLUGIN_URL),
                'restApiNonce'=>wp_create_nonce('wp_rest'),
                'ajaxApiNonce'=>wp_create_nonce('parsing_news_api'),
                'editPostLink'=>esc_url_raw(admin_url('post.php?post=${postId}&action=edit' ))
            );
            wp_localize_script('main-parser-bundle-main','newsParserSettings',$nonce);
            $rest_api_endpoints=array(
                'root'=>esc_url_raw(rest_url()),
                'rssPageName'=>$this->config->menu->subs[0]->menu_slug,
                'singlePageName'=>$this->config->menu->subs[1]->menu_slug,
                'media'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_MEDIA_API)),
                'list'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_list')),
                'html'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_html')),
                'page'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API.'_page')),
                'options'=>esc_url_raw(admin_url('admin-ajax.php?action=' . NEWS_PARSER_PLUGIN_AJAX_OPTIONS_API)),
                'rootRestApi'=>esc_url_raw(rest_url()),
                'rootAjaxApi'=>esc_url_raw(admin_url('admin-ajax.php'))
            );
            wp_localize_script('main-parser-bundle-main','newsParserApiEndpoints',$rest_api_endpoints);
           
        }
        if (strrpos($hook, $this->config->menu->subs[2]->menu_slug) !=+ false) {

            \wp_enqueue_script('settings-parser-bundle-deps', NEWS_PARSER_PLUGIN_URL . '/public/js/settings.bundle.js');
            \wp_enqueue_style(NEWS_PARSER_PLUGIN_SLUG . '-style', NEWS_PARSER_PLUGIN_URL . '/public/css/my-style.css');
        }
        if (strrpos($hook, $this->config->menu->subs[2]->menu_slug) !== false) {
            \wp_enqueue_style(NEWS_PARSER_PLUGIN_SLUG . '-style-about', NEWS_PARSER_PLUGIN_URL . '/public/css/about-news-parser.css');
        }

    }
    public function loadTextDomain()
    {
        \load_plugin_textdomain(NEWS_PARSER_PLUGIN_SLUG, false, NEWS_PARSER_PLUGIN_DIR_NAME . '/lang');
    }

    
}
