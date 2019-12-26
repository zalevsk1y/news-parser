<?php
namespace NewsParserPlugin\Tests\Controller;

use NewsParserPlugin\Controller\VisualConstructorController;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Models\PostModel;


class MockVisualConstructorController extends VisualConstructorController
{
    public function __construct($parser,$formatter){
        parent::__construct($parser,$formatter);
    }
    protected function postModelsFactory($post_id)
    {
        return new MockPostModel();
    }
}
class MockHTMLRawParser extends AbstractParseContent
{
    public function __construct()
    {
        parent::__construct(10);
    }
    protected function parse ($data,$options){}
    public function get($url,$options=array()){
        switch ($url) {
        case 'http://www.right-site.com/post.html':
            return '<html></html>';
        case 'http://www.wrong-site.com/post.html':
            throw new MyException('Test error message');
        }
    }
}
class VisualConstructorControllerTest extends \WP_UnitTestCase
{
    protected $mockParser;
    public function setUp()
    {
        parent::setUp();
        $this->mockParser=$this->getMockBuilder(\NewsParserPlugin\Parser\Abstracts\AbstractParseContent::class)
            ->disableOriginalConstructor()
            ->setMethods(array('get','parse'))
            ->getMock();
    }
    public function init($mockParser)
    {
        return new VisualConstructorController(
            $this->mockParser,
            new ResponseFormatter
        );
    }
    public function testGetNoError()
    {
        $expected='<html></html>';
        $input_data='<html></html>';
        $this->mockParser->method('get')
            ->willReturn($input_data);
        $visual_controller=$this->init($this->mockParser);
        $result=$visual_controller->get('http://www.right-site.com/post.html');
        $this->assertEquals($expected,$result);
    }
    public function testGetError()
    {
        $expected=CONTROLLER_MOCK_DIR.'/errorRespondVisualConstructor.json';
        $this->mockParser->method('get')
            ->will($this->throwException(new MyException('Test error message')));
        $visual_controller=$this->init($this->mockParser);
        $result=$visual_controller->get('http://www.wrong-site.com/post.html');
        $this->assertJsonStringEqualsJsonFile($expected,$result);
    }
   
}