<?php
namespace NewsParserPlugin\Tests\Parser;
use NewsParserPlugin\Parser\HTMLPatternParser;
use NewsParserPlugin\Utils\AdapterGutenberg;



class MockHTMLPatternParser extends HTMLPatternParser 
{
  
    public $options;
    public function parse($data)
    {
        return parent::parse($data);
    }
    
}
/**
 * Test parser class.
 * 
 * 
 * 
 */
class HTMLPatternParserTest extends \WP_UnitTestCase
{
   
    protected $parser;
    public function setUp():void
    {
        // parent::setUp();
        $this->parser=new MockHTMLPatternParser();
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
        $this->parser->options=$parsing_options;

        $data=$this->parser->parse($test_file);
        $parsed_post_body=json_decode(file_get_contents(PARSER_MOCK_DIR.'/parsedBody.json'),true);
        //phpUnit ver. 5.7 does not have assertIsString assertion 
        $this->assertEquals('array',gettype($data['body']));
        $this->assertEquals($parsed_post_body,$data['body']);
    }
}