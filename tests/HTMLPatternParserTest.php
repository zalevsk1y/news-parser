<?php
use NewsParserPlugin\Parser\HTMLPatternParser;
use Sunra\PhpSimple\HtmlDomParser;


class HTMLPatternParserGetRewrite extends HTMLPatternParser {
    public function __construct($dom_parser)
    {
        parent::__construct($dom_parser);
    }
    public function setDOM($htmlData){
        $this->dom=$this->parser::str_get_html($htmlData);
    }
    public function get($page_html,$option=array())
    {
        return $this->parse($page_html,$option);
    }
}
/**
 * Test parser class.
 * 
 * @uses Sunra\PhpSimple\HtmlDomParser
 * 
 */
class HTMLPatternParserTest extends \WP_UnitTestCase{
    protected $testFile;
    protected $parser;
    public function setUp()
    {
        $dom_parser=new HtmlDomParser();
        $this->parser=new HTMLPatternParserGetRewrite($dom_parser);
    }
    /**
     * @covers NewsParserPlugin\Parser\HTMLPatternParser::postBody
     * @covers NewsParserPlugin\Parser\HTMLPatternParser::parseContainer
     * @return void
     */
    public function testPostBody()
    {   
        $test_file=file_get_contents(__DIR__.'/mocks/testHTMLPatternParser.html');
        $parsing_options=json_decode(file_get_contents(__DIR__.'/mocks/parsingOptions.json'),true);
        $this->parser->setDOM($test_file);
        $post_body=$this->parser->postBody($parsing_options);
        $post_body_snapshot=file_get_contents(__DIR__.'/mocks/parsedSnapshot.html');
        //phpUnit ver. 5.7 does not have assertIsString assertion 
        $this->assertEquals(gettype($post_body),'string');
        $this->assertEquals($post_body_snapshot,$post_body);
    }
}