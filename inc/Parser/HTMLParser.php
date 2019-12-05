<?php
namespace NewsParserPlugin\Parser;

use NewsParserPlugin\Utils\ChainController;
use Sunra\PhpSimple\HtmlDomParser;
use NewsParserPlugin\Traits\PipeTrait;
use NewsParserPlugin\Traits\ChainTrait;
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
    protected $post=array();
    protected $options;
    /**
     * Adds function with pipe factory.
     * 
     * @method protected pipe() Function factory for Utils\PipeController creation.
     */
    use PipeTrait;
    /**
     * Adds function with chain factory.
     * 
     * @method protected chain() Function factory for Utils\PipeController creation.
     */
    use ChainTrait;

    /**
     * Init function.
     *
     * @param HtmlDomParser $HTMLParserClass HTML parser https://github.com/sunra/php-simple-html-dom-parser.
     */
    public function __construct(HtmlDomParser $HTMLParserClass, $cache_expiration = 600)
    {
        parent::__construct($cache_expiration);
        $this->parser = $HTMLParserClass;
    }
    /**
     * Create array from parsed data.
     * Structure :
     * [title] - post title @string
     * [image] - post main image url @string
     * [body] - post content @string|@array
     * 
     * @uses PipeTrait::pipe()
     * @param string $data HTML data.
     * @param array $options template options for parsing post content. 
     * @return array
     */

    public function parse($data,$options)
    {
        if (!empty($options))$this->options=$options;
        $clean_html=$this->pipe($data)
            ->removeScriptTags()
            ->removeStyleTags()
            ->get();
        $this->dom = $this->parser::str_get_html($clean_html);
        $this->rawHTML = $clean_html;
        $this->post['title'] = esc_html($this->postTitle());
        $this->post['image'] = esc_url_raw($this->postImage());
        $this->post['body'] = $this->postBody($options);
        return $this->post;
    }
    /**
     * Parse post title based on both OpenGraph marks and inside h1 tag.
     * 
     * @uses ChainTrait::chain()
     * @return string|bool
     */

    public function postTitle()
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
     * @uses ChainTrait::chain()
     * @return string|bool Image url
     */

    public function postImage()
    {   $alt=$this->post['title'];
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
     * @param array $options parse template patterns for   
     * @return string
     */

    public function postBody($options)
    {
       
        //Parse body inside <p> tag
        $body = $this->parseBodyTagP();
        return $body ?: '';

    }
    
    /**
     * Parse title based on OpenGraphe marks <meta property=og:title content="...">
     *
     * @return string|bool title
     */

    public function openGrapheTitleFind()
    {
        $title_items = $this->find('meta[property=og:title]');
        if(false===$title_items||!is_array($title_items)||empty($title_items)) return false;
        return $title_items[0]->getAttribute('content');
    }
    /**
     * Parse title with Regular expression
     *
     * @param string  $pattern regular expression pattern
     *
     * @return string|bool
     */

    public function regExp($pattern)
    {
        preg_match($pattern, $this->rawHTML, $matches);
        if (empty($matches))return false;
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
        if(empty($matchesBodies)||!is_array($matchesBodies))return false;
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
     * @return array|bool of HtmlDomParser objects if found.
     */

    public function find($query)
    {
        $result = $this->dom->find($query);
        return !empty($result) ? $result : false;
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
}

