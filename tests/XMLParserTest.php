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
    public function xmlData(){
        return array(
            array(\file_get_contents(__DIR__.'/mocks/xml/xml_1.xml'),
                \file_get_contents(__DIR__.'/mocks/xml/expected_1.json')),
                array(\file_get_contents(__DIR__.'/mocks/xml/xml_2.xml'),
                \file_get_contents(__DIR__.'/mocks/xml/expected_2.json'))
        );


    }


}