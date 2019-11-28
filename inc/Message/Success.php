<?php
namespace NewsParserPlugin\Message;

/**
 * Class success message storage
 *
 *
 * @package  Message
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
class Success{

    public static function text($slug){
        switch($slug){
            case 'RSS_LIST_PARSED':
                return  \__('XML File successfully parsed.','news-parser');
            case 'POST_SAVED_AS_DRAFT':
                return \__('Post "%s" was successfully parsed and saved as "draft"','news-parser');
            case 'TEMPLATE_SAVED':
                return \__('Options was saved successful.','news-parser');    
        }
    }

   
}