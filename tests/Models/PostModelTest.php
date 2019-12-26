<?php
namespace NewsParserPlugin\Tests\Models;
    use NewsParserPlugin\Models\PostModel;
    use NewsParserPlugin\Exception\MyException;
    class MockPostModel extends PostModel
    {
        public $result;
        public $fakeAttachmentId;

        public function mediaSideloadImage($file, $post_id = 0, $desc = null, $return = 'html'){
            $this->result=array(
                'file'=>$file,
                'post_id'=>$post_id,
                'desc'=>$desc,
                'return'=>$return
            );
            return $this->fakeAttachmentId;
        }
    }
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
            $this->assertGreaterThan(0,$this->post->ID);
            $this->assertEquals('draft',$this->post->status);
        }
        /**
         * @covers NewsParserPlugin\Models\PostModel::attachImageToPostWordpress()
         * @covers NewsParserPlugin\Models\PostModel::mediaSideloadImage()
         */
        public function testAddPostThumbnail()
        {
            $post_id=$this->factory->post->create(array(
                'post_title'=>'Test title',
                'post_content'=>'Post content',
                'post_author'=>10
            ));
            $post=MockPostModel::getPostById($post_id);
            $expected=array(
                'file'=>'http://www.site.com/image.jpeg',
                'post_id'=>$post_id,
                'desc'=>'Test image description',
                'return'=>'id'
            );
            $media_id=$this->factory->attachment->create();
            $post->fakeAttachmentId=$media_id;
            $post->addPostThumbnail($expected['file'],$expected['desc']);
            $result=$post->result;
            $this->assertSame($expected,$result);
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
