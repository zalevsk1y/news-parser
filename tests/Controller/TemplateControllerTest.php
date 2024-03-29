<?php
namespace NewsParserPlugin\Tests\Controller;

    use NewsParserPlugin\Controller\TemplateController;
    use NewsParserPlugin\Models\TemplateModelWithPostOptions as TemplateModel;

    class TemplateControllerTest extends \WP_UnitTestCase
    {
        protected $templateId='http://www.site.com/feed/rss';
        protected $templateController;
        protected $templateModelMock;
        public function setUp():void
        {
            parent::setUp();
            $this->templateController=$this->getMockBuilder(\NewsParserPlugin\Controller\TemplateController::class)
            ->onlyMethods(array('modelsFactory','getAll'))
            ->getMock();
            $this->templateModelMock=$this->getMockBuilder(\NewsParserPlugin\Models\TemplateModel::class)
            ->disableOriginalConstructor()
            ->onlyMethods(array('create','getAttributes'))
            ->getMock();
            $this->templateController->method('modelsFactory')
            ->willReturn($this->templateModelMock);
        }   
        /**
         * @dataProvider dataCreate
         */
        public function testCreate($options,$expected){
            $this->templateModelMock->expects($this->once())
            ->method('getAttributes')
            ->willReturn($expected);
            $template_model_data=$this->templateController->create($options);
            $this->assertEquals($expected,$template_model_data);
        }
         /**
         * @dataProvider dataGet
         */
        public function testGet($templateId,$options,$expected){
            $this->templateModelMock->method('getAttributes')
            ->willReturn($expected);
            $this->templateController
            ->method('getAll')
            ->willReturn($options);
            $template_model_data=$this->templateController->get($templateId);
            $this->assertEquals($expected,$template_model_data);
        }
        public function dataCreate(){
            return array(
                array(

                    array($this->templateId=>array('extraOptions'=>true,'template'=>true,'url'=>$this->templateId)),
                    array('extraOptions'=>true,'template'=>true,'url'=>$this->templateId)
                ),
            );
        }
        public function dataGet(){
            return array(
                array(
                    $this->templateId,
                    array($this->templateId=>array('extraOptions'=>true,'template'=>true,'url'=>$this->templateId)),
                    array('extraOptions'=>true,'template'=>true,'url'=>$this->templateId)
                ),
                array(
                    null,
                    array($this->templateId=>array('extraOptions'=>true,'template'=>true,'url'=>$this->templateId)),
                    false
                ),
                array(
                    $this->templateId,
                    array(),
                    false
                ),
            );
        }
    }
