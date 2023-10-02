<?php
namespace NewsParserPlugin\Tests\Utils;
use NewsParserPlugin\Utils\AdapterGuttenberg;



class AdapterGuttenbergTest extends \WP_UnitTestCase
{
    protected $instance;
    public function setUp():void
    {
        // parent::setUp();
        $this->instance=new AdapterGuttenberg();
    }
    /**
     * @dataProvider dataBlocks
     * 
     * @covers NewsParserPlugin\Utils\AdapterGuttenberg::convert()
     * @covers NewsParserPlugin\Utils\AdapterGuttenberg::youtubeVideo()
     * @covers NewsParserPlugin\Utils\AdapterGuttenberg::heading()
     * @covers NewsParserPlugin\Utils\AdapterGuttenberg::paragraph()
     * @covers NewsParserPlugin\Utils\AdapterGuttenberg::simpleText()
     * @covers NewsParserPlugin\Utils\AdapterGuttenberg::image()
     * @covers NewsParserPlugin\Utils\AdapterGuttenberg::listBlock()
     */
    public function testCreateGutenbergBlocks($el,$expected)
    {
        $result=$this->instance->convert($el);
        $this->assertEquals($expected,$result);
    }
    public function  dataBlocks()
    {
        $blocks=json_decode(file_get_contents(UTILS_MOCK_DIR.'/AdapterGuttenbergMocks.json'),true);
        return $blocks;
    }

}