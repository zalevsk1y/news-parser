<?php
use NewsParserPlugin\Parser\HTMLPatternParser;
use Sunra\PhpSimple\HtmlDomParser;


class HTMLPatternParserGetRewrite extends HTMLPatternParser {
    public function __construct($dom_parser)
    {
        parent::__construct($dom_parser);
    }
    public function get($page_html,$option=array())
    {
        return $this->parse($page_html,$option);
    }
}

class HTMLPatternParserTest extends \WP_UnitTestCase{
    protected $testFile;
    protected $parser;
    public function setUp()
    {
        $dom_parser=new HtmlDomParser();
        $this->parser=new HTMLPatternParserGetRewrite($dom_parser);
    }
    public function testTest()
    {   
        $test_file=file_get_contents(__DIR__.'/mocks/parsePage.html');
        echo var_dump($this->parser->get($test_file));
        $this->assertTrue(true);
    }
}