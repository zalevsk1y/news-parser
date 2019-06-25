<?php
namespace Ajax;

use Controller\ListController;
use Controller\PostController;
use Controller\SettingsController;
use Message\Errors;
use Message\Success;
use Exception\MyException;
/**
 * Ajax singleton class provide API to the front end 
 *
 * @package Ajax
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */

 class Ajax{
     protected $search;
     protected $post;
     public function __construct(ListController  $listController,PostController $postController,SettingsController $settingsController){
        $this->list=$listController;
        $this->post=$postController;
        $this->settings=$settingsController;
        $this->init();
    }
    public static function getInstance(){
        if(self::$instance){
            return self::$instance;
        }else{
            self::$instance=new self($configs);
            return self::$instance;
        }
    }
     protected function init(){
        add_action('wp_ajax_'.AJAX_PARSING_API,array($this,'parsingApi'));
        add_action('wp_ajax_'.AJAX_SETTINGS_API,array($this,'settingsApi'));
      
     }
     
     public function settingsApi(){
         if(!is_admin()) wp_die();
         if(isset($_GET['status'])){
            $status=$_GET['status'];
         }else if(!isset($_GET['status'])){
            wp_die();
         }
         switch($status){
             case 'get':
                if(!check_ajax_referer('parsing_settings_api_get')) wp_die();
                $response=$this->settings->get('json');
                echo $response;
                wp_die();
                break;
            case 'default':
                if(!check_ajax_referer('parsing_settings_api_get')) wp_die();
                $response=$this->settings->getDefault();
                echo $response;
                wp_die();
                break;
             case 'save':
                if(!check_ajax_referer('parsing_settings_api_save')) wp_die();
                $new_settings=$_POST['settings'];
                $response=$this->settings->set($new_settings);
                echo $response;
                wp_die();
                break;
         }
         wp_die();
     }
   
     public function parsingApi(){
        if(!is_admin()) wp_die();
        if(isset($_GET['status'])){
           $status=$_GET['status'];
        }else if(!isset($_GET['status'])){
           wp_die();
        }
        if(isset($_GET['url'])){
            $url=$_GET['url'];
        }else{ 
            wp_die();
        };
        switch ($status){
            case 'list':
                if(!check_ajax_referer('parsing_news_api')) wp_die();
                $response=$this->createList($url);
            break;
            case 'single':
                if(!check_ajax_referer('parsing_news_api')) wp_die();
                if(isset($_POST['gallery'])){
                    $options=$_POST['gallery'];
                }else{
                    $options=null;
                }
                
                $response=$this->createPostDraft($url,$options);
            break;
        }
        echo $response;
        wp_die();
     }
     protected function createList($url){
        return $this->list->get($url);
     }
     protected function createPostDraft($url,$options){
        return $this->post->get($url,$options);
     }
 
 }