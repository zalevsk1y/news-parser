<?php
namespace Utils;

class ChainController{
    protected $obj;
    protected $result;
    public function build($object){
        $this->obj=$object;
        return $this;
    }
    public function __call($method,$args){
        if($method=='get'){
            return $this->result?:false;
        }
        if(method_exists($this->obj,$method)){
            $this->result= $this->result?:call_user_func_array(array($this->obj,$method), $args);
           
        }else{
            throw new \Exception('Wrong method name '.get_class($this->obj).'::'.$method);
        }
        return $this;
    }
}