<?php
namespace NewsParserPlugin\Tests\Controller;
use NewsParserPlugin\Controller\AjaxController;
use NewsParserPlugin\Factory\ControllersFactory;
use NewsParserPlugin\Controller\VisualConstructorController;

class MockAjaxController extends AjaxController
{
    public function __construct($controllersFactory)
    {
        $this->controllersFactory=$controllersFactory;    
    }

    protected function getJsonFromInput()
    {
        return $_POST['ajax_controller_text'];
    }
}
class AjaxControllerTest extends \WP_Ajax_UnitTestCase
{
    protected $mediaRequest;
    protected $optionsRequest;
    protected $controllersFactory;
    protected $testEchoOutput='Test echo message';
    public function setUp()
    {
        parent::setUp();
        $this->mediaRequest=json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/mediaApiRequest.json'),true);
        $this->optionsRequest=json_decode(file_get_contents(PARSER_MOCK_DIR.'/parsingOptions.json'),true);
        $this->controllersFactory=$this->getMockBuilder(\NewsParserPlugin\Factory\ControllersFactory::class)
            ->disableOriginalConstructor()
            ->getMock();
        /*
        $mock_visual_constructor_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\VisualConstructorController::class)
            ->disableOriginalConstructor()
            ->setMethods(['saveMedia','getRawHTML'])
            ->getMock();
        $mock_visual_constructor_controller->expects($this->once())
            ->method('saveMedia')
            ->with($this->equalTo($this->mediaRequest['url']),$this->equalTo($this->mediaRequest['options']['postId']),$this->equalTo($this->mediaRequest['options']['alt']));
        $mock_visual_constructor_controller->expects($this->once())
            ->method('getRawHTML')
            ->with($this->equalTo($this->sourceUrl));
        $mock_options_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\OptionsController::class)
            ->disableOriginalConstructor()
            ->getMock()
            ->expects($this->once())
            ->method('save')
            ->with($this->equalTo($this->optionsRequest['url']),$this->equalTo(array_slice($this->optionsRequest,1,2)));
        $mock_list_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\ListController::class)
            ->disableOriginalConstructor()
            ->getMock()
            ->expects($this->once())
            ->method('get')
            ->with($this->equalTo($this->sourceUrl));
        $mock_post_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\PostController::class)
            ->disableOriginalConstructor()
            ->getMock()
            ->expects($this->once())
            ->method('get')
            ->with($this->equalTo($this->sourceUrl));
        $stub_controller_factory=$this->createMock(\NewsParserPlugin\Factory\ControllersFactory::class);
        $map_controllers=array(
            array('list',$mock_list_controller),
            array('visual',$mock_visual_constructor_controller),
            array('post',$mock_post_controller),
            array('options',$mock_options_controller)
        );
        $stub_controller_factory->method('getInstance')
            ->will($this->returnValueMap($map_controllers));
      //  $this->instance=MockAjaxController::getInstance($stub_controller_factory);
     */
        $admin=$this->factory->user->create_and_get();
        wp_set_current_user($admin->ID);
        $_REQUEST['_wpnonce']=wp_create_nonce('parsing_news_api');
    }

    public function testMediaApi()
    {
        $_POST['ajax_controller_text']=$this->mediaRequest;
        $controllers_factory=clone $this->controllersFactory;
        $visual_constructor_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\VisualConstructorController::class)
            ->disableOriginalConstructor()
            ->getMock();
        $visual_constructor_controller->expects($this->once())
            ->method('saveMedia')
            ->with($this->equalTo($this->mediaRequest['url']),$this->equalTo($this->mediaRequest['options']['postId']),$this->equalTo($this->mediaRequest['options']['alt']));
        $controllers_factory->method('visual')
            ->willReturn($visual_constructor_controller);
        $instance=new MockAjaxController($controllers_factory);
        try{
            $instance->mediaApi();
        }catch(\WPAjaxDieStopException $e){}
    }
    public function testOptionsApi()
    {
        $_POST['ajax_controller_text']=$this->optionsRequest;
        $controllers_factory=clone $this->controllersFactory;
        $options_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\OptionsController::class)
            ->disableOriginalConstructor()
            ->getMock();
        $options_controller->expects($this->once())
            ->method('save')
            ->with($this->equalTo($this->optionsRequest['url']),$this->equalTo(array_slice($this->optionsRequest,1,2)));
        $controllers_factory->method('option')
            ->willReturn($options_controller);
        $instance=new MockAjaxController($controllers_factory);
        try{
            $instance->optionsApi();
        }catch(\WPAjaxDieStopException $e){}
    }
    public function testParsingApi()
    {
        $_POST['ajax_controller_text']=$this->optionsRequest;
        $_GET['status']='list';
        $_GET['url']='http://www.site.com/feed/rss';
        $controllers_factory=clone $this->controllersFactory;
        $list_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\ListController::class)
            ->disableOriginalConstructor()
            ->getMock();
        $list_controller->expects($this->once())
            ->method('get')
            ->with($this->equalTo($_GET['url']));
        $controllers_factory->method('rssList')
            ->willReturn($list_controller);
        $instance=new MockAjaxController($controllers_factory);
        try{
            $instance->parsingApi();
        }catch(\WPAjaxDieStopException $e){}
    }
}