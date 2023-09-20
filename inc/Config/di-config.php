<?php
namespace NewsParserPlugin;


return array(
    Utils\MenuConfig::class=>[NEWS_PARSER_PLUGIN_DIR.'inc/Config/menu-config.php'],
    Utils\AdapterGuttenbergWithModifiers::class=>[],
    Utils\ResponseFormatter::class=>[],
    Parser\XMLParser::class=>[],
    Parser\HTMLRaw::class=>[],
    Parser\HTMLPatternParser::class=>[],
    Menu\Admin\MenuPage::class=>[Utils\MenuConfig::class],
    Controller\TemplateController::class=>[],
    Controller\CronController::class=>[],
    Controller\PostControllerExtendeOptions::class=>[Parser\HTMLPatternParser::class,Utils\AdapterGuttenbergWithModifiers::class],
    Controller\ListController::class=>[Parser\XMLParser::class],
    Controller\VisualConstructorController::class=>[Parser\HTMLRaw::class],
    Controller\MediaController::class=>[Utils\ResponseFormatter::class],
);