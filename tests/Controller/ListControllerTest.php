<?php

namespace NewsParserPlugin\Tests\Controller;

    use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
    use NewsParserPlugin\Controller\ListController;
    use NewsParserPlugin\Exception\MyException;
    use NewsParserPlugin\Utils\ResponseFormatter;


    class ListControllerTest extends \WP_UnitTestCase
    {
        public function setUp(){
            parent::setUp();
            $this->mockParser=$this->getMockBuilder(\NewsParserPlugin\Parser\Abstracts\AbstractParseContent::class)
                ->disableOriginalConstructor()
                ->setMethods(array('parse','get'))
                ->getMock();
            
        }
        /**
         * @dataProvider dataGet
         */
        public function testGet($url,$data,$expected)
        {
            $this->mockParser->method('get')
                ->willReturn($data);
            $list_controller=new ListController($this->mockParser,new ResponseFormatter);
            $result=$list_controller->get($url);
            $this->assertJsonStringEqualsJsonFile($expected,$result->get('json'));
        }
        public function dataGet(){
            return array(
                array(
                    'www.right-site.com',
                    array(
                        'listItem1',
                        'listItem2',
                        'listItem3'
                    ),
                    CONTROLLER_MOCK_DIR.'/noErrorRespondList.json'
                ),
                array(
                    'www.wrong-site.com',
                    '',
                    CONTROLLER_MOCK_DIR.'/errorRespondList.json'
                )
            );
        }
    }
