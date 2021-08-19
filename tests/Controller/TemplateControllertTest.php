<?php
namespace NewsParserPlugin\Tests\Controller;

    use NewsParserPlugin\Controller\TemplateController;
    use NewsParserPlugin\Utils\ResponseFormatter;

    class TemplateControllerTest extends \WP_UnitTestCase
    {
        /**
         * @dataProvider dataCreate
         */
        public function testCreate($options,$expected){
            $options_controller=new TemplateController(new ResponseFormatter());
            $url='http://www.site.com/feed/rss';
            $result=$options_controller->create($url,$options);
            $this->assertJsonStringEqualsJsonFile($expected,$result->get('json'));
        }
        public function dataCreate(){
            return array(
                array(array('extraOptions'=>true,'template'=>true),CONTROLLER_MOCK_DIR.'/noErrorRespondOptions.json'),
                array(array(),CONTROLLER_MOCK_DIR.'/errorRespondOptions.json')
            );
        }
    }
