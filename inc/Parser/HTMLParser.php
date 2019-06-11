<?php
namespace Parser;
use Interfaces\ParserInterface;
use Sunra\PhpSimple\HtmlDomParser;
use Message\Errors;
use Utils\ChainController;

/**
 * HTML parser class Facade to vendor Sunra parser.
 *
 * PHP version 7.2.1
 *
 * @category Parser
 * @package  HtmlParaser
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 * @link     https://github.com/2600BottlesOnTheWall
 */


 
class HTMLParser implements ParserInterface 
{
    protected $parser;
    protected $dom = null;
    protected $rawHTML=null;
    /**
     * You could use any of HTML parsers.
     * But they should have method ::find() and getAttribute;
     * And should return array.
     *
     * @param HtmlDomParser $HTMLParserClass You can use any Parser that have same interface.
     */
    public function __construct(HtmlDomParser $HTMLParserClass)
    {
        $this->parser = $HTMLParserClass;
    }
    /**
     * Create StdClass object from parsed data.
     *
     * @return StdClass
     */
    public function parse($data)
    {
        $this->dom=$this->parser::str_get_html($data);
        $this->rawHTML=$data;
        $this->post['title'] = $this->postTitle();
        $this->post['image'] = $this->postImage();
        $this->post['body'] = $this->postBody(true);
        $this->post['gallery']=$this->postGallery();
        return  $this->post;
    }

    /**
     * Parse title of the page based on Open Graphe protocol.
     *
     * @return string
     */


    public function openGrapheTitleFind(){

        $title_items = $this->find('meta[property=og:title]');
        $title=false;
        if(!is_array($title_items )){
            $title=$title_items ->getAttribute('content');
        }else if(is_array($title_items)&&count($title_items )){
            $title=$title_items[0]->getAttribute('content');
        }else if(!count($title_items)){
            $title=false;
        }
        return $title;

    }
    public function titleRegExp($pattern){
        preg_match_all($pattern,$this->rawHTML,$matches);
        if(!count($matches)) return false;
        return $matches[0];
    }
    public function postTitle()
    {
        $title=$this->chain()
                    ->openGrapheTitleFind()
                    ->titleRegExp("/\<h1\>(.*?)\<\/h1\>/i")
                    ->get();
        return $title;
    }
    /**
     * Parse main image of the post based on Open Graphe protocol.
     *
     * @return string
     */
    public function postImage()
    {
        $imageUrl = $this->find('meta[property=og:image]');
        if(!count($imageUrl)) return false;
        return is_array($imageUrl) ? $imageUrl[0]->getAttribute('content') : $imageUrl -> getAttribute('content');
    }
    /**
     * Parse body of the post that in <p> Tags;
     *
     * @param bool $removeTags Should be HTML tags remove.
     *
     * @return string
     */
    public function postBody(Bool $removeTags)
    {
        $body=$this->chain()
                ->parseBodyParser($removeTags)
                ->parseBodyRegexp()
                ->get();
        return $body?:'';

    }
    public function parseBodyParser(Bool $removeTags){
        $matchesBodies = $this->find('p');       
        $result = [];
        foreach ($matchesBodies as $match) {   
                $result[] = "<p>" . $match->plaintext . "</p>";
        }
        $output = implode('', $result);
        return $output=="<p></p>"?false:$output;
    }
    public function parseBodyRegexp(){
        $container=$this->find('div.s_page_content');
        if(!count($container))return false;
        $output=$container->plaintext;
        return $output=="<p></p>"?false:$output;
    }
    /**
     * Parse gallery images based on Schema.org marks
     *
     * @return object
     */

    public function postGallery()
    {
        $gallery=$this->chain()
        ->postGalleryRegExp("/original\=\"(.*?\.jpg)/i")
        ->postGalleryRegExp("/data\-src\=\"(.*?\.jpg)/i")
        ->postGalleryRegExp("/data\-srcset\=\"(.*?\.jpg)/i")
        ->get();
        return $gallery?:'';
    }
    public function openGrapheImageFind(){
        $imageUrl = $this->find('img');
        if(!count($imageUrl)){ 
            return false;
        }else{
            $gallery=array();
            foreach($imageUrl as $image){
                $url=$image->getAttribute('alt')?$image->getAttribute('src'):false;
                if($url&&strpos($url,'.jpg')) $gallery[]=$url;
            }
            return $gallery;
        }
        
    }
    public function postGalleryRegExp($pattern)
    {
  
       preg_match_all($pattern,$this->rawHTML,$matches);
       if(count($matches[1])){
            $large=$matches[1];
       }else{
           $large=false;
       }

       return $large;
    }
  
    /**
     * Facade for ::find() method of parser
     *
     * @param string $query Search query.
     *
     * @return array|HtmlDomParser
     */
    public function find($query)
    {
        return $this->dom->find($query);
    }

    /**
     * Remove HTML tags frome the text.
     *
     * @param string $data    text with tags
     * @param string $pattern regexp patern for tags default '@(<[^>]*>)@')
     *
     * @return string
     */
    protected function removeTags($data, $pattern = '@(<[^>]*>)@')
    {
        return preg_replace($pattern, '', $data);
    }
    public  function regExp($pattern,$string){
        preg_match_all($pattern,$string,$matches);
        return count($matches)>1?$matches[1]:false;
    }
    protected function chain(){
        return (new ChainController())->build($this);
     }
}
