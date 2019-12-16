<?php
namespace NewsParserPlugin\Utils
{
    /**
     * Stub to avoid timestamp.
     *
     * @return void
     */
    if (!function_exists('NewsParserPlugin\Utils\time')){
        function time(){
            return 123456789;
        }
    }
}
namespace NewsParserPlugin\Tests
{
    use NewsParserPlugin\Controller\OptionsController;
    use NewsParserPlugin\Utils\ResponseFormatter;

    class OptionsControllerTest extends \WP_UnitTestCase
    {
        /**
         * @dataProvider saveDataProvider
         */
        public function testSave($options,$expected){
            $options_controller=new OptionsController(new ResponseFormatter());
            $url='http://www.site.com/feed/rss';
            $result=$options_controller->save($url,$options);
            $this->assertJsonStringEqualsJsonFile($expected,$result);
        }
        public function saveDataProvider(){
            return array(
                array(array('extraOptions'=>true,'template'=>true),CONTROLLER_MOCK_DIR.'/noErrorRespondOptions.json'),
                array(array(),CONTROLLER_MOCK_DIR.'/errorRespondOptions.json')
            );
        }
    }
}