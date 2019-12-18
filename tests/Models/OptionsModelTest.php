<?php 
namespace NewsParserPlugin\Tests\Models;
use NewsParserPlugin\Models\OptionsModel;
use NewsParserPlugin\Exception\MyException;

class OptionsModelTest extends \WP_UnitTestCase
{
    protected $instance;
    protected $options=array(
        'extraOptions'=>array(),
        'template'=>array()
    );
    public function setUp()
    {
        $this->instance=new OptionsModel('www.test-site.com');
    }
    public function testSave()
    {
        //test wrong data format
        $this->expectException(\Exception::class);
        $this->instance->save(array());
        //test correct data format
        $result=$this->instance->save($this->options);
        $this->assertTrue($result);
    }
    public function testDelete()
    {
        $this->assertFalse($this->instance->delete());
        $this->instance->save($this->options);
        $this->assertTrue($this->instance->delete());
    }
    public function testGetTemplate()
    {
        $this->assertFalse($this->instance->getTemplate());
    }
    public function testGetExtraOptions()
    {
        $this->assertFalse($this->instance->getExtraOptions());
    }
    public function testGetAttributes()
    {
        $this->expectException(MyException::class);
        $this->instance->getAttributes('array');
        $this->instance->save($this->options);
        $this->assertInternalType('array',$this->instance->getAttributes('array'));
        $this->assertInternalType('string',$this->instance->getAttributes('json'));
        $this->assertInstanceOf(OptionsModel::class,$this->instance->getAttributes('object'));
    }
}