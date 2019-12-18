<?php
namespace NewsParserPlugin\Tests\Traits;
use NewsParserPlugin\Traits\AdapterGutenbergTrait;

class DummyAdapterGutenberg
{
    use AdapterGutenbergTrait;
    public function testGutenbergBlocks($data){
        return $this->createGutenbergBlocks($data);
    }
}

class AdapterGutenbergTraitTest extends \WP_UnitTestCase
{
    protected $instance;
    public function setUp()
    {
        $this->instance=new DummyAdapterGutenberg();
    }
    /**
     * @dataProvider dataBlocks
     * 
     * @covers NewsParserPlugin\Traits\AdapterGutenbergTrait::createGutenbergBlocks()
     * @covers NewsParserPlugin\Traits\AdapterGutenbergTrait::youtubeVideo()
     * @covers NewsParserPlugin\Traits\AdapterGutenbergTrait::heading()
     * @covers NewsParserPlugin\Traits\AdapterGutenbergTrait::paragraph()
     * @covers NewsParserPlugin\Traits\AdapterGutenbergTrait::simpleText()
     * @covers NewsParserPlugin\Traits\AdapterGutenbergTrait::image()
     * @covers NewsParserPlugin\Traits\AdapterGutenbergTrait::listBlock()
     */
    public function testCreateGutenbergBlocks($el,$expected)
    {
        $result=$this->instance->testGutenbergBlocks($el);
        $this->assertEquals($expected,$result);
    }
    public function  dataBlocks()
    {
        $blocks=json_decode(file_get_contents(TRAITS_MOCK_DIR.'/adapterGutenbergTraitMocks.json'),true);
        return $blocks;
    }

}