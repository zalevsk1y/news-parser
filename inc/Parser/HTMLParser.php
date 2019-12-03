<?php
namespace NewsParserPlugin\Parser;

use NewsParserPlugin\Utils\ChainController;
use NewsParserPlugin\Utils\Sanitize;
use Sunra\PhpSimple\HtmlDomParser;

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
     * You could use NewsParserPlugin\any of HTML parsers.
     * But they should have method ::find() and getAttribute;
     * And should return array.
     *
     * @param HtmlDomParser $HTMLParserClass You can use NewsParserPlugin\any Parser that have same interface.
     */
    public function __construct(HtmlDomParser $HTMLParserClass, $cache_expiration = 600)
    {
        parent::__construct($cache_expiration);
        $this->parser = $HTMLParserClass;
    }
    /**
     * Create StdClass object from parsed data.
     * Structure :
     * [title] - post title @string
     * [image] - post main image url @string unescaped
     * [content] - post content @array
     * 
     *
     * @param string $data
     * @param array $options
     * @return StdClass
     */
    public function parse($data,$options)
    {
        if (!empty($options))$this->options=$options;
        $this->dom = $this->parser::str_get_html($data);
        $this->rawHTML = $data;
        $this->post['title'] = esc_html($this->postTitle());
        $this->post['image'] = Sanitize::sanitizeImageURL($this->postImage());
        $this->post['body'] = $this->postBody($options);
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
     * @return string|bool Image url
     */
    public function postImage()
    {   $alt=$this->getFirstWordOfTitle();
        $images = $this->chain()
        // Parse gallery images based on Schema.org marks
            ->find('meta[property=og:image]')
        // Parse gallery images based on OpenGraph marks
            ->imageFinder('img',$alt,'htmlDomParser')
            ->get();
        if (!count($images)) {
            return false;
        }
        return $this->chain($images[0])
            ->getAttribute('content')
            ->getAttribute('src')
            ->get();
    }

    /**
     * Parse post body
     *
     *
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
     *
     *
     * @return string|bool
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
     * Find image using vendor Sunra\PhpSimple\HtmlDomParser. Tag <img> should have alt property as part of SEO
     * optimization to avoid parsing to many unnecessary images.
     *
     * @param string  $findPattern - PhpSimple find pattern https://simplehtmldom.sourceforge.io/
     * @param string $alt part of alt string. 
     * @param string $output [htmlDomParser|tag] htmlDomParse - return htmlDomParse object,tag - return outerText tag as string 
     *
     * @return array|bool Array of image urls parsed from page
     */

    public function ImageFinder($findPattern,$alt,$output='tag')
    {
        $imageUrl = $this->find($findPattern);
        if ( $imageUrl===false||!count($imageUrl)) {
            return false;
        }
        $gallery = array();
        if(empty($imageUrl)||!is_array($imageUrl))return false;
        foreach ($imageUrl as $image) {
            if (false!==$alt_of_image=$image->getAttribute('alt')&&$alt&&strpos($alt_of_image,$alt)!==false){ 
                switch($output){
                    case 'htmlDomParser':
                            $gallery[] = $image;
                        break;
                    case 'tag':
                        $gallery[] = $image->outertext;
                        break;
                }
            }
        }
        return count($gallery) ? $gallery : false;
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
     * Returns first word of array.
     *
     * @return string|false
     */
    protected function getFirstWordOfTitle(){
      
        if($this->post['title']) {
            $words_array=explode(' ',$this->post['title']);
            return $words_array[0];
        }
        return false;
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
     * @param object|null object which methods will be called in chain.
     * 
     * @return object ChainController
     */
    protected function chain($object=null)
    {
        $object=is_null($object)?$this:$object;
        return new ChainController($object);
    }
}
