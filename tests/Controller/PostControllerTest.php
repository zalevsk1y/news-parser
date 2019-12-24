<?php
namespace NewsParserPlugin\Tests\Controller;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Exception\MyException;

class MockOptionsModel 
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
class MockPostController extends PostController{
    protected function optionsModelsFactory($url){
        return new MockOptionsModel();
    }
}

class MockPostParser extends AbstractParseContent
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
    public function testCreate($url,$expected){
        wp_set_current_user($this->factory->user->create([
            'role' => 'administrator',
        ]));
        $post_controller=new MockPostController(new MockPostParser(),new ResponseFormatter());
        $result=$post_controller->create($url);
        $this->assertJsonStringEqualsJsonFile($expected,$result);
    }
    public function dataCreate(){
        return array(
            array('http://www.right-site.com/post.html',CONTROLLER_MOCK_DIR.'/noErrorRespondPost.json'),
            array('http://www.wrong-site.com/post.html',CONTROLLER_MOCK_DIR.'/errorRespondPost.json')
        );
    }
}