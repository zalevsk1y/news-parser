<?php
namespace NewsParserPlugin;


return array(
    Utils\MenuConfig::class=>[NEWS_PARSER_PLUGIN_DIR.'inc/Config/menu-config.php'],
    Utils\AdapterGutenberg::class=>[],
    Utils\ResponseFormatter::class=>[],
    Parser\XMLParser::class=>[],
    Parser\HTMLRaw::class=>[],
    Parser\HTMLPatternParser::class=>[Utils\AdapterGutenberg::class],
    Menu\Admin\MenuPage::class=>[Utils\MenuConfig::class],
    Controller\TemplateController::class=>[],
    Controller\CronController::class=>[],
    Controller\PostControllerExtendeOptions::class=>[Parser\HTMLPatternParser::class,Utils\ResponseFormatter::class],
    Controller\ListController::class=>[Parser\XMLParser::class],
    Controller\VisualConstructorController::class=>[Parser\HTMLRaw::class],
    Controller\MediaController::class=>[Utils\ResponseFormatter::class],
);