<?php
namespace NewsParserPlugin\Tests\Utils;
use NewsParserPlugin\Utils\MenuConfig;

class MenuConfigTest extends \WP_UnitTestCase
{
    protected $configWrongPath = UTILS_MOCK_DIR.'/menu-config-wrong.php';
    protected $configPath = UTILS_MOCK_DIR.'/menu-config.php';
    public function testWrongPath()
    {
        $wrong_path = UTILS_MOCK_DIR.'/menu-config-wrong-path.php';
        $this->expectException('Exception');
        $this->expectExceptionMessage('Cannot load template file ' . $wrong_path);
        new MenuConfig($wrong_path);
    }
    public function testWrongFormat()
    {
        $this->expectException('Exception');
        $this->expectExceptionMessage('Wrong sub menu config file format.No needed keys in config file "parent_slug"');
        new MenuConfig($this->configWrongPath);
    }
    /**
     * @dataProvider dataTestGet
     */
    public function testGet($type,$expected){
        $config=new MenuConfig($this->configPath);
        $result=$config->get($type);
        $this->assertEquals($expected,gettype($result));
    }
    public function dataTestGet(){
        return array(
            array('array','array'),
            array('object','object'),
            array('json','string')
        );
    }
}
