
<?php
require 'autoload.php';
use NewsParserPlugin\PHPUnit\Framework\TestCase;
use NewsParserPlugin\Models\PostModel;

class PostModelTest extends TestCase{
    protected function setUp(){
        $this->mockData=require 'assert/mockParsedData.php';
        $this->postId=1;
        $this->links=array(
            'previewLink'=>'test.com/post.html',
            'editLink'=>'test.com/editPost.html',
            'deleteLink'=>'test.com/deletePost.html'
        );
        $this->post=new PostModel($this->mockData);
       
    }
    public function testCreateDraft(){ 
        function wp_insert_post($data){
            return 1;
        }
        function is_wp_error($postId){
            return false;
        }
        function wp_strip_all_tags($text){
            return $text;
        }
        function get_post_permalink($post_id){
            return 'test.com/post.html';
        }
        function get_edit_post_link($post_id,$text){
            return 'test.com/editPost.html';
        };
        function get_delete_post_link($post_id){
            return 'test.com/deletePost.html';
        };
   
        $this->post->createDraft();
        $expected_array=array(
            'title'=>$this->mockData['title'],
            'previewLink'=>$this->links['previewLink'],
            'status'=>'draft'
        );
        $this->assertEquals($this->post->getAttributes(),$expected_array);
    }

}