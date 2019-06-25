<?php
namespace Message;

/**
 * Class error message storage
 *
 *
 * @package  Message
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
class Errors
{

    public static function text($slug)
    {
        switch ($slug) {
            case 'FILE_DOWNLOAD':
                return __('Sorry file cannot be downloaded', 'news-parser');
            case 'XML_PARSING':
                return __('Sorry XML file has wrong format', 'news-parser');
            case 'TRY_AGAIN':
                return __('Sorry some internal error.Try again later', 'news-parser');
            case 'POST_WAS_NOT_CREATED':
                return __('Sorry, post was not created for some reasons.', 'news-parser');
            case 'PROGRAM_ERROR':
                return __('Some program error has occurred', 'news-parser');
            case 'NO_TITLE':
                return __('No Title', 'news-parser');
            case 'NO_BODY':
                return __('No Body', 'news-parser');
            case 'SETTINGS_CANNOT_BE_SAVED':
                return __('Sorry temporary settings cannot be saved', 'news-parser');
        }

    }
}
