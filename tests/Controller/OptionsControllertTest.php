<?php
namespace NewsParserPlugin\Tests\Controller;

    use NewsParserPlugin\Controller\OptionsController;
    use NewsParserPlugin\Utils\ResponseFormatter;

    class OptionsControllerTest extends \WP_UnitTestCase
    {
        /**
         * @dataProvider dataSave
         */
        public function testSave($options,$expected){
            $options_controller=new OptionsController(new ResponseFormatter());
            $url='http://www.site.com/feed/rss';
            $result=$options_controller->save($url,$options);
            $this->assertJsonStringEqualsJsonFile($expected,$result);
        }
        public function dataSave(){
            return array(
                array(array('extraOptions'=>true,'template'=>true),CONTROLLER_MOCK_DIR.'/noErrorRespondOptions.json'),
                array(array(),CONTROLLER_MOCK_DIR.'/errorRespondOptions.json')
            );
        }
    }
