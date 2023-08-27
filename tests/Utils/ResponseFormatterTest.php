<?php
namespace NewsParserPlugin\Tests\Utils;
use NewsParserPlugin\Utils\ResponseFormatter;

class ResponseFormatterTest extends \WP_UnitTestCase{
    protected $instance;
    protected $data=array();
    
    public function setUp():void
    {
        $this->instance=new ResponseFormatter();
    }
    public function testPost()
    {
        $post_data=array(
            'post_id'=>1,
            'status'=>'parsed',
            'links'=>array(
                'editLink'=>'www.my-site.com/edit.php'
            )
        );
        $expected=array_merge($this->data,array('data'=>array(
                    'post_id'=>1,
                    'status'=>'parsed',
                    'editLink'=>'www.my-site.com/edit.php'
                )
            ));
        $result=$this->instance->post($post_data)->get('array');
        $this->assertEquals($expected,$result);
    }
    public function testRss()
    {
        $list_data=array('item1'=>1);
        $expected=array_merge($this->data,array('data'=>$list_data));
        $result=$this->instance->rss($list_data)->get('array');
        $this->assertEquals($expected,$result);
    }
    public function testDialog()
    {
        $dialog_type='visualConstructor';
        $data=array('item'=>'test');
        $expected=array_merge($this->data,array('data'=>array('type'=>$dialog_type,'dialogData'=>$data)));
        $result=$this->instance->dialog($dialog_type,$data)->get('array');
        $this->assertEquals($expected,$result);
    }
    public function testRawHTML()
    {
        $html=esc_html('<html></html>');
        $expected=array_merge($this->data,array('data'=>$html));
        $result=$this->instance->rawHTML($html)->get('array');
        $this->assertEquals($expected,$result);
    }
    public function testMedia()
    {
        $mediaId=1;
        $expected=array_merge($this->data,array('data'=>array('mediaId'=>$mediaId)));
        $result=$this->instance->media($mediaId)->get('array');
        $this->assertEquals($expected,$result);
    }
    public function testError()
    {
        $error_code=1;
        $expected=array_merge($this->data,array('code'=>$error_code));
        $result=$this->instance->error($error_code)->get('array');
        $this->assertEquals($expected,$result);
    }
    public function testMessage()
    {
        $status='success';
        $text='Text success message';
        $expected=array_merge($this->data,array('message'=>array('type'=>$status,'text'=>$text,'timestamp'=>123456789)));
        $result=$this->instance->message($status,$text)->get('array');
        $this->assertEquals($expected,$result);
    }
}