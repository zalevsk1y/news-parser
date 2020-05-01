<?php

namespace NewsParserPlugin\Parser;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;

/**
 * Class for parsing XML files (using libxml) from rss-feed to get list of posts.
 *
 * PHP version 5.6
 *
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 *
 */

class XMLParser extends Abstracts\AbstractParseContent
{
    /**
    * Init function
    *
    * @param integer $cache_expiration
    */
    public function __construct($cache_expiration = 60)
    {
        parent::__construct($cache_expiration);
    }
    /**
     * Parse data from xml.Return array of objects with post data.
     * Structure:
     * [title] - title of post
     * [pubDate] -date of post publication
     * [description] -post brief description
     * [link] - link to the original post
     * [image] - main post image url
     * [status] - status of post parsed - if post was not saved as draft and draft -when post saved as draft
     *
     * @param string $xml
     * @return object of StdClass
     *
     */
    protected function parse($xml)
    {

        $data = $this->xmlParser($xml);
        $structured_data = $this->formatData($data);
        return $structured_data;
    }

    /**
     * Parse xml string to the object using simplexml_load_string
     *
     * @param string $str string in xml format
     * @throws NewsParserPlugin\Exception\MyException
     * @return \SimpleXMLElement
     */

    protected function xmlParser($str)
    {
        libxml_use_internal_errors(true);
        $data = simplexml_load_string($str);
        $errors = libxml_get_errors();

        if (!empty($errors)) {
            libxml_clear_errors();
            throw new MyException(Errors::text('XML_PARSING'), Errors::code('UNSUPPORTED_MEDIA_TYPE'));
        }

        return $data;
    }

    /**
     * Format data for output.
     * Structure:
     * [title] - title of post
     * [pubDate] -date of post publication
     * [description] -post brief description
     * [link] - link to the original post
     * [image] - main post image url
     * [status] - status of post parsed - if post was not saved as draft and draft -when post saved as draft
     *
     * @param \SimpleXMLElement $data object created by simplexml_load_string() function;
     *
     * @return array|array<mixed,object>  parsed data
     */
    protected function formatData($data)
    {
        $response = array();
        foreach ($data->channel->item as $item) {
            $title = (string) ($item->title);
            $date = \esc_html($item->pubDate);
            $description = $this->parseDescription($item->description);
            $link = $item->link;
            $image = $this->parseImage($item, $item->description);
            $response[] = (object) array(
                'title' => \esc_html($title),
                'pubDate' => \esc_html($date),
                'description' => \esc_html($description),
                'link' => \esc_url_raw((string)$link),
                'image' => \esc_url_raw((string)$image),
                'status' => 'parsed',
            );
        }
        return $response;
    }
    /**
     * Parse description of the post and cut it to 150 symbols
     *
     * @uses AbstractParseContent::pipe()
     * @param string|object $data
     * @return string
     */

    protected function parseDescription($data)
    {
        if (gettype($data) == "object") {
            $data = (string) $data;
        }
        $text = $this->pipe($data)
            ->func('trim', array("data"))
            ->removeTags()
            ->cutText(150)
            ->get();

        return $text;
    }

    /**
     * Parse image using
     * <enclosure >
     * <media:content> http://www.rssboard.org/media-rss#media-content
     * <description> search image tag in description using regular expression
     *
     * @uses AbstractParseContent::chain()
     * @param \SimpleXMLElement $xml Object created by simplexml_load_string() function
     * @param string $text
     * @return string image url or default image rl image if false
     */

    protected function parseImage($xml, $text)
    {
        $image = $this->chain()
            ->parseImageEnclosure($xml)
            ->parseImageDescription($text)
            ->parseImageMediaTag($xml)
            ->get();
        return $image ?: NEWS_PARSER_PLUGIN_NO_IMAGE_PATH;
    }

    /**
     * Cutting text
     *
     * @uses AbstractParseContent::pipe()
     * @param int $length length of string
     * @param string $text text to cut
     * @return string
     */

    public function cutText($length, $text)
    {
        $text = $this->pipe($text)
            ->func('str_split', array("data"))
            ->func('array_slice', array('data', 0, $length))
            ->func('implode', array("", "data"))
            ->get();
        return $text . '...';
    }

    /**
     * Remove tags from text using regular expression
     *
     * @param string $data text where tags should be removed
     * @param string $pattern regular expression pattern
     * @return string text without HTML tags
     */

    public function removeTags($data, $pattern = '/(<[^>]*?>)/i')
    {
        return preg_replace($pattern, '', $data);
    }
    /**
     * Facade for preg_match() function for using in "Chain"
     * Removes HTML tags
     *
     * @param string $pattern regular expression pattern without wrapper '//'
     * @param string $string to search in
     * @return string|false found data or false
     */
    public function regExp($pattern, $string)
    {
        $string = str_replace(PHP_EOL, '', $string);
        preg_match('/' . $pattern . '/i', $string, $match);
        if (count($match)) {
            return $match[1];
        }

        return false;
    }
    /**
     * Parse image according RSS 2.0 specification
     * https://en.wikipedia.org/wiki/RSS_enclosure
     *
     * @param \SimpleXMLElement $xml
     * @return string|false url image or false
     */
    public function parseImageEnclosure($xml)
    {

        if (property_exists($xml, 'enclosure')) {
            $image = (string) $xml->enclosure->attributes()->url;
        }
        return isset($image) ?$image: false;
    }
  
    /**
     * Parse image from description using regular expression
     *
     * @param string $text text of description
     * @return string|false
     */
    public function parseImageDescription($text)
    {
        if (gettype($text) == "object") {
            $text = (string) $text;
        }
        $text = trim($text);
        $image = $this->regExp('src\=[\"\']([^\"\']*\.[jpg|png|tiff]..)', $text);
        return isset($image) ?$image: false;
    }
    /**
     * Parsing image from XML Media:Content element.
     *
     * @param \SimpleXMLElement $xml
     * @return string|false
     */
    public function parseImageMediaTag($xml)
    {
        $media_group=$xml->children('media', true);
        $image=$media_group->content->attributes()['url'];
        return isset($image) ?$image: false;
    }
}
