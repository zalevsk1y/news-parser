<?php

namespace NewsParserPlugin\Tests\Controller;

    use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
    use NewsParserPlugin\Controller\ListController;
    use NewsParserPlugin\Exception\MyException;
    use NewsParserPlugin\Utils\ResponseFormatter;

    class MockListParser extends AbstractParseContent
    {
        public function __construct()
        {
            parent::__construct(10);
        }
        protected function parse ($data,$options){}
        public function get($url,$options=array())
        {
            switch ($url){
                case 'www.right-site.com':
                    return array(
                        'listItem1',
                        'listItem2',
                        'listItem3'
                    );
                case 'www.wrong-site.com':
                    throw new MyException('XML file could not be downloaded');
            }
        }
    }

    class ListControllerTest extends \WP_UnitTestCase
    {
        /**
         * @dataProvider dataGet
         */
        public function testGet($url,$expected)
        {
            $list_controller=new ListController(new MockListParser(10),new ResponseFormatter);
            $result=$list_controller->get($url);
            $this->assertJsonStringEqualsJsonFile($expected,$result);
        }
        public function dataGet(){
            return array(
                array('www.right-site.com',CONTROLLER_MOCK_DIR.'/noErrorRespondList.json'),
                array('www.wrong-site.com',CONTROLLER_MOCK_DIR.'/errorRespondList.json')
            );
        }
    }
