<?php
namespace NewsParserPlugin;

use \Monolog\Logger;
use \Monolog\Handler\StreamHandler;
use Monolog\ErrorHandler;
use NewsParserPlugin\Core\Main;



function news_parser_init(){
    //logger initialization
    $log = new Logger('news-parser-plugin');
    $log->pushHandler(new StreamHandler(NEWS_PARSER_PLUGIN_DIR.'logs/news-parser.log', Logger::WARNING));
    // Set up Monolog to log uncaught exceptions
    ErrorHandler::register($log);
    

    $log->info('Plugin initialized.');

    $container=new \ContainerBuilder\DI();
    $container->addDefinitions(NEWS_PARSER_PLUGIN_DIR.'di-config.php');
    //$container=$container_builder->build();
 
    $app=Core\App::start($container);
    Main::start($container->get(\NewsParserPlugin\Menu\Admin\MenuPage::class),$container->get(\NewsParserPlugin\Utils\MenuConfig::class));
    $modifiers=array(
       new Modifiers\RemoveLineBreaks(),
       new Modifiers\ReplaceRelativePathWithAbsolute(),
       new Modifiers\ImagePrepare()
    );
    $app->middleware->add('htmlRaw:parse',$modifiers);
 
 
    $app->event->on('media:create',array(Controller\MediaController::class,'create'));
    $app->event->on('template:create',array(Controller\TemplateController::class,'create'));
    $app->event->on('template:get',array(Controller\TemplateController::class,'get'));
    $app->event->on('cron:create',array(Controller\CronController::class,'create'));
    $app->event->on('cron:delete',array(Controller\CronController::class,'delete'));
    $app->event->on('cron:get',array(Controller\CronController::class,'get'));
    $app->event->on('list:get',array(Controller\ListController::class,'get'));
    $app->event->on('html:get',array(Controller\VisualConstructorController::class,'get'));
    $app->event->on('post:create',array(Controller\PostControllerExtendeOptions::class,'create'));

    

 }