<?php

require __DIR__.'/../autoload.php';
use NewsParserPlugin\PHPUnit\Framework\TestCase;
use NewsParserPlugin\Parser\XMLParser;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Exception\MyException;

define("NEWS_PARSER_PLUGIN_NO_IMAGE_PATH",   '/images/no-image.svg');

class XMLParserTest extends TestCase{
    public $xmlParser;
    public $xml;
    public $wrongXml;
    protected function setUp(){
        $this->xmlParser=new XMLParser();
        $this->xml=file_get_contents('https://www.phonearena.com/feed/news');
        $this->wrongXml=file_get_contents('https://www.motor1.com/rss/');
       
    }
    public function testParse (){
        $data=$this->xmlParser->parse($this->xml);
        
        $this->assertTrue(is_array($data),'Wrong data type should be array.');
        $this->assertTrue(property_exists($data[0],'title'),'No title');
        $this->assertTrue(property_exists($data[0],'pubDate'),'No Date');
        $this->assertTrue(property_exists($data[0],'description'),'No description');
        $this->assertTrue(property_exists($data[0],'link'),'No link');
        $this->assertTrue(property_exists($data[0],'image'),'No image');
    }
    public function testParseException(){
        $this->expectException(MyException::Class,'Wrong Exception class. Should be instance of MyException');
        $this->expectExceptionMessage(Errors::text('XML_PARSING'),'Wrong error message.');
        $data=$this->xmlParser->parse($this->wrongXml);
    }
}