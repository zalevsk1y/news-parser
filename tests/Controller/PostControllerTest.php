<?php
namespace NewsParserPlugin\Tests\Controller;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Exception\MyException;

class PostControllerTest extends \WP_UnitTestCase
{
    protected $user;
    protected $post;
    protected $mockTemplateModel;
    protected $mockParser;
    protected $mockAdapter;
    
    public function setUp():void
    {
        parent::setUp();
        $this->user=$this->factory()->user->create_and_get([
            'role' => 'administrator',
        ]);
        \wp_set_current_user($this->user->ID);
       
        $this->mockTemplateModel=$mock_options_model=$this->getMockBuilder(\NewsParserPlugin\Models\TemplateModel::class)
            ->disableOriginalConstructor()
            ->onlyMethods(array('getExtraOptions','getAttributes'))
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
            ->onlyMethods(array('get','parse'))
            ->getMock();
        $this->mockAdapter=$this->getMockBuilder(\NewsParserPlugin\Utils\AdapterGuttenberg::class)
            ->disableOriginalConstructor()
            ->onlyMethods(array('convert'))
            ->getMock();
        $this->mockAdapter->method('convert')
            ->willReturn('Adapted test content');
    }
    public function tearDown():void
    {
        isset($this->user)&&wp_delete_user($this->user->ID);
        isset($this->post)&&wp_delete_post($this->post->ID);
        //parent::tearDown();
    }
    /**
     * @dataProvider dataCreate
     *
     * @return void
     */
    public function testCreate($url,$parsed_data,$expected)
    {
        $this->mockParser->method('get')
            ->willReturn($parsed_data);
        $mock_post_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\PostController::class)
            ->setConstructorArgs(
                array(
                    $this->mockParser,
                    $this->mockAdapter
                )
            )
            ->onlyMethods(array('TemplateModelsFactory'))
            ->getMock();
        $mock_post_controller->method('TemplateModelsFactory')
            ->willReturn($this->mockTemplateModel);    
        $result=$mock_post_controller->create($url,1);
        $this->post=$mock_post_controller->post;
        $expected['post_id']=$this->post->ID;
        $expected['links']['deleteLink']=get_delete_post_link($this->post->ID);

        $this->assertEquals($expected,$result);
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
                json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/noErrorRespondPost.json'),true)
            )
        );
    }
}