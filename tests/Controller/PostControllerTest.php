<?php
namespace NewsParserPlugin\Tests;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Exception\MyException;

class DummyOptionsModel 
{
    public function getExtraOptions()
    {
        return array(
            'addFeaturedMedia'=>false,
            'addSource'=>true
        );
    }
    public function getAttributes($type)
    {
        return array();
    }
}
class DummyPostController extends PostController{
    protected function optionsModelsFactory($url){
        return new DummyOptionsModel();
    }
}

class DummyPostParser extends AbstractParseContent
{
    public function __construct()
    {
        parent::__construct(10);
    }
    protected function parse ($data,$options){}
    public function get($url,$options=array()){
        switch ($url) {
        case 'http://www.right-site.com/post.html':
            return array(
                'title'=>'Test title',
                'body'=>'Test content.',
                'image'=>'site.com/image.jpg'
            );
        case 'http://www.wrong-site.com/post.html':
            throw new MyException('Test error message');
        }
    }
}
class PostControllerTest extends \WP_UnitTestCase
{
    /**
     * @dataProvider dataGet
     *
     * @return void
     */
    public function testGet($url,$expected){
        wp_set_current_user($this->factory->user->create([
            'role' => 'administrator',
        ]));
        $post_controller=new DummyPostController(new DummyPostParser(),new ResponseFormatter());
        $result=$post_controller->get($url);
        $this->assertJsonStringEqualsJsonFile($expected,$result);
    }
    public function dataGet(){
        return array(
            array('http://www.right-site.com/post.html',CONTROLLER_MOCK_DIR.'/noErrorRespondPost.json'),
            array('http://www.wrong-site.com/post.html',CONTROLLER_MOCK_DIR.'/errorRespondPost.json')
        );
    }
}