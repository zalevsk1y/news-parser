<?php
namespace NewsParserPlugin\Core;

use NewsParserPlugin\Controller\AjaxController;
use NewsParserPlugin\Controller\MiddlewareController;
use NewsParserPlugin\Controller\EventController;
use \ContainerBuilder\Interfaces\ContainerInterface as ContainerInterface;
use NewsParserPlugin\Controller\Api\TemplateApiController;
use NewsParserPlugin\Controller\Api\CronApiController;
use NewsParserPlugin\Utils\ResponseFormatter;
use \NewsParserPlugin\Controller\CronController;
use \NewsParserPlugin\Controller\CronTaskController;


class App{
    protected $ajaxController;
    public $middleware;
    public $DI_container;
    public $event;
    public $templateApiController;
    protected $mainMenu;
    static protected $instance=null;
    protected function __construct(ContainerInterface $DI_container){
        $this->event=EventController::getInstance($DI_container);
        $this->DI_container=$DI_container;
        $this->ajaxController=AjaxController::create($this->event);
        $this->templateApiController=TemplateApiController::create($this->event);
        $this->cronApiController=CronApiController::create($this->event);
        $this->middleware=MiddlewareController::getInstance($this->event);
        $this->mainMenu=Main::start($DI_container->get(\NewsParserPlugin\Menu\Admin\MenuPage::class),$DI_container->get(\NewsParserPlugin\Utils\MenuConfig::class));
        $this->cronTaskController=new CronTaskController($this->event);
        $this->addActions();
    }
    static public function start(ContainerInterface $DI_container){
        if(self::$instance==null){
            self::$instance=new self( $DI_container);
            return self::$instance;
        }
        return self::$instance;
    }
    protected function addActions(){
       
        
    }
}