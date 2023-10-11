<?php
namespace NewsParserPlugin;

use NewsParserPlugin\Core\ScriptLoadingManager;



function news_parser_init(){
    
    // Dependency Injection container initialization

    $container=new \ContainerBuilder\DI();
    $container->addDefinitions(NEWS_PARSER_PLUGIN_DIR.'inc/Config/di-config.php');
    //$container=$container_builder->build();
   
    // Load script, style, and global variable configurations

    //$scripts_config= include NEWS_PARSER_PLUGIN_DIR.'inc/Config/scripts-config.php';
    //$styles_config= include NEWS_PARSER_PLUGIN_DIR.'inc/Config/styles-config.php';

    $scripts_config= include NEWS_PARSER_PLUGIN_DIR.'inc/Config/scripts-config.php';
    $styles_config= include NEWS_PARSER_PLUGIN_DIR.'inc/Config/styles-config.php';
    $global_variables_config= include NEWS_PARSER_PLUGIN_DIR.'inc/Config/global-variables-config.php';
     
    $app=Core\App::start($container);

    // Initialize the ScriptLoadingManager

    $loading_manager=ScriptLoadingManager::getInstance($container->get(\NewsParserPlugin\Menu\Admin\MenuPage::class),$container->get(\NewsParserPlugin\Utils\MenuConfig::class));
    $loading_manager->setScriptsConfig($scripts_config);
    $loading_manager->setStylesConfig($styles_config);
    $loading_manager->setGlobalVariablesConfig($global_variables_config);
    $loading_manager->init();

    // Set up modifiers middleware for html parser

    $modifiers=array(
       new Modifiers\RemoveLineBreaks(),
       new Modifiers\ReplaceRelativePathWithAbsolute(),
       new Modifiers\ImagePrepare()
    );
    $app->middleware->add('htmlRaw:parse',$modifiers);
 
    // Event listeners
 
    $app->event->on('media:create',array(Controller\MediaController::class,'create'));
    $app->event->on('template:create',array(Controller\TemplateControllerWithUserInfo::class,'create'));
    $app->event->on('template:get',array(Controller\TemplateControllerWithUserInfo::class,'get'));
    $app->event->on('template:delete',array(Controller\TemplateControllerWithUserInfo::class,'delete'));
    $app->event->on('template.keys:get',array(Controller\TemplateControllerWithUserInfo::class,'templateKeys'));
    $app->event->on('cron:create',array(Controller\CronController::class,'create'));
    $app->event->on('cron:delete',array(Controller\CronController::class,'delete'));
    $app->event->on('cron:get',array(Controller\CronController::class,'get'));
    $app->event->on('list:get',array(Controller\ListController::class,'get'));
    $app->event->on('html:get',array(Controller\VisualConstructorController::class,'get'));
    $app->event->on('post:create',array(Controller\PostControllerUserID::class,'create'));
   
 }