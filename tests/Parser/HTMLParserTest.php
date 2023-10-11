<?php
namespace NewsParserPlugin\Tests\Parser;
use NewsParserPlugin\Parser\HTMLParser;


class MockHTMLParser extends HTMLParser
{
   
    public function parse($data)
    {
        return parent::parse($data);
    }

}

class HTMLParserTest extends \WP_UnitTestCase
{
   
    protected $mocks;
   

    public function getMocks()
    {   
        if(isset($this->mocks))
        {
            return $this->mocks;
        }else{
            return array(
                'openGraph'=>file_get_contents(PARSER_MOCK_DIR.'/testHTMLParserOpenGraph.html'),
                'noMarkup'=>file_get_contents(PARSER_MOCK_DIR.'/testHTMLParserNoMarkup.html')
            );
        }
    }
    public function setUp()
    {
        parent::setUp();
        $this->parser=new MockHTMLParser(10);
    }
    /**
     * @dataProvider HTMLDataTitle
     *
     */
    public function testPostTitle($html,$expectedTitle)
    {
       
        $data=$this->parser->parse($html);
        $this->assertEquals($expectedTitle,$data['title']);
    }
     /**
     * @dataProvider HTMLDataImage
     *
     */
    public function testPostImage($html,$expectedSrc)
    {
        $data=$this->parser->parse($html);
        $this->assertEquals($expectedSrc,$data['image']);
    }
    public function testPostBody()
    {
        $mocks=$this->getMocks();
        $data=$this->parser->parse($mocks['openGraph']);
        $this->assertEquals('<p>Post Content.</p>',$data['body']);
    }
    public function HTMLDataTitle()
    {   $mocks=$this->getMocks();
        return array(
            array($mocks['openGraph'],'Test title'),
            array($mocks['noMarkup'],'Test title')
        );
    }
    public function HTMLDataImage()
    {   
        $mocks=$this->getMocks();
        return array(
            array($mocks['openGraph'],'https://www.test-site.com/test-image.jpg'),
            array($mocks['noMarkup'],'https://www.test-site.com/main-image.jpg')
        );
    }
}