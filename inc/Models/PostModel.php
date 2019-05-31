<?php
namespace Models;
use Interfaces\ModelInterface;
use Exception\MyException;
use Message\Errors;

class PostModel implements ModelInterface{
    public $title;
    public $body;
    public $image;
    public $gallery=array();
    public $status;
    public $sourceUrl;
    public $postId;
    public $links=array();

    public function __construct($data){
        if(!$data['title']) throw new MyException (Errors::text('NO_TITLE'));
        $this->title=$data['title'];
        if(!$data['body']) throw new MyException (Errors::text('NO_BODY'));
        $this->body=$data['body'];
        $this->image=$data['image'];
        $this->gallery=$data['gallery'];
        $this->sourceUrl=$data['sourceUrl'];
        $this->authorId=$data['authorId'];
        $this->status='parsed';
    }
    public function createDraft(){
        $this->postId=$this->createPostWordPress();  
        if ($this->postId == 0) {
            throw new MyException(Errors::text('POST_WAS_NOT_CREATED'));
        }
        $this->getPostLinksWordpress();
        $this->status='draft';
        }
    
    public function addPostThumbnail(){
        $this->attachImageToPostWordpress($this->image,$this->postId,true);
    }
    public function downloadGalleryPictures($quantity=null){
        $img_ids_array=array();
        if(!is_null($quantity)){
            $gallery=array_slice($this->gallery,0,$quantity);
        }else{
            $gallery=$this->gallery;
        }
        foreach($gallery as $image){
            $img_ids_array[]=$this->attachImageToPostWordpress($image,$this->postId);
        }
        $this->gallery['ids']=$img_ids_array;
    }
    public function addSource(){
        $this->body.='<br> <a href="'.$this->data['link'].'">'.__('Source','news-parser').'</a>';
        $this->updatePostWordPress('post_content',$this->body);
    }
    public function getAttributes($format='array'){
        $data_array=array(
            'title'=>$this->title,
            'previewLink'=>$this->links['previewLink'],
            'status'=>$this->status,
            'post_id'=>$this->postId
        );
        $data_json=json_encode($data_array);
        switch ($format){
            case 'json':
                return $data_json;
            case 'object':
                return json_decode($data_json);
            default:
                return $data_array;
        }
    }
    public function createGalleryShortcode($shortcode,$paramName){
        $gallery=$this->gallery['ids'];
                $output= ' ['.esc_html($shortcode).' '.esc_html($paramName).'='.implode(',',$gallery).']';   
                $this->body.=$output;
                $this->updatePostWordPress('post_content',$this->body);
    }

    protected function createPostWordPress(){
        $date=new \DateTime();
        $post_date=$date->format('Y-m-d H:i:s');
        $post_data = array(
            'post_title'    => \wp_strip_all_tags( $this->title),
            'post_content'  =>  $this->body,
            'post_date'     =>$post_date,
            'post_author'   => $this->authorId,
    
        );
        $postId=wp_insert_post($post_data);
        if (is_wp_error($postId)){
            throw new MyException($postId->get_error_message());
        }
        else {
            return $postId;
        }
    }
    protected function attachImageToPostWordpress($image,$id,$post_thumb=false){
        $url = $image;
        $post_id = $id;
        $desc = "image";
        $img_id = media_sideload_image( $url, $post_id , $desc,'id');
        if( is_wp_error($img_id) ){
            throw new MyException($img_id->get_error_message());
        }
        else {
            if($post_thumb)set_post_thumbnail($post_id, $img_id );
           return $img_id;
        }
    }

    protected function updatePostWordPress(string $update_item,$data){
        $post_array=[
            'ID'           => $this->postId,
            $update_item => $data,
        ];
    
        wp_update_post( $post_array );
    }
    protected function getPostLinksWordpress(){
        $post_id=$this->postId;
        $this->links['previewLink']=get_post_permalink($post_id);
        $this->links['editLink']=get_edit_post_link($post_id,'');
        $this->links['deleteLink']=get_delete_post_link($post_id);
        
    }
}