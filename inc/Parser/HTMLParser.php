<?php
namespace NewsParserPlugin\Parser;

use NewsParserPlugin\Interfaces\ParserInterface;
use Sunra\PhpSimple\HtmlDomParser;
use NewsParserPlugin\Utils\ChainController;

/**
 * HTML parser class 
 * Parse data from html using Sunra\PhpSimple and regular expression
 *
 * PHP version 7.2.1
 *
 * 
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 * 
 */

class HTMLParser extends ParseContent 
{
    protected $parser;
    protected $dom = null;
    protected $rawHTML = null;
    /**
     * You could use NewsParserPlugin\any of HTML parsers.
     * But they should have method ::find() and getAttribute;
     * And should return array.
     *
     * @param HtmlDomParser $HTMLParserClass You can use NewsParserPlugin\any Parser that have same interface.
     */
    public function __construct(HtmlDomParser $HTMLParserClass,$cache_expiration = 600)
    {
        parent::__construct($cache_expiration);
        $this->parser = $HTMLParserClass;
    }
    /**
     * Create StdClass object from parsed data.
     * Structure :
     * [title] - post title @string
     * [image] - post main image url @string unescaped
     * [body] - post body @string
     * [gallery] - post image gallery array|'' empty string if none
     * 
     * @return StdClass
     */
    protected function parse($data)
    {
        $this->dom = $this->parser::str_get_html($data);
        $this->rawHTML = $data;
        $this->post['title'] = $this->postTitle();
        $this->post['image'] = $this->postImage();
        $this->post['body'] = $this->postBody(true);
        $this->post['gallery'] = $this->postGallery();
        return $this->post;
    }
    /**
     * Parse post title based on both OpenGraph marks and Schema.org marks.
     *
     * @return string
     */

    public function postTitle()
    {
        $title = $this->chain()
        // Parse title based on OpenGraph marks
            ->openGrapheTitleFind()
        // Parse title based on Schema.org marks
            ->titleRegExp("/\<h1\>(.*?)\<\/h1\>/i")
            ->get();
        return $title;
    }
    /**
     * Parse main image of the post based on Open Graphe protocol and simple image tag search .
     *
     * @return string Image url
     */
    public function postImage()
    {
        $imageUrl = $this->chain()
        // Parse gallery images based on Schema.org marks
            ->imageFinder('meta[property=og:image]')
        // Parse gallery images based on OpenGraph marks
            ->imageFinder('img')
            ->get();
        if (!count($imageUrl)) {
            return false;
        }

        return is_array($imageUrl) ? $imageUrl[0] : $imageUrl;
    }

    /**
     * Parse post body
     *
     * @param boolean $removeTags - should html tags be removed
     *
     * @return string
     */

    public function postBody(Bool $removeTags)
    {
        //Parse body inside <p> tag
        $body = $this->parseBodyTagP($removeTags);
        return $body ?: '';

    }

    /**
     * Parse gallery
     *
     * @return array Array of parsed images url
     */

    public function postGallery()
    {
        $gallery = $this->chain()
            ->postGalleryRegExp("/original\=\"(.*?\.jpg)/i")
            ->postGalleryRegExp("/data\-src\=\"(.*?\.jpg)/i")
            ->postGalleryRegExp("/data\-srcset\=\"(.*?\.jpg)/i")
            ->postGalleryRegExp("/data\-orig\-file\=\"(.*?\.jpg)/i")
            ->get();
        return $gallery ?: '';
    }
    /**
     * Parse title based on OpenGraphe marks <meta property=og:title content="...">
     *
     * @return string title
     */

    public function openGrapheTitleFind()
    {

        $title_items = $this->find('meta[property=og:title]');
        $title = false;
        if ($title_items && !is_array($title_items)) {
            $title = $title_items->getAttribute('content');
        } else if ($title_items && is_array($title_items) && count($title_items)) {
            $title = $title_items[0]->getAttribute('content');
        } else if (!count($title_items)) {
            $title = false;
        }
        return $title;

    }
    /**
     * Parse title with Regular expression
     *
     * @param string  $pattern regular expression pattern
     *
     * @return string
     */

    public function titleRegExp($pattern)
    {
        preg_match($pattern, $this->rawHTML, $matches);
        if (!count($matches)) {
            return false;
        }

        return $matches[0];
    }

    /**
     * Parse body of the post that in <p> Tags;
     *
     * @param bool $removeTags Should be HTML tags be removed.
     *
     * @return string
     */

    public function parseBodyTagP(Bool $removeTags)
    {
        $matchesBodies = $this->find('p');
        $result = [];
        foreach ($matchesBodies as $match) {
            $result[] = "<p>" . $match->plaintext . "</p>";
        }
        $output = implode('', $result);
        return $output == "<p></p>" ? false : $output;
    }
    /**
     * Find image using vendor Sunra\PhpSimple\HtmlDomParser. Tag <img> should have alt property as part of SEO
     * optimization to avoid parsing to many unnecessary images.
     *
     * @param string  $findPattern - PhpSimple find pattern https://simplehtmldom.sourceforge.io/
     *
     * @return array Array of image urls parsed from page
     */

    public function ImageFinder($findPattern)
    {
        $imageUrl = $this->find($findPattern);
        if (!count($imageUrl)) {
            return false;
        }
        $gallery = array();
        foreach ($imageUrl as $image) {
            $test = $image->getAttribute('alt');
            $url = $image->getAttribute('alt') ? $image->getAttribute('src') : false;
            if ($url && strpos($url, '.jpg')) {
                $gallery[] = $url;
            }

        }
        return count($gallery) ? $gallery : false;
    }
    /**
     * Parse images for gallery using regular expression
     *
     * @param string $pattern should be valid regular expression
     *
     * @return array parsed images ulr
     */
    public function postGalleryRegExp($pattern)
    {
        preg_match_all($pattern, $this->rawHTML, $matches);
        if (count($matches[1])) {
            $large = $matches[1];
        } else {
            $large = false;
        }

        return $large;
    }

    /**
     * Facade for ::find() method of Sunra\PhpSimple
     *
     * @param string $query Search query.https://simplehtmldom.sourceforge.io/
     *
     * @return array|HtmlDomParser
     */

    public function find($query)
    {
        $result = $this->dom->find($query);
        return count($result) ? $result : false;
    }

    /**
     * Remove HTML tags from the text.
     *
     * @param string $data    text with tags
     * @param string $pattern regexp pattern for tags default '@(<[^>]*>)@')
     *
     * @return string
     */
    protected function removeTags($data, $pattern = '@(<[^>]*>)@')
    {
        return preg_replace($pattern, '', $data);
    }
    /**
     * Facade for chain building class. use NewsParserPlugin\::get() function at the end to get result.
     *
     * @return object ChainController
     */
    protected function chain()
    {
        return new ChainController($this);
    }
}
