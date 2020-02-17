<?php 
namespace NewsParserPlugin\Controller;
use Psr\Container\ContainerInterface;
use NewsParserPlugin\Interfaces\EventControllerInterface;
/**
 * Class event observer. Calls controller on event trigger.
 * 
 * PHP version 5.6
 * 
 * @package Controller
 * @author  Evgeny S.Zalevskiy <2600@ukr.net>
 * @license MIT <https://opensource.org/licenses/MIT>
 */
class EventController  implements  EventControllerInterface
{
    /**
     * Collection of events with controllers.
     *
     * @var array
     */
    protected $eventCollection=array();
    /**
     * Dependency injection controller instance.
     *
     * @var ContainerInterface
     */
    protected $di;
    /**
     * Init function.
     *
     * @param ContainerInterface $DIController Dependency injection controller.
     */
    
    public function __construct(ContainerInterface $DIController)
    {
        $this->di=$DIController;
    }
    /**
     * Bind event to controller.
     *
     * @param string $action
     * @param string $controller
     * @return void
     */
    public function on($action,$controller)
    {
        $this->eventCollection[$action]=$controller;
    }
    /**
     * Check if event is created.
     *
     * @param string $action
     * @return boolean
     */
    public function has($action)
    {
        if(array_key_exists($action,$this->eventCollection)) return true;
        return false;
    }
    /**
     * Remove existed event.
     *
     * @param string $action
     * @return void
     */
    public function off($action)
    {
        if(!array_key_exists($action,$this->eventCollection)) return;
        unset($this->eventCollection[$action]);
    }
    /**
     * Triggers existed event and pass args to controller.
     *
     * @param string $action
     * @param array $args
     * @return mixed
     */
    public function trigger($action,$args)
    {
        if(!array_key_exists($action,$this->eventCollection)) throw new \Exception('EventController does not set event:'.$action.'.');
        if(!is_array($args)) throw new Exception('EventController::trigger() second argument should be an array, but '.gettype($args).' given.');
        return $this->di->call($this->eventCollection[$action],$args);
    }
}