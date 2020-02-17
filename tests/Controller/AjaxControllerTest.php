<?php
namespace NewsParserPlugin\Tests\Controller{
    use NewsParserPlugin\Controller\AjaxController;
    
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
      
        /**
         * @dataProvider dataParsingApi
         *
         */
        public function testParsingApi($event,$input,$expected,$method)
        {
            $mock_ajax_controller=$this->setUpMockController($event,$input,$expected);
            call_user_func(array($mock_ajax_controller,$method));
        }
        public function setUpMockController($event,$input,$expected){
            $event_controller=clone $this->event;
            $event_controller->expects($this->once())
                ->method('trigger')
                ->with($this->equalTo($event),$this->equalTo($expected));
            $mock_ajax_controller=$this->getMockBuilder(MockAjaxController::class)
                ->setConstructorArgs(array($event_controller))
                ->setMethods(array('getJsonFromInput','sendResponse'))
                ->getMock();
            $mock_ajax_controller->method('getJsonFromInput')
                ->willReturn($input);
            return $mock_ajax_controller;
        }
        public function dataParsingApi(){
            return array(
                array(
                    'media:create',
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/mediaApiRequest.json'),true),
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/mediaApiExpected.json'),true),
                    'mediaApi'
                ),
                array(
                    'template:create',
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/templateApiRequest.json'),true),
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/templateApiExpected.json'),true),
                    'templateApi'
                ),
                array(
                    'list:get',
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/listApiRequest.json'),true),
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/listApiExpected.json'),true),
                    'parsingListApi'
                ),
                array(
                    'html:get',
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/htmlApiRequest.json'),true),
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/htmlApiExpected.json'),true),
                    'parsingHTMLApi'
                ),
                array(
                    'post:create',
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/postApiRequest.json'),true),
                    json_decode(file_get_contents(CONTROLLER_MOCK_DIR.'/postApiExpected.json'),true),
                    'parsingPageApi'
                )    
            );
        }
    }
    }