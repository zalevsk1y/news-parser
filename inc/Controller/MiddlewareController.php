<?php

namespace NewsParserPlugin\Controller;

class MiddlewareController {
    static private $instance;
    private $middleware=array();
    protected function __construct (){

    }
    static public function getInstance(){
        if(!self::$instance){
            self::$instance=new self();
        }
        return self::$instance;
    }
    
    public function add($action, $middleware){
        if(!$this->has($action)){
            $this->middleware[$action]=is_array($middleware)?$middleware:array($middleware);
        }else{
            if(is_array($middleware)){
                $this->middleware[$action]=array_merge($this->middleware[$action],$middleware);
            }else{
                array_push($this->middleware[$action],$middleware);
            }
        }
        $this->addFilter($action);
        return count($this->middleware[$action]);
    }
    public function has($action){
        return array_key_exists($action, $this->middleware);
    }
    public function remove($action){
        if($this->has($action)) {
            unset ($this->middleware[$action]);
            return true;
        }
        $this->removeFilter($action);
        return false;
    }
    public function get($action){
        return $this->middleware[$action];
    }
    public function update($action,$array_of_middleware){
        if(!is_array($array_of_middleware)) return false;
        $this->middleware[$action]=$array_of_middleware;
        return count($this->middleware[$action]);
    }
    protected function addFilter($action){
        
        if($this->has($action)) \add_filter($action,array($this,'apply_'.$action));
    }
    protected function removeFilter($action){
         \remove_filter($action,array($this,'apply_'.$action));
    }
    public function __call($method,$args){
       
        if(strpos($method,'apply_')===0){
            $action=substr($method,6);
            return $this->apply($action,$args);
        }
    }
    protected function apply($action,$value){
        if (!$this->has($action)) return $value;
        return array_reduce($this->middleware[$action],function($acc,$middleware){
            $interfaces=class_implements($middleware);
            if (!in_array("NewsParserPlugin\Interfaces\MiddlewareInterface",$interfaces)) throw new Exception (get_class($middleware).' is not implement  MiddlewareInterface');
            return \call_user_func_array($middleware,$acc);
        },$value);
    }
}