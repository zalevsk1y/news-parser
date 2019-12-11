<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;

/**
 * Class creates post model as facade to wordpress function
 *
 * PHP version 5.6
 *
 * @package  Models
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */

class PostModel implements ModelInterface
{
    /**
     * Title of the post.
     *
     * @var string
     */
    public $title;
    /**
     * Post content.
     * 
     * @var string
     */
    public $body;
    /**
     * Featured image url.
     *
     * @var string
     */
    public $image;
    /**
     * Status of the post could be parsed|draft
     *
     * @var string
     */
    public $status;
    /**
     * Url of source post.
     *
     * @var string
     */
    public $sourceUrl;
    /**
     * Id of wordpress post.
     *
     * @var int
     */
    public $postId;
    /**
     * Array of links.
     * Structure: [previewLink,editLink,deleteLink]
     * 
     * @var array
     */
    public $links = array();
    /**
     * Wordpress authoe id.
     *
     * @var string
     */
    public $authorId;
    /**
     * Init function 
     * 
     * @throws MyException if post have no title
     *
     * @param array $data structure['title','body','image','sourceUrl','authorId']
     */
    public function __construct($data)
    {
        if (!isset($data['title'])||empty($data['title'])) {
            throw new MyException(Errors::text('NO_TITLE'));
        }
        $this->title = $data['title'];
        if (!isset($data['body'])||empty($data['body'])) {
            throw new MyException(Errors::text('NO_BODY'));
        }
        $this->body = $data['body'];
        $this->image = $data['image'];
        $this->sourceUrl = $data['sourceUrl'];
        $this->authorId = $data['authorId'];
        $this->status = 'parsed';
    }
    /**
     * Create wordpress draft gets WP post ID and change postModel status to draft
     *
     * @return void
     */
    public function createDraft()
    {
        $this->postId = $this->createPostWordPress();
        if ($this->postId === 0) {
            throw new MyException(Errors::text('POST_WAS_NOT_CREATED'));
        }
        $this->getPostLinksWordpress();
        $this->status = 'draft';
    }
    /**
     * Attach main image to wordpres post
     *
     * @return void
     */
    public function addPostThumbnail()
    {
        $this->attachImageToPostWordpress($this->image, $this->postId, true);
    }

    /**
     * Add link to the source  of the page
     *
     * @return void
     */
    public function addSource()
    {
        $this->body .= sprintf('<br> <a href="%s">%s</a>',
            \esc_url_raw($this->sourceUrl),
            \__('Source ', NEWS_PARSER_PLUGIN_SLUG)
        );
        $this->updatePostWordPress('post_content', $this->body);
    }
    /**
     * Return Post data in array|json|object format
     *
     * @param string $format
     * @return array|string|object
     */
    public function getAttributes($format = 'array')
    {
        $data_array = array(
            'title' => $this->title,
            'links' => $this->links,
            'status' => $this->status,
            'post_id' => $this->postId,
        );
        $data_json = json_encode($data_array);
        switch ($format) {
            case 'json':
                return $data_json;
            case 'object':
                return json_decode($data_json);
            default:
                return $data_array;
        }
    }
    /**
     * Create wordpress post
     *
     * @return int Post iD
     */
    protected function createPostWordPress()
    {
        $date = new \DateTime();
        $post_date = $date->format('Y-m-d H:i:s');
        $post_data = array(
            'post_title' => \wp_strip_all_tags($this->title),
            'post_content' => $this->body,
            'post_date' => $post_date,
            'post_author' => $this->authorId,

        );
        $postId = \wp_insert_post($post_data);
        if (\is_wp_error($postId)) {
            throw new MyException($postId->get_error_message());
        } else {
            return $postId;
        }
    }
    /**
     * Download and attach image to WP post
     *
     * @param string $image url of image
     * @param int $id post ID in WP
     * @param boolean $post_thumb if image will use NewsParserPlugin\as main image of the post
     * @return int image ID
     */
    protected function attachImageToPostWordpress($image, $id, $post_thumb = false)
    {
        $url = $image;
        $post_id = $id;
        $desc = "image";
        $img_id = \media_sideload_image($url, $post_id, $desc, 'id');
        if (\is_wp_error($img_id)) {
            throw new MyException($img_id->get_error_message());
        } else {
            if ($post_thumb) {
                \set_post_thumbnail($post_id, $img_id);
            }

            return $img_id;
        }
    }
    /**
     * Update wordpress post
     *
     * @param string $update_item name of updated field
     * @param $data new data that will be add to the field
     * @return void
     */
    protected function updatePostWordPress($update_item, $data)
    {
        $post_array = [
            'ID' => $this->postId,
            $update_item => $data,
        ];
        \wp_update_post($post_array);
    }
    /**
     * Get links to the saved WP post
     *
     * @return void
     */
    protected function getPostLinksWordpress()
    {
        $post_id = $this->postId;
        $this->links['previewLink'] = \get_post_permalink($post_id);
        $this->links['editLink'] = \get_edit_post_link($post_id, '');
        $this->links['deleteLink'] = \get_delete_post_link($post_id);

    }
}
