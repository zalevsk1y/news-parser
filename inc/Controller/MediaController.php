<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Utils\ResponseFormatter;


/**
 * Class save media as post attachment
 *
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class MediaController 
{
    
    /**
     * Saves attached media.
     *
     * @throws MyException
     * @param string $url Url of image that should be download.
     * @param string $post_id Post id.
     * @param string $alt Description of image.
     * @return int id of media
     */
    public function create($url, $post_id, $alt = '')
    {
        $post=$this->postModelsFactory($post_id);
        if (!$post) {
            throw new MyException(Errors::text('WRONG_POST_ID'), Errors::code('BAD_REQUEST'));
        }
        $media_id=$post->addPostThumbnail($url, $alt);    
        return $media_id;
    }
    /**
    * Get instance of PostModel class.
    *
    * @param string $post_id
    * @return false|PostModel
    */
    protected function postModelsFactory($post_id)
    {
        return PostModel::getPostById($post_id);
    }
    /**
     * Magic method to save media file when called as function.
     *
     * @param string $url Url of image that should be download.
     * @param string $post_id Post id.
     * @param string $alt Description of image.
     * @return string
     */
    public function __invoke($url, $post_id, $alt = '')
    {
        return $this->create($url, $post_id, $alt);
    }
}
