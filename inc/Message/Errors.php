<?php
namespace NewsParserPlugin\Message;

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
            case 'WRONG_OPTIONS_URL':
                return \__('Wrong url data was send with options template parameters', NEWS_PARSER_PLUGIN_SLUG);
            case 'TEMPLATE_NOT_SAVED':
                return \__('Template could not be saved right now.', NEWS_PARSER_PLUGIN_SLUG);
            case 'NO_TEMPLATE':
                return \__('Post could not be parsed, because there is no template for that kind of posts.', NEWS_PARSER_PLUGIN_SLUG);
            case 'NO_EXTRA_OPTIONS':
                return \__('Post could not be parsed, because there is no parsing options for that kind of posts.', NEWS_PARSER_PLUGIN_SLUG);
            case 'FILE_DOWNLOAD':
                return \__('Sorry file cannot be downloaded', NEWS_PARSER_PLUGIN_SLUG);
            case 'WRONG_LIST_FORMAT':
                return \__('Sorry list of parsed post could not be created.', NEWS_PARSER_PLUGIN_SLUG);
            case 'XML_PARSING':
                return \__('Sorry XML file has wrong format', NEWS_PARSER_PLUGIN_SLUG);
            case 'TRY_AGAIN':
                return \__('Sorry some internal error.Try again later', NEWS_PARSER_PLUGIN_SLUG);
            case 'POST_WAS_NOT_CREATED':
                return \__('Sorry, post was not created for some reasons.', NEWS_PARSER_PLUGIN_SLUG);
            case 'WRONG_POST_ID':
                return \__('Wrong post ID.', NEWS_PARSER_PLUGIN_SLUG);
            case 'PROGRAM_ERROR':
                return \__('Some program error has occurred', NEWS_PARSER_PLUGIN_SLUG);
            case 'NO_TITLE':
                return \__('No Title', NEWS_PARSER_PLUGIN_SLUG);
            case 'NO_BODY':
                return \__('No Body', NEWS_PARSER_PLUGIN_SLUG);
            case 'SETTINGS_CANNOT_BE_SAVED':
                return \__('Sorry temporary settings cannot be saved', NEWS_PARSER_PLUGIN_SLUG);
            case 'OPTIONS_WRONG_FORMAT':
                return \__('Options could not be saved.Wrong options format.', NEWS_PARSER_PLUGIN_SLUG);
            case 'NO_DI_DEFENITION_FILE':
                    return \__('File with class defenitions for DI container could not be found. Check file path.', NEWS_PARSER_PLUGIN_SLUG);
            case 'DI_DEFENITION_FILE_WRONG_ORDER':
                    return \__('In dependency defenition file wrong depandency oreder.Dependencies should be placed earlier in array', NEWS_PARSER_PLUGIN_SLUG);   
            case 'NO_NEEDED_DEPENDENCY_IN_DEFENITION':
                    return \__('No needed dependency in defenition file.', NEWS_PARSER_PLUGIN_SLUG);        
        }
    }
    public static function code($slug)
    {
        switch ($slug) {
            case 'BAD_REQUEST':
                return '400 Bad Request';
            case 'INNER_ERROR':
                return '500 Inner Error';
        }
    }
}
