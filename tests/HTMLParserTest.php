<?php
use NewsParserPlugin\Parser\HTMLParser;
use Sunra\PhpSimple\HtmlDomParser;

class HTMLParserGetRewrite extends HTMLParser{
    public function __construct($dom_parser)
    {
        parent::__construct($dom_parser);
    }
    public function setTitle($title){
        $this->post['title']=$title;
    }
    public function setDOM($htmlData){
        $this->rawHTML=$htmlData;
        $this->dom=$this->parser::str_get_html($htmlData);
    }
    public function get($page_html,$option=array())
    {
        return $this->parse($page_html,$option);
    }
}

class HTMLParserTest extends \WP_UnitTestCase{
    protected $parser;
    protected $openGraph;
    protected $noMarkup;
    public function setUp(){
        $dom_parser=new HtmlDomParser();
        $this->parser=new HTMLParserGetRewrite($dom_parser);
     
    }
    public function getMocks(){
        $this->openGraph=file_get_contents(__DIR__.'/mocks/testHTMLParserOpenGraph.html');
        $this->noMarkup=file_get_contents(__DIR__.'/mocks/testHTMLParserNoMarkup.html');
    }
    /**
     * @dataProvider HTMLDataTitle
     *
     */
    public function testPostTitle($html,$expectedTitle){
        $this->parser->setDOM($html);
        $title=$this->parser->postTitle();
        $this->assertEquals($title,$expectedTitle);
    }
     /**
     * @dataProvider HTMLDataImage
     *
     */
    public function testPostImage($html,$title,$expectedSrc){
        $this->parser->setDOM($html);
        $this->parser->setTitle($title);
        $src=$this->parser->postImage();
        $this->assertEquals($src,$expectedSrc);
    }
    public function HTMLDataTitle(){
        ($this->openGraph||$this->noMarkup)||$this->getMocks();
        return array(
            array($this->openGraph,'Test title'),
            array($this->noMarkup,'Test title')
        );
    }
    public function HTMLDataImage(){
        ($this->openGraph||$this->noMarkup)||$this->getMocks();
        return array(
            array($this->openGraph,'No title','https://www.test-site.com/test-image.jpg'),
            array($this->noMarkup,'Test title','https://www.test-site.com/main-image.jpg')
        );
    }
}