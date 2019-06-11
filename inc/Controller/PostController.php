<?php

namespace Controller;
use Utils\Settings;

use Utils\ResponseFormatter;
use Parser\ParseContent;

use Message\Success;
use Message\Error;

use Interfaces\ControllerInterface; 
use Interfaces\FactoryInterface; 

use Exception\MyException;

use Utils\PipeController;
use Models\PostModel;

class PostController implements ControllerInterface {
    protected $postFactory;
    protected $postData;
    protected $settings;
    protected $formatResponse;


    public function __construct(ParseContent $postParser,Settings $settings,ResponseFormatter $formatter,FactoryInterface $postFactory){
        $this->postParser=$postParser;
        $this->settings=$settings->get();;
        $this->formatResponse=$formatter;
        $this->postFactory=$postFactory;
    }
    public function get(string $url,string $options=null){
        try{
            $parsed_data=$result=$this->postParser->get($url,$this->settings->post);
            $parsed_data['authorId']=get_current_user_id();

            //unescaped url

            $parsed_data['sourceUrl']=$url;
            if(!is_null($options)){
                    $options=$this->pipe($options)
                            ->func('stripslashes',array("data"))
                            ->func('json_decode',array("data",true))
                            ->get();
            }
            $post=$this->postFactory->get($parsed_data);
            if(!$this->imagesWasSelected($options)){
                return $this->formatResponse->dialog('gallery',$post->gallery)->message('none')->get('json');
            }
            $this->pipe($post)
                ->createDraft()
                ->addSourse()
                ->addPostThumbnail()
                ->updateImageGallery($options)
                ->downloadGalleryPictures()
                ->createGalleryShortcode();
            
            $response=$this->formatResponse->post($post->getAttributes())->message('success',Success::text('POST_SAVED_AS_DRAFT'))->get('json');
           
        }catch(MyException $e){
            $response=$this->formatResponse->error(1)->message('error',$e->getMessage())->get('json');
        }
        return $response;
    }
 
    public function imagesWasSelected($options){
         if ($this->settings->post->parseOtherPictures&&$this->settings->post->showPicturesDialog&&!$options){
            return false;
        }
        return true;
    }
    public function createDraft(PostModel $post){
        $post->createDraft();
        return $post;
    }
    public function addPostThumbnail(PostModel $post){
        if($this->settings->post->addThumbnail){
            $post->addPostThumbnail();
        }
        return $post;
    }
    public function addSourse(PostModel $post){
        if($this->settings->general->addSource){
            $post->addSource();
        }
        return $post;
    }
    public function updateImageGallery($new_gallery,PostModel $post){
        if($new_gallery&&is_array($new_gallery)&&isset($new_gallery['gallery'])){
            $post->gallery=$new_gallery['gallery'];
        }
        return $post;
    }
    public function downloadGalleryPictures(PostModel $post){
        if($this->settings->post->parseOtherPictures){
            $post->downloadGalleryPictures($this->settings->post->maxPictures);
        }
        return $post;
    }
    public function createGalleryShortcode(PostModel $post){
        if($this->settings->gallery->addGallery){
            $post->createGalleryShortcode($this->settings->gallery->shortCode,$this->settings->gallery->parameterName);
        }
        return $post;
    }
  
    protected function pipe($input_data){
        return (new PipeController())->build($input_data,$this);
    }
    
}