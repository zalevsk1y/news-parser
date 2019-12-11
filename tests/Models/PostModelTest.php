<?php
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Exception\MyException;
class PostModelTest extends \WP_UnitTestCase
{
    protected $postData;
    protected $post;
    public function setUp()
    {
        parent::setUp();
        $user=$this->factory->user->create();
        $this->postData=array(
            'title'=>'test post title.',
            'body'=>'test body.',
            'image'=>'www.test-site.com/image.jpg',
            'sourceUrl'=>'http://www.test-site.com/news/page1',
            'authorId'=>$user
        );
        $this->post=new PostModel($this->postData);
    }
    /**
     * @covers NewsParserPlugin\Models\PostModel::createPostWordPress()
     * @covers NewsParserPlugin\Models\PostModel::getPostLinksWordpress()
     */
    public function testCreateDraft()
    {    
        $this->post->createDraft();
        $this->assertGreaterThan(0,$this->post->postId);
        $this->assertEquals('draft',$this->post->status);
    }
    /**
     * @covers NewsParserPlugin\Models\PostModel::attachImageToPostWordpress()
     */
    public function testAddPostThumbnail()
    {
        $this->expectException(MyException::class);
        $this->post->addPostThumbnail();
    }
    /**
     * @covers NewsParserPlugin\Models\PostModel::updatePostWordPress()
     */
    public function testAddSource()
    {    
        $expected=$this->post->body.'<br> <a href="'.$this->post->sourceUrl.'">Source </a>';
        $this->post->addSource();
        $this->assertEquals($expected,$this->post->body);
    }
    public function testGetAttributes(){
        $result=$this->post->getAttributes('array');
        $this->assertInternalType('array',$result);
        $this->assertSame(array('title','links','status','post_id'),array_keys($result));
        $this->assertInternalType('object',$this->post->getAttributes('object'));
    }
}