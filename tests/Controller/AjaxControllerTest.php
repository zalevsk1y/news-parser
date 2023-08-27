<?php
namespace NewsParserPlugin\Tests\Controller{
    use NewsParserPlugin\Controller\AjaxController;
    use NewsParserPlugin\Utils\ResponseFormatter;
    
    class MockAjaxController extends AjaxController
    {
        protected $formatter;
        public function __construct($event)
        {
            parent::__construct($event); 
            $this->formatter==new ResponseFormatter();
        }
    

    }
    class AjaxControllerTest extends \WP_UnitTestCase
    {
        protected $instance;
        protected $event;
        protected $responseFormatter;

        public function setUp():void
        {
            parent::setUp();
            $this->event=$this->getMockBuilder(\NewsParserPlugin\Interfaces\EventControllerInterface::class)
                ->disableOriginalConstructor()
                ->onlyMethods(array('trigger','on','off'))
                ->getMock();
            $admin=$this->factory()->user->create_and_get();
            wp_set_current_user($admin->ID);
            $_REQUEST['_wpnonce']=wp_create_nonce('parsing_news_api');
        }
        public function tearDown():void
        {
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
        public function setUpMockController($event,$input,$expected)
        {
            extract($expected);
            $event_controller=clone $this->event;
            $event_controller->expects($this->once())
                ->method('trigger')
                ->with($this->equalTo($event),$this->equalTo($triggerExpected))
                ->willReturn($formatterExpected);
            $mock_ajax_controller=$this->getMockBuilder(MockAjaxController::class)
                ->setConstructorArgs(array($event_controller))
                ->onlyMethods(array('getJsonFromInput','sendResponse'))
                ->getMock();
            $mock_ajax_controller->expects($this->once())
                ->method('sendResponse')
                ->with($this->equalTo($sendResponseExpected));
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