<?php
namespace NewsParserPlugin\Tests\Controller{
    use NewsParserPlugin\Controller\AjaxController;
    use NewsParserPlugin\Factory\ControllersFactory;
    use NewsParserPlugin\Controller\VisualConstructorController;

    class MockAjaxController extends AjaxController
    {
        public function __construct($event)
        {
            parent::__construct($event); 
        }
    

    }
    class AjaxControllerTest extends \WP_UnitTestCase
    {
        protected $instance;
        protected $event;

        public function setUp()
        {
            parent::setUp();
            $this->event=$this->getMockBuilder(\NewsParserPlugin\Interfaces\EventControllerInterface::class)
                ->disableOriginalConstructor()
                ->setMethods(array('trigger','on','off'))
                ->getMock();
            $admin=$this->factory->user->create_and_get();
            wp_set_current_user($admin->ID);
            $_REQUEST['_wpnonce']=wp_create_nonce('parsing_news_api');
        }
        public function tearDown(){
            $_REQUEST=array();
            $_GET=array();
        }
        public function testMediaApi()
        {
            $event='media:create';
            $input=json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/mediaApiRequest.json'),true);
            $expected=json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/mediaApiExpected.json'),true);
            $mock_ajax_controller=$this->setUpMockController($event,$input,$expected);
            $mock_ajax_controller->mediaApi();
        }
        public function testOptionsApi()
        {
            $event='options:create';
            $input= json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/optionsApiRequest.json'),true);
            $expected=json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/optionsApiExpected.json'),true);
            $mock_ajax_controller=$this->setUpMockController($event,$input,$expected);
            $mock_ajax_controller->optionsApi();
        }
        /**
         * @dataProvider dataParsingApi
         *
         */
        public function testParsingApi($event,$input,$expected)
        {
            $_GET['url']=$input['url'];
            $_GET['status']=$input['status'];
            $mock_ajax_controller=$this->setUpMockController($event,$input,$expected);
            $mock_ajax_controller->parsingApi();

        }
        public function setUpMockController($event,$input,$expected){
            $event_controller=clone $this->event;
            $event_controller->expects($this->once())
                ->method('trigger')
                ->with($this->equalTo($event),$this->equalTo($expected));
            $mock_ajax_controller=$this->getMockBuilder(MockAjaxController::class)
                ->setConstructorArgs(array($event_controller))
                ->setMethods(array('getJsonFromInput'))
                ->getMock();
            $mock_ajax_controller->method('getJsonFromInput')
                ->willReturn($input);
            return $mock_ajax_controller;
        }
        public function dataParsingApi(){
            return array(
                array(
                    'list:get',
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/listApiRequest.json'),true),
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/listApiExpected.json'),true)
                ),
                array(
                    'html:get',
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/htmlApiRequest.json'),true),
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/htmlApiExpected.json'),true)
                ),
                array(
                    'post:create',
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/postApiRequest.json'),true),
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/postApiExpected.json'),true)
                )    
            );
        }
    }
    }