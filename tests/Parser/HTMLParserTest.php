<?php
use NewsParserPlugin\Parser\HTMLParser;


class HTMLParserGetRewrite extends HTMLParser{
   
    public function setTitle($title){
        $this->post['title']=$title;
    }
    public function setDOM($htmlData){
        $this->rawHTML=$htmlData;
        $this->dom=$this->createDOM($htmlData);
    }
    public function get($page_html,$option=array())
    {
        return $this->parse($page_html,$option);
    }
}

class HTMLParserTest extends \WP_UnitTestCase{
   
    protected $openGraph;
    protected $noMarkup;
    public function setUp(){
        
        $this->parser=new HTMLParserGetRewrite();
     
    }
    public function getMocks(){
        $this->openGraph=file_get_contents(PARSER_MOCK_DIR.'/testHTMLParserOpenGraph.html');
        $this->noMarkup=file_get_contents(PARSER_MOCK_DIR.'/testHTMLParserNoMarkup.html');
    }
    /**
     * @dataProvider HTMLDataTitle
     *
     */
    public function testPostTitle($html,$expectedTitle){
        $this->parser->setDOM($html);
        $title=$this->parser->postTitle();
        $this->assertEquals($expectedTitle,$title);
    }
     /**
     * @dataProvider HTMLDataImage
     *
     */
    public function testPostImage($html,$title,$expectedSrc){
        $this->parser->setDOM($html);
        $this->parser->setTitle($title);
        $src=$this->parser->postImage();
        $this->assertEquals($expectedSrc,$src);
    }
    public function testPostBody(){
        $this->getMocks();
        $this->parser->setDOM($this->openGraph);
        $body=$this->parser->postBody(array());
        $this->assertEquals('<p>Post Content.</p>',$body);
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