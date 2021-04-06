<?php

namespace NewsParserPlugin\Controller;

/**
 * Class add middleware modifiers. Modifiers bind to the action. 
 * Use wordpress apply_filters to pass data to modifiers.
 *
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class MiddlewareController {
    /**
     * Instance of MiddlewareController
     */
    static private $instance;
    /**
     * Array of middlewares.
     */
    private $middleware=array();
    /**
     * init function 
     */
    protected function __construct (){

    }
    static public function getInstance(){
        if(!self::$instance){
            self::$instance=new self();
        }
        return self::$instance;
    }
    /**
     * Add middleware and bind it to the action. To add action use wordpress apply_filters.
     * example: $my_middleware->add('my_action',$my_action_modifier); //add modifiers to the action 
     *          //in your code 
     *          $modified_data=apply_filter('my_action',array($unmodified_data))
     *          
     * 
     * @param string $action name of action that will be used to call modifier 
     * @param array|NewsParserPlugin\Interfaces\MiddlewareInterface $middleware 
     * 
     * @return int new array of modifiers length
     */
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
    /**
     * Remove action and all modifiers
     * 
     * @param string $action Action name 
     * 
     * @return boolean 
     */
    public function remove($action){
        if($this->has($action)) {
            unset ($this->middleware[$action]);
            return true;
        }
        $this->removeFilter($action);
        return false;
    }
    /**
     * Get array of modifiers bound to the action
     * 
     * @param string $action
     * 
     * @return array
    */
    public function get($action){
        return $this->middleware[$action];
    }
    /**
     * Update array of modifiers bound to the action.
     * 
     * @param string $action Action name 
     * @param array $array_of_middleware 
     * 
     * @return int length of new modifiers array
     */
    public function update($action,$array_of_middleware){
        if(!is_array($array_of_middleware)) return false;
        $this->middleware[$action]=$array_of_middleware;
        return count($this->middleware[$action]);
    }
    /**
     * Add wp add_filter hook on action.
     */
    protected function addFilter($action){
        
        if($this->has($action)) \add_filter($action,array($this,'apply_'.$action));
    }
    /**
     * Removes add_filter hook.
     */
    protected function removeFilter($action){
         \remove_filter($action,array($this,'apply_'.$action));
    }
    /**
     * Transform apply_[action name] call to proper $this->middleware[$action] call.
     * 
     * @param string $method
     * @param array $args
     */
    public function __call($method,$args){
       
        if(strpos($method,'apply_')===0){
            $action=substr($method,6);
            return $this->apply($action,$args);
        }
    }
    /**
     * Call modifiers form array bound to action.
     * 
     * @param string $action action name.
     * @param array $value value that should be passed to modifiers.__resizable_base__
     *   
     */
    protected function apply($action,$value){
        if (!$this->has($action)) return $value;
        $result=array_reduce($this->middleware[$action],function($acc,$middleware){
            $interfaces=class_implements($middleware);
            if (!in_array("NewsParserPlugin\Interfaces\MiddlewareInterface",$interfaces)) throw new Exception (get_class($middleware).' is not implement  MiddlewareInterface');
            return \call_user_func_array($middleware,$acc);
        },$value);
        return $result[0];
    }
}