<?php
use NewsParserPlugin\View\TemplateRender;
use Spatie\Snapshots\MatchesSnapshots;

/**
 * Class SliderTest
 *
 * @package MyGallery
 */

class TemplateRenderTest extends \WP_UnitTestCase
{
    use MatchesSnapshots;
    public function testRender(){
        $args=array(
            'arg0'=>'test0',
            'arg1'=>'test1',
            'arg2'=>'test2',
        );
        $templatePath=__DIR__.'/mocks/TemplateRenderMock.php';
        $template=new TemplateRender($templatePath,$args);
        ob_clean();
        $template->render();
        $content = ob_get_contents();
        ob_end_clean();
        $this->assertMatchesSnapshot($content);
    }
}