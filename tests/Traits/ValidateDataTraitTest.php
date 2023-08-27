<?php
namespace NewsParserPlugin\Tests\Traits;
use NewsParserPlugin\Traits\ValidateDataTrait;

class MockValidateDataTrait 
{
    use ValidateDataTrait;
}

class ValidateDataTraitTest extends \WP_UnitTestCase
{
    protected $instance;
    public function setUp():void
    {
        // parent::setUp();
        $this->instance=new MockValidateDataTrait();
    }
    public function testValidateImageUrl()
    {
        $input='test-image.jpg';
        $result=$this->instance->validateImageUrl($input);
        $this->assertTrue($result);
    }
    public function testValidateMediaOptionsArray()
    {
        $input=array('post_id'=>1,'alt'=>'test image');
        $result=$this->instance->validateMediaOptions($input);
        $this->assertTrue($result);
    }
    /**
     * @covers NewsParserPlugin\Traits\ValidateDataTrait::checkArrayKeys()
     */
    public function testValidateExtraOptions()
    {
        $input=array(
            'addFeaturedMedia'=>'true',
            'saveParsingTemplate'=>true,
            'addSource'=>'false'
        );
        $result=$this->instance->validateMediaOptions($input);
        $this->assertTrue(is_wp_error($result));
    }
    public function testValidateTemplate()
    {
        $input=array(
            'tagName'=>'div',
            'className'=>'post-body+<=>',
            'searchTemplate'=>'div.post-body<>',
            'position'=>'all',
            'children'=>array(
                array(
                    'tagName'=>'p',
                    'searchTemplate'=>'p',
                    'position'=>'all' 
                )
            )
        );
        $result=$this->instance->validateTemplate($input);
        $this->assertTrue($result);
    }
}