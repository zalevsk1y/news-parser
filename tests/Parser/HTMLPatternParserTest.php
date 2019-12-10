<?php
use NewsParserPlugin\Parser\HTMLPatternParser;



class HTMLPatternParserGetRewrite extends HTMLPatternParser 
{
  
    public function setDOM($htmlData)
    {
        $this->dom=$this->createDOM($htmlData);
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
class HTMLPatternParserTest extends \WP_UnitTestCase
{
    protected $testFile;
    protected $parser;
    public function setUp()
    {
        $this->parser=new HTMLPatternParserGetRewrite();
    }
    /**
     * @covers NewsParserPlugin\Parser\HTMLPatternParser::postBody
     * @covers NewsParserPlugin\Parser\HTMLPatternParser::parseContainer
     * @return void
     */
    public function testPostBody()
    {   
        $test_file=file_get_contents(PARSER_MOCK_DIR.'/testHTMLPatternParser.html');
        $parsing_options=json_decode(file_get_contents(PARSER_MOCK_DIR.'/parsingOptions.json'),true);
        $this->parser->setDOM($test_file);
        $post_body=$this->parser->postBody($parsing_options);
        $post_body_snapshot=file_get_contents(PARSER_MOCK_DIR.'/parsedSnapshot.html');
        //phpUnit ver. 5.7 does not have assertIsString assertion 
        $this->assertEquals('string',gettype($post_body));
        $this->assertEquals($post_body_snapshot,$post_body);
    }
}