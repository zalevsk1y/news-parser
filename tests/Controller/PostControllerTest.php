<?php
namespace NewsParserPlugin\Tests\Controller;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Exception\MyException;

class PostControllerTest extends \WP_UnitTestCase
{
    protected $user;
    protected $post;
    protected $mockTemplateModel;
    protected $mockParser;
    
    public function setUp()
    {
        parent::setUp();
        $this->user=$this->factory->user->create_and_get([
            'role' => 'administrator',
        ]);
        wp_set_current_user($this->user->ID);
        $this->mockTemplateModel=$mock_options_model=$this->getMockBuilder(\NewsParserPlugin\Models\TemplateModel::class)
            ->disableOriginalConstructor()
            ->setMethods(array('getExtraOptions','getAttributes'))
            ->getMock();
        $mock_options_model->method('getExtraOptions')
            ->willReturn( array(
                'addFeaturedMedia'=>false,
                'addSource'=>true
            ));
        $mock_options_model->method('getAttributes')
            ->willReturn(array());
        $this->mockParser=$this->getMockBuilder(\NewsParserPlugin\Parser\Abstracts\AbstractParseContent::class)
            ->disableOriginalConstructor()
            ->setMethods(array('get','parse'))
            ->getMock();
    }
    public function tearDown()
    {
        isset($this->user)&&wp_delete_user($this->user->ID);
        isset($this->post)&&wp_delete_post($this->post->ID);
        parent::tearDown();
    }
    /**
     * @dataProvider dataCreate
     *
     * @return void
     */
    public function testCreate($url,$data,$expected){
       
        $this->mockParser->method('get')
            ->willReturn($data);
        $mock_post_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\PostController::class)
            ->setConstructorArgs(
                array(
                    $this->mockParser,
                    new ResponseFormatter()
                )
            )
            ->setMethods(array('TemplateModelsFactory'))
            ->getMock();
        $mock_post_controller->method('TemplateModelsFactory')
            ->willReturn($this->mockTemplateModel);    
        $result=$mock_post_controller->create($url,1);
        $this->post=$mock_post_controller->post;
        $this->assertJsonStringEqualsJsonFile($expected,$result->get('json'));
    }
    public function dataCreate(){
        return array(
            array(
                'http://www.right-site.com/post.html',
                array(
                    'title'=>'Test title',
                    'body'=>'Test content.',
                    'image'=>'site.com/image.jpg'
                ),
                CONTROLLER_MOCK_DIR.'/noErrorRespondPost.json'
            ),
            array(
                'http://www.wrong-site.com/post.html',
                array(),
                CONTROLLER_MOCK_DIR.'/errorRespondPost.json'
                )
        );
    }
}