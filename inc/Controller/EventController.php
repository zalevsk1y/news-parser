<?php 
namespace NewsParserPlugin\Controller;
use Psr\Container;

class EventController 
{
    protected $eventCollection=array();
    public function __construct(ContainerInterface $DIController)
    {
        $this->di=$DIController;
    }
    public function on($action,$controller){
        $this->eventCollection[$action]=$controller;
    }
    public function has($action){
        if(array_key_exists($action,$this->eventCollection)) return true;
        return false;
    }
    public function off($action){
        if(!array_key_exists($action,$this->eventCollection)) return;
        unset($this->eventCollection[$action]);
    }
    public function trigger($action,$args)
    {
        if(!array_key_exists($action,$this->eventCollection)) throw new \Exception('EventController does not set event:'.$action.'.');
        if(!is_array($args)) throw new Exception('EventController::trigger() second argument should be an array, but '.gettype($args).' given.');
        return $di->call($this->eventCollection,$args);
    }
}