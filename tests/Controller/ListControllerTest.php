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
    use NewsParserPlugin\Controller\ListController;
    use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
    use NewsParserPlugin\Exception\MyException;

    class DummyListParser extends AbstractParseContent
    {
        public function __construct($exp)
        {
            parent::__construct($exp);
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
         * @dataProvider getData
         */
        public function testGet($url,$expected)
        {
            $list_controller=new ListController(new DummyListParser(10));
            $result=$list_controller->get($url);
            $this->assertJsonStringEqualsJsonFile($expected,$result);
        }
        public function getData(){
            return array(
                array('www.right-site.com',CONTROLLER_MOCK_DIR.'/noErrorRespondList.json'),
                array('www.wrong-site.com',CONTROLLER_MOCK_DIR.'/errorRespondList.json')
            );
        }
    }
}