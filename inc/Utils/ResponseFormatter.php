<?php
namespace Utils;


class ResponseFormatter {
 
    protected $data=array('err'=>0);
    protected $action;

    public function post(array $data){
        $this->action='post';
        $this->data['data']=array(
            'post_id'=>$data['post_id'],
            'status'=>$data['status'],
            'link'=>$data['previewLink']
        );
        return $this;
    }
    public function list(array $data){
        $this->action='list';
        $this->data['data']=$data;
        return $this;
    }
    public function dialog($type,$data){
        $this->data['dialog']=array(
            'type'=>$type,
            'data'=>$data
        );
            return $this;
    }
    public function error($code){
        $this->data['err']=$code;
        return $this;
    }
    public function message($status,$text=''){
        
        if($status=='none'){
            $this->data['msg']=false;
        }else{
            $this->data['msg']=array(
            
                    'type'=>$status,
                    'text'=>$text,
                    'timestamp'=>time()
                
            );
        }
        return $this; 
    }
    public function get($format){
        $json=json_encode($this->data);
        switch($format){
            case 'json':
                return $json;
            case 'object':
                return json_decode($json);
            case 'array':
                return json_decode($json,true);
            default:
            return $this->data;
        }
    }
}