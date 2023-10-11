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
        $this->addFilters();
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
    /**
     * Modifies the image_sideload_extensions filter.
     *
     * @param array $allowed_extensions The current allowed extensions array.
     * @param string $file The file being processed.
     * @return array The modified allowed extensions array.
     */
    public function modifyImageSideloadExtension($allowed_extensions, $file)
    {
        if (is_array($allowed_extensions)) {
            array_push($allowed_extensions, 'webp');
        }
        return $allowed_extensions;
    }

    /**
     * Modifies the upload_mimes filter.
     *
     * @param array $mimes The current MIME types array.
     * @return array The modified MIME types array.
     */
    public function modifyUploadMimes($mimes)
    {
        if (is_array($mimes)) {
            $mimes['webp'] = 'image/webp';
        }
        return $mimes;
    }

    /**
     * Adds the necessary filters.
     *
     * Adds the image_sideload_extensions and upload_mimes filters.
     *
     * @return void
     */
    protected function addFilters()
    {
        add_filter('image_sideload_extensions', array($this, 'modifyImageSideloadExtension'), 10, 2);
        add_filter('upload_mimes', array($this, 'modifyUploadMimes'));
    }
}


