<?php

namespace NewsParserPlugin\Core;

use NewsParserPlugin\Interfaces\MenuPageInterface;
use NewsParserPlugin\Utils\MenuConfig;

/**
 * Main class.Initialize the plugin. Load settings.
 *
 * @package NewsParser
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

class Main
{
    /**
     * Initialize the plugin
     */

    public function __construct(MenuPageInterface $menu_page)
    {
        $this->init();

        $this->menuPage = $menu_page;

    }

    /**
     * Initialize plugin when it was activated.
     *
     * @return void
     */
    public function init()
    {
        add_action('admin_menu', array($this, 'addMainMenu'));
        add_action('admin_enqueue_scripts', array($this, 'setStyles'));
        add_action('init', array($this, 'loadTextDomain'));

    }

    /**
     * Autoload for classes based on PSR
     *
     * @return void
     */
    public function autoload()
    {

    }

    public function setStyles($hook)
    {
        wp_enqueue_style(NEWS_PARSER_PLUGIN_SLUG . '-fonts', NEWS_PARSER_PLUGIN_URL . '/public/css/font.css');
        wp_enqueue_style(NEWS_PARSER_PLUGIN_SLUG . '-style', NEWS_PARSER_PLUGIN_URL . '/public/css/my-style.css');
        if (strrpos($hook, $this->config->menu->subs[0]->menu_slug) != false) {

            wp_enqueue_style(NEWS_PARSER_PLUGIN_SLUG . '-media_views', NEWS_PARSER_PLUGIN_URL . '/public/css/media-views.css');
            wp_enqueue_script('main-parser--bundle-main', NEWS_PARSER_PLUGIN_URL . '/public/js/parser.bundle.js');
        }
        if (strrpos($hook, $this->config->menu->subs[1]->menu_slug) != false) {

            wp_enqueue_script('settings-parser-bundle-deps', NEWS_PARSER_PLUGIN_URL . '/public/js/settings.bundle.js');

        }

    }
    public function loadTextDomain()
    {
        load_plugin_textdomain(NEWS_PARSER_PLUGIN_SLUG, false, NEWS_PARSER_PLUGIN_DIR_NAME . '/lang');
    }

    /**
     * Initiate menu controller.Submenu classes in $this->settings->menu->dependencies
     *  should implies SubmenuInterface.
     *
     * @return void
     */
    public function addMainMenu()
    {
        $this->config = MenuConfig::get();
        $menu = $this->config->menu;
        add_menu_page($menu->page_title, $menu->menu_title, $menu->capability, $menu->menu_slug, '', $menu->icon);
        $this->addSubMenus();
    }
    protected function addSubMenus()
    {
        $subMenu = $this->config->menu->subs;
        foreach ($subMenu as $sub) {
            $menu_page = clone $this->menuPage;
            $menu_page->setTemplate($sub->template);
            add_submenu_page($sub->parent_slug, $sub->page_title, $sub->menu_title, $sub->capability, $sub->menu_slug, array($menu_page, 'render'));
        }
    }

}
