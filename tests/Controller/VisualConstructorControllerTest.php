<?php
namespace NewsParserPlugin\Tests\Controller;

use NewsParserPlugin\Controller\VisualConstructorController;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Models\PostModel;

class MockPostModel extends PostModel
{
    public function __construct()
    {
        parent::__construct(array('title'=>'title',
            'body'=>'body',
            'image'=>false,
            'sourceUrl'=>false,
            'authorId'=>1
        ));
    }
    public function addPostThumbnail($image_url = NULL, $alt = '')
    {
        switch ($image_url) {
            case 'http://www.right-site.com/image.jpeg':
                return 1;
            case 'http://www.wrong-site.com/image.jpeg':
                throw new MyException('Test error message');
            }
    }
}
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
    protected $instance;
    public function setUp(){
        parent::setUp();
        $this->instance=new MockVisualConstructorController(
            new MockHTMLRawParser(),
            new ResponseFormatter()
        );
    }
    public function testGetNoError(){
        $expected='<html></html>';
        $result=$this->instance->get('http://www.right-site.com/post.html');
        $this->assertEquals($expected,$result);
    }
    public function testGetError(){
        $expected=CONTROLLER_MOCK_DIR.'/errorRespondVisualConstructor.json';
        $result=$this->instance->get('http://www.wrong-site.com/post.html');
        $this->assertJsonStringEqualsJsonFile($expected,$result);
    }
    /**
     * @dataProvider dataSaveMedia
     */
    public function testSaveMedia($url,$expected){
        $result=$this->instance->saveMedia($url,2);
        $this->assertJsonStringEqualsJsonFile($expected,$result);
    }
    public function dataSaveMedia(){
        return array(
            array('http://www.right-site.com/image.jpeg',CONTROLLER_MOCK_DIR.'/noErrorRespondVisuaConstructorMedia.json'),
            array('http://www.wrong-site.com/image.jpeg',CONTROLLER_MOCK_DIR.'/errorRespondVisuaConstructorMedia.json')
        );
    }
}