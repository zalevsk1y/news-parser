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
class Success
{

    public static function text($slug)
    {
        switch ($slug) {
            case 'RSS_LIST_PARSED':
                return  \__('XML File successfully parsed.', 'news-parser');
            case 'POST_SAVED':
                return \__('Post "%s" was successfully parsed and saved.', 'news-parser');
            case 'TEMPLATE_SAVED':
                return \__('Options was saved successful.', 'news-parser');
            case 'TEMPLATE_EXIST':
                return \__('You have saved parsing template for this RSS thread.', 'news-parser');
            case 'FEATURED_IMAGE_SAVED':
                return \__('Featured image was saved and attach to the post.', 'news-parser');
            case 'CRON_EXIST':
                return \__('Cron job options already exist.', 'news-parser');
                case 'CRON_CREATED':
                    return \__('Cron job options successfully created.', 'news-parser');
                case 'CRON_DELETED':
                    return \__('Cron job options successfully deleted.', 'news-parser');
            
        }
    }
}
