<?php
namespace NewsParserPlugin\Tests;

use NewsParserPlugin\Parser\XMLParser;

class DummyXMLParser extends XMLParser{
    public function __construct($expiration_time){
        parent::__construct($expiration_time);
    }
    public function xmlParser($xml){
        return parent::xmlParser($xml);
    }
    public function formatData($xml_object){
        return parent::formatData($xml_object);
    }
}

class XMLParserTest extends \WP_UnitTestCase{
    protected $instance;
    public function setUp(){
        $this->instance=new DummyXMLParser(10);
        $this->xml=file_get_contents(__DIR__.'/mocks/testXML.xml');
    }
    public function testXmlParser(){
        $not_valid_xml=false;
        $result=$this->instance->xmlParser($this->xml);
        $this->assertInstanceOf(\SimpleXMLElement::class,$result);
    }
    /** 
     * @dataProvider xmlData
     */
    public function testFormatData($xml,$expected){
        $xml_data=$this->instance->xmlParser($xml);
        $result=$this->instance->formatData($xml_data);
        $this->assertEquals($expected,json_encode($result));
    }
    public function testCutText(){
        $length=150;
        $text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
        $result=$this->instance->cutText($length,$text);
        //adds ... at the end of string.
        $this->assertEquals($length+3,strlen($result));
    }
    /**
     * @dataProvider dataParseImageEnclosure
     */
    public function testParseImageEnclosure($xml_str,$expected){
        $xml_obj=$this->instance->xmlParser($xml_str);
        $result=$this->instance->parseImageEnclosure($xml_obj);
        $this->assertEquals($expected,$result);
    }

    public function dataParseImageEnclosure(){
        return array(
            array('<item><enclosure url="http://example.com/image.jpg" length="123456789" type="image/jpg" /></item>','http://example.com/image.jpg'),
            array('<image><url>https://www.site.com/favicon.ico</url><title>site.com</title><link>https://www.site.com/</link></image>',false)
        );
    }
    public function xmlData(){
        return array(
            array(\file_get_contents(__DIR__.'/mocks/xml/xml_1.xml'),
                \file_get_contents(__DIR__.'/mocks/xml/expected_1.json')),
                array(\file_get_contents(__DIR__.'/mocks/xml/xml_2.xml'),
                \file_get_contents(__DIR__.'/mocks/xml/expected_2.json'))
        );


    }


}