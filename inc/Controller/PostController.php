<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ControllerInterface;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Message\Error;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Parser\ParseContent;
use NewsParserPlugin\Utils\PipeController;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Utils\Settings;

/**
 * Class controller for post
 *
 * PHP version 7.2.1
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class PostController implements ControllerInterface
{
    protected $postFactory;
    protected $postData;
    protected $settings;
    protected $formatResponse;

    public function __construct(ParseContent $postParser, Settings $settings, ResponseFormatter $formatter, FactoryInterface $postFactory)
    {
        $this->postParser = $postParser;
        $this->settings = $settings->get();
        $this->formatResponse = $formatter;
        $this->postFactory = $postFactory;
    }
    /**
     * Get create post draft and return response in proper format
     * All facade of PostModel class methods created for convenience of using in pipe
     *
     * @param string $url of post that should be parsed and saved as draft
     * @param string $options [gallery images that was selected]
     * @return void
     */
    public function get(string $url, string $options = null)
    {
        try {
            $parsed_data = $result = $this->postParser->get($url, $this->settings->post);
            $parsed_data['authorId'] = get_current_user_id();

            //unescaped url

            $parsed_data['sourceUrl'] = $url;
            if (!is_null($options)) {
                $options = $this->pipe($options)
                    ->func('stripslashes', array("data"))
                    ->func('json_decode', array("data", true))
                    ->get();
            }
            $post = $this->postFactory->get($parsed_data);
            //if option "show image selection dialog window" gallery data will send as response
            if (!$this->imagesWasSelected($options) && !empty($post->gallery)) {
                return $this->formatResponse->dialog('gallery', $post->gallery)->message('none')->get('json');
            }
            //Stages of post draw creating
            $this->pipe($post)
                ->createDraft()
                ->addSource()
                ->addPostThumbnail()
                ->updateImageGallery($options)
                ->downloadGalleryPictures()
                ->createGalleryShortcode();

            $response = $this->formatResponse->post($post->getAttributes())->message('success', Success::text('POST_SAVED_AS_DRAFT'))->get('json');

        } catch (MyException $e) {
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }
        return $response;
    }
    /**
     * Check if parseOtherPictures and showPicturesDialog options was selected than should return gallery images for modal gallery window.
     *
     * @param $options
     * @return boolean
     */
    public function imagesWasSelected($options)
    {
        if ($this->settings->post->parseOtherPictures && $this->settings->post->showPicturesDialog && !$options) {
            return false;
        }
        return true;
    }
    /**
     * Create WP post draft
     *
     * @param PostModel $post
     * @return PostModel
     */
    public function createDraft(PostModel $post)
    {
        $post->createDraft();
        return $post;
    }
    /**
     * Add main image to the post
     *
     * @param PostModel $post
     * @return PostModel
     */
    public function addPostThumbnail(PostModel $post)
    {
        if ($this->settings->post->addThumbnail) {
            $post->addPostThumbnail();
        }
        return $post;
    }
    /**
     * Add link to the source
     *
     * @param PostModel $post
     * @return PostModel
     */
    public function addSource(PostModel $post)
    {
        if ($this->settings->general->addSource) {
            $post->addSource();
        }
        return $post;
    }
    /**
     * Update images in the post gallery
     *
     * @param array $new_gallery
     * @param PostModel $post
     * @return PostModel
     */
    public function updateImageGallery($new_gallery, PostModel $post)
    {
        if (!empty($new_gallery) && is_array($new_gallery) && isset($new_gallery)) {
            $post->gallery = $new_gallery;
        }
        return $post;
    }
    /**
     * Download pictures and attach then to the post
     *
     * @param PostModel $post
     * @return PostModel
     */
    public function downloadGalleryPictures(PostModel $post)
    {
        if ($this->settings->post->parseOtherPictures) {
            $post->downloadGalleryPictures($this->settings->post->maxPictures);
        }
        return $post;
    }
    /**
     * Create gallery shortcode and add it to post body
     *
     * @param PostModel $post
     * @return void
     */
    public function createGalleryShortcode(PostModel $post)
    {
        if ($this->settings->gallery->addGallery && !empty($post->gallery)) {
            $post->createGalleryShortcode($this->settings->gallery->shortCode, $this->settings->gallery->parameterName);
        }
        return $post;
    }
    /**
     * Facade for pipe Utils\PipeController
     *
     * @param $input_data data that would be transferred thru the pipe
     * @return void
     */
    protected function pipe($input_data)
    {
        return new PipeController($this, $input_data);
    }

}
