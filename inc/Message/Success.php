<?php
namespace Message;

class Success{

    public static function text($slug){
        switch($slug){
            case 'RSS_LIST_PARSED':
                return  __('XML File successfully parsed.','news-parser');
            case 'POST_SAVED_AS_DRAFT':
                return __('Post was successful saved as \"draft\"','news-parser');
            case 'SETTINGS_SAVED':
                return __('Settings was saved successful.','news-parser');    
        }
    }

   
}