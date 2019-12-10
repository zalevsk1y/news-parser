<?php
use NewsParserPlugin\Traits\ValidateDataTrait;

class DummyValidateDataTrait 
{
    use ValidateDataTrait;
}

class ValidateDataTraitTest extends WP_UnitTestCase
{
    protected $instance;
    public function setUp()
    {
        $this->instance=new DummyValidateDataTrait();
    }
    public function testValidateImageUrl()
    {
        $input='test-image.jpg';
        $expected='test-image.jpg';
        $result=$this->instance->validateImageUrl($input);
        $this->assertEquals($expected,$result);
    }
    public function testValidateMediaOptionsArray()
    {
        $input=array('postId'=>1,'alt'=>'test image');
        $expected=true;
        $result=$this->instance->validateMediaOptionsArray($input);
        $this->assertEquals($expected,$result);
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
        $expected=false;
        $result=$this->instance->validateMediaOptionsArray($input);
        $this->assertEquals($expected,$result);
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
        $expected=true;
        $result=$this->instance->validateTemplate($input);
        $this->assertEquals($expected,$result);
    }
}