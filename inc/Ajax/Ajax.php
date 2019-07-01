<?php
namespace NewsParserPlugin\Ajax;

use NewsParserPlugin\Controller\ListController;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Controller\SettingsController;
use NewsParserPlugin\Utils\Sanitize;

/**
 * Ajax singleton class provide API to the front end
 *
 * @package Ajax
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

class Ajax
{
    protected $post;
    protected $list;
    protected $settings;
    protected static $instance;

    protected function __construct(ListController $listController, PostController $postController, SettingsController $settingsController)
    {
        $this->list = $listController;
        $this->post = $postController;
        $this->settings = $settingsController;
        $this->init();
    }
    public static function getInstance(ListController $listController, PostController $postController, SettingsController $settingsController)
    {
        if (self::$instance) {
            return self::$instance;
        } else {
            self::$instance = new self($listController, $postController, $settingsController);
            return self::$instance;
        }
    }
    protected function init()
    {
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_PARSING_API, array($this, 'parsingApi'));
        \add_action('wp_ajax_' . NEWS_PARSER_PLUGIN_AJAX_SETTINGS_API, array($this, 'settingsApi'));

    }

    public function settingsApi()
    {
        if (!\is_admin()) {
            \wp_die();
        }

        if (isset($_GET['status'])) {
            $status = \sanitize_text_field($_GET['status']);
        } else if (!isset($_GET['status'])) {
            \wp_die();
        }
        switch ($status) {
            case 'get':
                if (!\check_ajax_referer('parsing_settings_api_get')) {
                    \wp_die();
                }

                $response = $this->settings->get('json');
                echo $response;
                \wp_die();
                break;
            case 'default':
                if (!\check_ajax_referer('parsing_settings_api_get')) {
                    \wp_die();
                }

                $response = $this->settings->getDefault();
                echo $response;
                \wp_die();
                break;
            case 'save':
                if (!\check_ajax_referer('parsing_settings_api_save')) {
                   \wp_die();
                }

                $new_settings = \sanitize_text_field($_POST['settings']);
                $new_settings = \json_decode(\stripslashes($new_settings), true);
                $response = $this->settings->set($new_settings);
                echo $response;
                \wp_die();
                break;
        }
        \wp_die();
    }

    public function parsingApi()
    {
        if (!\is_admin()) {
           \wp_die();
        }

        if (isset($_GET['status'])) {
            $status = \sanitize_text_field($_GET['status']);
        } else if (!isset($_GET['status'])) {
            \wp_die();
        }
        if (isset($_GET['url'])) {
            $url = Sanitize::sanitizeURL($_GET['url']);
        } else {
            \wp_die();
        };
        switch ($status) {
            case 'list':
                if (!\check_ajax_referer('parsing_news_api')) {
                    \wp_die();
                }

                $response = $this->createList($url);
                break;
            case 'single':
                if (!\check_ajax_referer('parsing_news_api')) {
                    \wp_die();
                }

                if (isset($_POST['gallery'])) {
                    $options = Sanitize::sanitizeUrlArray(json_decode(stripslashes($_POST['gallery'], true)));
                } else {
                    $options = null;
                }

                $response = $this->createPostDraft($url, $options);
                break;
        }
        echo $response;
        \wp_die();
    }

    protected function sanitizeUrlArray(array $urls_array)
    {
        $output = [];
        foreach ($urls_array as $key => $item) {
            $output[$key] = Sanitize::sanitizeImageURL($item);
        }
        return $output;
    }
    protected function createList($url)
    {
        return $this->list->get($url);
    }
    protected function createPostDraft($url, $options)
    {
        return $this->post->get($url, $options);
    }

}
