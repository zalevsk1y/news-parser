<?php
namespace Utils;

class PipeController {
    protected $result;
    protected $obj;
    public function build($data,$obj=null){
        $this->result=$data;
        $this->obj=$obj;
        return $this;
    }
    public function func($function_name,$args){
        if(is_callable($function_name)){
            $key=array_search("data",$args);
            if($key!==false)$args[$key]=$this->result;
           $this->result=$this->callFunc($function_name,$args);
        }else{
            throw new \Exception('Wrong function name '.$function_name);
        }
        return $this;
    }
    protected function callFunc($function_name,$args){
        $temp_result=call_user_func_array($function_name, $args);
        $result=$temp_result===false?$this->result:$temp_result;
        return $result;
    }
    public function __call($method,$args){
        if(is_null($this->obj)){
            throw new \Exception('Object did not set.');
        }
        if($method=='get'){
            return $this->result?:false;
        }
        if(method_exists($this->obj,$method)){
            $args[]=$this->result;
            $this->result=$this->callFunc(array($this->obj,$method),$args);
        }else{
            throw new \Exception('Wrong method name '.get_class($this->obj).'::'.$method);
        }
        return $this;
    }
    
}