<?php
namespace NewsParserPlugin\Parser;

use HungCP\PhpSimpleHtmlDom\HtmlDomParser;



/**
 * HTML parser class
 * Parse data from html using voku\PhpSimple and regular expression
 * https://github.com/caophihung94/php-simple-html-dom-parser
 *
 * PHP version 5.6
 *
 *
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class HTMLParser extends Abstracts\AbstractParseContent
{
    /**
     * instance of HtmlDomParser
     *
     * @var object simplehtmldom_1_5\simple_html_dom
     */
    protected $dom;
    /**
     * String with HTML data.
     *
     * @var string
     */
    protected $rawHTML;
    /**
     * Parsed data.
     * Structure :
     * [title] - post title @string
     * [image] - post main image url @string
     * [body] - post content @string|@array
     *
     * @var array
     */
    protected $post=array();


    /**
     * Init function.
     *
     */
    public function __construct($cache_expiration = 3600)
    {
        parent::__construct($cache_expiration);
    }
    /**
     * Init and set data for parser.
     *
     * @param string $data
     * @return void
     */
    public function initParser($data)
    {
        $clean_html=$this->pipe($data)
            ->removeScriptTags()
            ->removeStyleTags()
            ->get();
        $this->dom = $this->createDOM($clean_html);
        $this->rawHTML = $clean_html;
    }
    /**
     * Create array from parsed data.
     * Structure :
     * [title] - post title @string
     * [image] - post main image url @string
     * [body] - post content @string|@array
     *
     * @uses AbstractParseContent::pipe()
     * @param string $data HTML data.
     * @return array
     */

    protected function parse($data)
    {
        $this->initParser($data);
        $this->post['title'] = esc_html($this->postTitle());
        $this->post['image'] = esc_url_raw($this->postImage());
        $this->post['body'] = $this->postBody();
        return $this->post;
    }
    /**
     * Parse post title based on both OpenGraph marks and inside h1 tag.
     *
     * @usesAbstractParseContent::chain()
     * @return false|string
     */

    protected function postTitle()
    {
        $title = $this->chain()
        // Parse title based on OpenGraph marks
            ->openGrapheTitleFind()
        // Parse title inside h1 tag
            ->regExp("/\<h1\>(.*?)\<\/h1\>/i")
            ->get();
        return $title;
    }
    /**
     * Parse main image of the post based on Open Graphe protocol and simple image tag search .
     *
     * @uses AbstractParseContent::chain()
     * @return false|string Image url
     */

    protected function postImage()
    {
        $alt=isset($this->post['title'])?$this->post['title']:'';
        $searchPattern='img[alt='.$alt.']';
        $images = $this->chain()
        // Parse gallery images based on Schema.org marks
            ->find('meta[property=og:image]')
        // Parse gallery images based image tag search
            ->find($searchPattern)
            ->get();
        if (empty($images)) {
            return false;
        }
        return $this->chain($images[0])
            ->getAttribute('content')
            ->getAttribute('data-src')
            ->getAttribute('src')
            ->get();
    }

    /**
     * Parse post body
     *
     * @return string
     */

    protected function postBody()
    {
        //Parse body inside <p> tag
        $body = $this->parseBodyTagP();
        return $body ?: '';
    }
    
    /**
     * Parse title based on OpenGraphe marks <meta property=og:title content="...">
     *
     * @return false|string title
     */

    public function openGrapheTitleFind()
    {
        $title_items = $this->find('meta[property=og:title]');
        if (false===$title_items||!is_array($title_items)||empty($title_items)) {
            return false;
        }
        return $title_items[0]->getAttribute('content');
    }
    /**
     * Parse title with Regular expression
     *
     * @param string  $pattern regular expression pattern
     *
     * @return false|string
     */

    public function regExp($pattern)
    {
        preg_match($pattern, $this->rawHTML, $matches);
        if (empty($matches)) {
            return false;
        }
        return $matches[1];
    }

    /**
     * Parse body of the post that in <p> Tags;
     *
     *
     *
     * @return false|string
     */

    public function parseBodyTagP()
    {
        $matchesBodies = $this->find('p');
        $result = [];
        if (empty($matchesBodies)||!is_array($matchesBodies)) {
            return false;
        }
        foreach ($matchesBodies as $match) {
            $result[] = "<p>" . esc_html($match->plaintext) . "</p>";
        }
        $output = implode('', $result);
        return $output == "<p></p>" ? false : $output;
    }
    /**
     * Facade for ::find() method of Sunra\PhpSimple
     *
     * @param string $query Search query.https://simplehtmldom.sourceforge.io/
     *
     * @return false|array of HtmlDomParser objects if found.
     */

    public function find($query)
    {
        $result = $this->dom->find($query);
        return !empty($result) ? $result : false;
    }
    /**
     * Remove HTML tags from the text.
     *
     * @param string $data text with tags
     * @param string $pattern regexp pattern for tags default '@(<[^>]*>)@')
     *
     * @return string
     */
    protected function removeTags($data, $pattern = '@(<[^>]*>)@')
    {
        return preg_replace($pattern, '', $data);
    }
    /**
     * Create instance of simplehtmldom_1_5\simple_html_dom  https://github.com/caophihung94/php-simple-html-dom-parser.
     *
     * @param string $html
     * @return \simplehtmldom_1_5\simple_html_dom simplehtmldom_1_5\simple_html_dom
     */
    protected function createDOM($html)
    {
        return HtmlDomParser::str_get_html($html);
    }
}
