<?php
namespace NewsParserPlugin\Tests\Models;
    use NewsParserPlugin\Models\PostModel;
    use NewsParserPlugin\Exception\MyException;
 
    class PostModelTest extends \WP_UnitTestCase
    {
        protected $user;
        protected $postData;
        protected $post;
        public function setUp()
        {
            parent::setUp();
            $this->user=$this->factory->user->create_and_get();
            $this->postData=array(
                'title'=>'test post title.',
                'body'=>'test body.',
                'image'=>'www.test-site.com/image.jpg',
                'sourceUrl'=>'http://www.test-site.com/news/page1',
                'authorId'=>$this->user->ID
            );

            $this->post=$this->getMockBuilder(\NewsParserPlugin\Models\PostModel::class)
                ->setConstructorArgs(array($this->postData))
                ->setMethods(array('mediaSideloadImage'))
                ->getMock();
        }
        public function tearDown()
        {
            isset($this->user->ID)&&wp_delete_user($this->user->ID);
            isset($this->post->ID)&&wp_delete_post($this->post->ID);
            parent::tearDown();
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
         * @dataProvider dataAddPostThumbnail
         * @covers NewsParserPlugin\Models\PostModel::attachImageToPostWordpress()
         * @covers NewsParserPlugin\Models\PostModel::mediaSideloadImage()
         */
        public function testAddPostThumbnail($media_id,$expected)
        {
            $this->post->expects($this->once())
                ->method('mediaSideloadImage')
                ->with(
                    $this->equalTo('http://www.site.com/image.jpeg'),
                    $this->equalTo($this->post->ID),
                    $this->equalTo('Test image.'),
                    $this->equalTo('id')
                )
                ->willReturn($media_id);
            is_wp_error($media_id)&&$this->expectException($expected);
            $result=$this->post->addPostThumbnail('http://www.site.com/image.jpeg','Test image.');
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
        public function dataAddPostThumbnail()
        {
            return array(
                array(1,1),
                array(new \WP_Error('Test error message.'),'NewsParserPlugin\Exception\MyException')
            );
        }
    }
