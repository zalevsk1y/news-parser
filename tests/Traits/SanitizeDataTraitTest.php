<?php
use NewsParserPlugin\Traits\SanitizeDataTrait;

class DummySanitizeDataTrait {
    use SanitizeDataTrait;
}

class SanitizeDataTraitTest extends WP_UnitTestCase
{
    protected $instance;
    public function setUp()
    {
        $this->instance=new DummySanitizeDataTrait();
    }
    public function testSanitizeMediaOptionsArray()
    {
        $input=array(
            'postId'=>'1abs',
            'alt'=>'Test image.'
        );
        $expected=array(
            'postId'=>1,
            'alt'=>'Test image.'
        );
        $result=$this->instance->sanitizeMediaOptionsArray($input);
        $this->assertEquals($expected,$result);
    }
    public function testSanitizeExtraOptions()
    {
        $input=array(
            'addFeaturedMedia'=>'true',
            'saveParsingTemplate'=>true,
            'addSource'=>'false'
        );
        $expected=array(
            'addFeaturedMedia'=>true,
            'saveParsingTemplate'=>true,
            'addSource'=>false
        );
        $result=$this->instance->sanitizeExtraOptions($input);
        $this->assertEquals($expected,$result);
    }
    /**
     * @covers NewsParserPlugin\Traits\SanitizeDataTrait::sanitizeTemplateElement()
     */
    public function testSanitizeTemplate()
    {
        $input=array(
            'tagName'=>'div',
            'className'=>'post-body+<=>',
            'searchTemplate'=>'div.post-body<>',
            'position'=>'all',
            'children'=>array(
                array(
                    'tagName'=>'p',
                    'className'=>false,
                    'searchTemplate'=>'p',
                    'position'=>'all' 
                )
            )
        );
        $expected=array(
            'tagName'=>'div',
            'className'=>'post-body',
            'searchTemplate'=>'div.post-body',
            'position'=>'all',
            'children'=>array(
                array(
                    'tagName'=>'p',
                    'className'=>false,
                    'searchTemplate'=>'p',
                    'position'=>'all' 
                )
            )
        );
        $result=$this->instance->sanitizeTemplate($input);
        $this->assertEquals($expected,$result);
    }
}   