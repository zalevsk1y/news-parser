<?php
use NewsParserPlugin\View\TemplateRender;

class TemplateRenderTest extends \WP_UnitTestCase
{
    public function testWrongPath()
    {
        $this->expectException(\Exception::class);
        new TemplateRender('wrong-template-path.php');
    }
    public function testRender(){
        $template_path=VIEW_MOCK_DIR.'/RenderTemplateMock.php';
        $expected=file_get_contents(VIEW_MOCK_DIR.'/RenderTemplateSnapshot.html');
        $args=array(
            'class_name'=>'test-class',
            'inner_text'=>'test text'
        );
        $template=new TemplateRender($template_path,$args);
        
        $result=$template->render(false);
        $this->assertEquals($expected,$result);
    }
}