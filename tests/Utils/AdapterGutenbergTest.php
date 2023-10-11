<?php
namespace NewsParserPlugin\Tests\Utils;
use NewsParserPlugin\Utils\AdapterGutenberg;



class AdapterGutenbergTest extends \WP_UnitTestCase
{
    protected $instance;
    public function setUp()
    {
        parent::setUp();
        $this->instance=new AdapterGutenberg();
    }
    /**
     * @dataProvider dataBlocks
     * 
     * @covers NewsParserPlugin\Utils\AdapterGutenberg::convert()
     * @covers NewsParserPlugin\Utils\AdapterGutenberg::youtubeVideo()
     * @covers NewsParserPlugin\Utils\AdapterGutenberg::heading()
     * @covers NewsParserPlugin\Utils\AdapterGutenberg::paragraph()
     * @covers NewsParserPlugin\Utils\AdapterGutenberg::simpleText()
     * @covers NewsParserPlugin\Utils\AdapterGutenberg::image()
     * @covers NewsParserPlugin\Utils\AdapterGutenberg::listBlock()
     */
    public function testCreateGutenbergBlocks($el,$expected)
    {
        $result=$this->instance->convert($el);
        $this->assertEquals($expected,$result);
    }
    public function  dataBlocks()
    {
        $blocks=json_decode(file_get_contents(UTILS_MOCK_DIR.'/adapterGutenbergMocks.json'),true);
        return $blocks;
    }

}