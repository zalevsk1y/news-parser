<?php

require 'autoload.php';
use NewsParserPlugin\PHPUnit\Framework\TestCase;
use NewsParserPlugin\Controller\PostController;
//use NewsParserPlugin\Factory\PostFactory;


class CreatePostControllerTest extends TestCase{
    protected function setUp(){
        
    }
    public function testGet(){
        //include 'inc/Factory/PostFactory.php';
        $mockData=require 'assert/mockParsedData.php';
        $mockSettings=require 'assert/mockSettings.php';
        $expectedJSON=json_encode(array('test'=>'ok'));
        $stub_post_factory=$this->createMock(Factory\PostFactory::class);
        $stub_post_model=$this->createMock(Models\PostModel::class);
        $stub_post_factory->method('get')->willReturn( $stub_post_model);
        $stub_post_model->method('createDraft');
        $stub_post_model->method('addSource');
        $stub_post_model->method('createGalleryShortcode');
        $stub_post_model->method('getAttributes')->willReturn(array());
        $stub_parsing_post_content=$this->createMock(Parser\ParseContent::class);
        $stub_parsing_post_content->method('get')->willReturn($mockData);
        $stub_response_formatter=$this->createMock(Utils\ResponseFormatter::class);
        $stub_response_formatter->method('post')->willReturn($stub_response_formatter);
        $stub_response_formatter->method('message')->willReturn($stub_response_formatter);
        $stub_response_formatter->method('get')->willReturn( $expectedJSON);
        $stub_settings=$this->createMock(Utils\Settings::class);
        $stub_settings->method('get')->willReturn($mockSettings); 
        $this->postController=new PostController($stub_parsing_post_content,$stub_settings,$stub_response_formatter,$stub_post_factory);
        function get_current_user_id(){
            return 1;
        }
        $this->assertEquals($this->postController->get('http://test.com/jp.html'),$expectedJSON);
    }
}