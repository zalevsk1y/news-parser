<?php
namespace NewsParserPlugin\Tests\Parser;
use NewsParserPlugin\Parser\HTMLRaw;

class MockHTMLRaw extends HTMLRaw
{
    public function __construct($expiration_time)
    {
        parent::__construct($expiration_time);
    }
    public function parse($data,$options)
    {
        return parent::parse($data,$options);
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
        $result=$this->instance->parse($html,array('remove_scripts'=>true));
        $this->assertEquals('<div class="script-wrapper">test</div>',$result);
    }
}

