<?php
namespace NewsParserPlugin\Tests\Parser;
use NewsParserPlugin\Parser\HTMLRaw;

class MockHTMLRaw extends HTMLRaw
{
    protected $options=array('remove_scripts'=>true);
    public function parse($data)
    {
        return parent::parse($data);
    }
}
class HTMLRawTest extends \WP_UnitTestCase
{
    protected $instance;
    public function setUp()
    {
        $this->instance=new MockHTMLRaw(10);
    }
    public function testParse()
    {
        $html='<script>alert("test");</script><div class="script-wrapper">test</div>';
        $result=$this->instance->parse($html);
        $this->assertEquals('<div class="script-wrapper">test</div>',$result);
    }
}

