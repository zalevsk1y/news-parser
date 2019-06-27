
<?php
require 'autoload.php';
use NewsParserPlugin\PHPUnit\Framework\TestCase;
use NewsParserPlugin\Utils\ResponseFormatter;



class ResponseFormatterTest extends TestCase{
    protected $postModel;
    protected $mockData;
    protected function setUp(){
      
        $this->formatter=new ResponseFormatter();
        
    }
    public function testPostGetProp(){
        $mock_data=include('assert/mockPostData.php');
        $response=$this->formatter->post($mock_data)->message($mock_data['msg']['type'],$mock_data['msg']['text'])->get('object');
 
        $this->assertEquals($response->msg->type,$mock_data['msg']['type']);
        $this->assertEquals($response->msg->text,$mock_data['msg']['text']);

    }
    public function testListGetProp(){
        $mock_data=include('assert/mockWrongPostData.php');
        try{
            $response=$this->formatter->post($mock_data)->message('success','test ok')->get('object');
        }catch(\Exception $e){
            $this->assertEquals($e->getMessage(),'Undefined index: post_id');
        }
    }
    public function testGetReturnFormat(){
        $mock_data=include('assert/mockPostData.php');
        $response=$this->formatter->post($mock_data)->message($mock_data['msg']['type'],$mock_data['msg']['text'])->get('json');
        json_decode($response);
        $this->assertEquals(json_last_error() === JSON_ERROR_NONE,true);
    
    }   
}