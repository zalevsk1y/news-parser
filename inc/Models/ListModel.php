<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Interfaces\ModelInterface;

/**
 * Class list of posts parsed from xml RSS feed model.
 *
 * PHP version 5.6
 *
 * @package  Models
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */

class ListModel implements ModelInterface
{   
    /**
     * List data
     * Single list item structure:
     * [title] - title of post
     * [pubDate] -date of post publication
     * [description] -post brief description
     * [link] - link to the original post
     * [image] - main post image url
     * [status] - parsed 
     *  
     * @var array
     */
    protected $data;
    /**
     * Init function.
     *
     * @param array $data
     */
    public function __construct($data)
    {
        $this->data = $data;
    }
    /**
     * Get list array.
     *
     * @param string $format
     * @return array|string
     */
    public function getAttributes($format = 'array')
    {
        if ($format == 'json') {
            return json_encode($this->data);
        }
        return $this->data;
    }
}
