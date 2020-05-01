<?php 
namespace NewsParserPlugin\Tests\Models;
use NewsParserPlugin\Models\TemplateModel;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;

class TemplateModelTest extends \WP_UnitTestCase
{
    protected $options=array(
        'extraOptions'=>array(),
        'template'=>array(),
        'url'=>'www.test-site.com'
    );
    protected $templateModel;
    public function setUp():void
    {
        parent::setUp();
        $this->templateModel=$this->getMockBuilder(\NewsParserPlugin\Models\TemplateModel::class)
        ->setConstructorArgs(array($this->options)) 
        ->onlyMethods(array('updateOptions','getAll'))
        ->getMock();
    }
    public function testIsOptionsValid()
    {
         //test wrong data format
         $this->expectException(MyException::class);
         $this->expectExceptionMessage(Errors::text('OPTIONS_WRONG_FORMAT'));
         new TemplateModel( array('template'=>true,'extraOptions'=>true));
    }
    public function testCreate()
    {
        //test correct data format
        $templates=array($this->options['url']=>$this->options);
        $this->templateModel->expects($this->once())
        ->method('updateOptions')
        ->with($this->equalTo(NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME,$templates,'no'));
        $this->templateModel->create();
    }
    public function testGetTemplate()
    {
        $this->assertEquals($this->options['template'],$this->templateModel->getTemplate());
    }
    public function testGetExtraOptions()
    {
        $this->assertEquals($this->options['extraOptions'],$this->templateModel->getTemplate());
    }
    public function testGetAttributes()
    {
        $this->assertIsArray($this->templateModel->getAttributes('array'));
        $this->assertIsString($this->templateModel->getAttributes('json'));
        $this->assertInstanceOf(TemplateModel::class,$this->templateModel->getAttributes('object'));
    }
}