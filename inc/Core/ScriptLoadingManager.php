<?php

namespace NewsParserPlugin\Core;

use NewsParserPlugin\Interfaces\MenuPageInterface;
use NewsParserPlugin\Utils\MenuConfig;

/**
 * Script and Style Manager class. Initializes the plugin and enqueues scripts and styles to WordPress pages.
 *
 * @package Core
 */
class ScriptLoadingManager
{
    /**
     * @var MenuPageInterface The menu page instance.
     */
    protected $menuPage;

    /**
     * @var MenuConfig The menu configuration instance.
     */
    protected $config;

    /**
     * @var Main The instance of the Main class.
     */
    protected static $instance;

    /**
     * @var array The scripts configuration.
     */
    protected $scriptsConfig;
    /**
     * @var array The scripts translation configuration.
     */
    protected $scriptsTranslationConfig;
    /**
     * @var array The styles configuration.
     */
    protected $stylesConfig;

    /**
     * @var array The global variables configuration.
     */
    protected $globalVariablesConfig;

    /**
     * Initializes the Main class.
     *
     * @param MenuPageInterface $menu_page The menu page instance.
     * @param MenuConfig $config The menu configuration instance.
     */
    protected function __construct(MenuPageInterface $menu_page, MenuConfig $config)
    {
        $this->config = $config->get();
        $menu_page->init($config);
    }

    /**
     * Starts the Main class.
     *
     * @param MenuPageInterface $menu_page The menu page instance.
     * @param MenuConfig $config The menu configuration instance.
     */
    public static function getInstance(MenuPageInterface $menu_page, MenuConfig $config)
    {
        if (!isset(self::$instance)) {
            self::$instance = new self($menu_page, $config);
        }
        return self::$instance;
    }

    /**
     * Initializes the plugin when it was activated.
     *
     * @return void
     */
    public function init()
    {
        \add_action('admin_enqueue_scripts', array($this, 'enqueueDependecies'));
       // \add_action('init', array($this, 'loadTextDomain'));
    }

    /**
     * Sets the scripts configuration.
     *
     * @param array $plugin_scripts_array The scripts configuration array.
     */
    public function setScriptsConfig($plugin_scripts_array)
    {
        $this->scriptsConfig = $plugin_scripts_array;
    }
    /**
     * Sets the scripts translation configuration.
     *
     * @param array $scripts_translation_array The scripts translation configuration array.
     */
    public function setScriptsTranslationConfig($scripts_translation_array)
    {
        $this->scriptsTranslationConfig=$scripts_translation_array;
    }
    /**
     * Sets the styles configuration.
     *
     * @param array $plugin_styles_array The styles configuration array.
     */
    public function setStylesConfig($plugin_styles_array)
    {
        $this->stylesConfig = $plugin_styles_array;
    }

    /**
     * Sets the global variables configuration.
     *
     * @param array $plugin_global_variables_array The global variables configuration array.
     */
    public function setGlobalVariablesConfig($plugin_global_variables_array)
    {
        $this->globalVariablesConfig = $plugin_global_variables_array;
    }

    /**
     * Enqueues dependencies based on the hook.
     *
     * @param string $hook The current hook.
     */
    public function enqueueDependecies($hook)
    {
        $this->enqueueData('global');
        if (strrpos($hook, $this->config->menu->subs[0]->menu_slug) !== false || strrpos($hook, $this->config->menu->subs[1]->menu_slug) !== false || strrpos($hook, $this->config->menu->subs[2]->menu_slug) !== false|| strrpos($hook, $this->config->menu->subs[3]->menu_slug) !== false) {
            // enqueue common script and styles
            $this->enqueueData('shared');

            if (strrpos($hook, $this->config->menu->subs[0]->menu_slug)) {
                $this->enqueueData($this->config->menu->subs[0]->menu_slug);
            } elseif (strrpos($hook, $this->config->menu->subs[1]->menu_slug)) {
                $this->enqueueData($this->config->menu->subs[1]->menu_slug);
            } elseif (strrpos($hook, $this->config->menu->subs[2]->menu_slug)) {
                $this->enqueueData($this->config->menu->subs[2]->menu_slug);
            }
        }

        if (strrpos($hook, $this->config->menu->subs[3]->menu_slug) !== false) {
            $this->enqueueData($this->config->menu->subs[3]->menu_slug);
        }
    }

    /**
     * Enqueues styles, scripts, and global variables for a given menu slug.
     *
     * @param string $menu_slug The menu slug.
     */
    protected function enqueueData($menu_slug)
    {
        $this->enqueueStylesArray($this->stylesConfig[$menu_slug]);
        $this->enqueueScriptsArray($this->scriptsConfig[$menu_slug]);
        $this->enqueueGlobalVarsArray($this->globalVariablesConfig[$menu_slug]);
        $this->setScriptTranslations($this->scriptsTranslationConfig[$menu_slug]);
    }

    /**
     * Enqueues styles from the styles array.
     *
     * @param array $styles_array The styles array.
     */
    protected function enqueueStylesArray($styles_array)
    {
        foreach ($styles_array as $style_name => $style_path) {
            \wp_enqueue_style($style_name, $style_path);
        }
    }

    /**
     * Enqueues scripts from the scripts array.
     *
     * @param array $scripts_array The scripts array.
     */
    protected function enqueueScriptsArray($scripts_array)
    {
        foreach ($scripts_array as $script_name => $script_props) {
            \wp_enqueue_script($script_name, $script_props['path'],$script_props['depends_on']);
        }
    }
    /**
     * Enqueues script translates from the array.
     *
     * @param array $scripts_array The scripts array.
     */
    protected function setScriptTranslations($translations_array){
        foreach ($translations_array as $script_name => $translation_domain) {
            \wp_set_script_translations($script_name, $translation_domain);
        }
    }

    /**
     * Enqueues global variables from the global variables array.
     *
     * @param array $global_vars_array The global variables array.
     */
    protected function enqueueGlobalVarsArray($global_vars_array)
    {
        foreach ($global_vars_array as $global_var) {
            \wp_add_inline_script($global_var['script_name'], $global_var['data'], $global_var['position']);
        }
    }

    /**
     * Loads the plugin's text domain for localization.
     */
    public function loadTextDomain()
    {
        \load_plugin_textdomain(NEWS_PARSER_PLUGIN_SLUG, false, NEWS_PARSER_PLUGIN_DIR_NAME . '/lang');
    }
}
