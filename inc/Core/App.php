<?php
namespace NewsParserPlugin\Core;

use NewsParserPlugin\Controller\AjaxController;
use NewsParserPlugin\Controller\MiddlewareController;
use NewsParserPlugin\Interfaces\ContainerInterface;
use NewsParserPlugin\Controller\EventController;

class App{
    protected $ajaxController;
    public $middleware;
    public $DI_container;
    public $event;
    protected $mainMenu;
    static protected $instance=null;
    protected function __construct(ContainerInterface $DI_container){
        $this->event=EventController::getInstance($DI_container);
        $this->DI_container=$DI_container;
        $this->ajaxController=AjaxController::create($this->event);
        $this->middleware=MiddlewareController::getInstance($this->event);
        $this->mainMenu=Main::start($DI_container->get(\NewsParserPlugin\Menu\Admin\MenuPage::class),$DI_container->get(\NewsParserPlugin\Utils\MenuConfig::class));
    }
    static public function start(ContainerInterface $DI_container){
        if(self::$instance==null){
            self::$instance=new self( $DI_container);
            return self::$instance;
        }
        return self::$instance;
    }
}