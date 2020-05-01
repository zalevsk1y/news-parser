<?php
namespace NewsParserPlugin\Tests\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Controller\MediaController;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Message\Errors;

class MediaControllerTest extends \WP_UnitTestCase
{
    protected $mockPostModel;
    protected $mockMediaController;
    public function setUp():void
    {
        parent::setUp();
        $this->mockPostModel=$this->getMockBuilder(\NewsParserPlugin\Models\PostModel::class)
        ->setConstructorArgs( array(
            array(
            'title'=>'Test post title',
            'body'=>'Test post content.',
            'authorId'=>1
            )))
        ->onlyMethods(array('addPostThumbnail'))
        ->getMock();
        $this->mockMediaController=$this->getMockBuilder(\NewsParserPlugin\Controller\MediaController::class)     
        ->onlyMethods(array('postModelsFactory'))
        ->getMock();
    }
    /**
     * @dataProvider dataCreate
     *
     */
    public function testCreate($args,$expected)
    {
        extract($args);
        $this->mockMediaController->expects($this->once())
            ->method('postModelsFactory')
            ->with($this->equalTo($post_id))
            ->willReturn($this->mockPostModel);
        $this->mockPostModel->expects($this->once())
            ->method('addPostThumbnail')
            ->with($this->equalTo($url),$this->equalTo($alt))
            ->willReturn($media_id);
        $result=$this->mockMediaController->create($url,$post_id,$alt);
        $this->assertEquals($expected,$result);
    }
    /**
     * @dataProvider dataCreateError
     *
     */
    public function testCreateError($args,$expected)
    {
        extract($args);
        $this->mockMediaController->expects($this->once())
            ->method('postModelsFactory')
            ->with($this->equalTo($post_id))
            ->willReturn(false);
            $this->expectException(MyException::class);
            $this->expectExceptionMessage($expected);
        $result=$this->mockMediaController->create($url,$post_id,$alt);
    }
    public function dataCreate()
    {
        return array(
            array(array(
                'url'=>'http://www.site.com/image.jpeg',
                'post_id'=>1,
                'alt'=>'Test image',
                'media_id'=>10
            ),
                10)
        );
    }
    public function dataCreateError()
    {
        return array(
            array(array(
                'url'=>'http://www.site.com/image.jpeg',
                'post_id'=>110,
                'alt'=>'Test image'),
                Errors::text('WRONG_POST_ID')
            )
        );
    }
}