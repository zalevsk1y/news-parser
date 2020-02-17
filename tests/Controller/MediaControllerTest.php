<?php
namespace NewsParserPlugin\Tests\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Controller\MediaController;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Utils\ResponseFormatter;

class MediaControllerTest extends \WP_UnitTestCase
{
    /**
     * @dataProvider dataCreate
     *
     */
    public function testCreate($args,$expected){
        extract($args);
        $post_id=!is_null($post_id)?:$this->factory->post->create_and_get(array('post_author'=>10))->ID;
        $mock_post_model=$this->getMockBuilder(\NewsParserPlugin\Models\PostModel::class)
            ->setMethods(array('addPostThumbnail'))
            ->setConstructorArgs( array(
                array(
                'title'=>'Test post title',
                'body'=>'Test post content.',
                'authorId'=>1
                )))
            ->getMock();
        $mock_media_controller=$this->getMockBuilder(\NewsParserPlugin\Controller\MediaController::class)
            ->setConstructorArgs(array(new ResponseFormatter()))        
            ->setMethods(array('postModelsFactory'))
            ->getMock();
        $mock_media_controller->method('postModelsFactory')
            ->willReturn($mock_post_model::getPostById($post_id));
        $result=$mock_media_controller->create($url,$post_id,$alt);
        $this->assertJsonStringEqualsJsonFile($expected,$result->get('json'));
    }
    public function dataCreate(){
  
        return array(
            array(array(
                'url'=>'http://www.site.com/image.jpeg',
                'post_id'=>null,
                'alt'=>'Test image'),
                CONTROLLER_MOCK_DIR.'/noErrorRespondMediaController.json'),
            array(array(
                'url'=>'http://www.site.com/image.jpeg',
                'post_id'=>110,
                'alt'=>'Test image')
                ,CONTROLLER_MOCK_DIR.'/errorRespondMediaController.json')
        );
    }
}