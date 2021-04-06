<?php
namespace NewsParserPlugin;


return array(
    Utils\MenuConfig::class=>[NEWS_PARSER_PLUGIN_DIR.'menu-config.php'],
    Utils\AdapterGutenberg::class=>[],
    Utils\ResponseFormatter::class=>[],
    Parser\XMLParser::class=>[],
    Parser\HTMLRaw::class=>[],
    Parser\HTMLPatternParser::class=>[Utils\AdapterGutenberg::class],
    Menu\Admin\MenuPage::class=>[Utils\MenuConfig::class],
    Controller\PostController::class=>[Parser\HTMLPatternParser::class,Utils\ResponseFormatter::class],
    Controller\ListController::class=>[Parser\XMLParser::class,Utils\ResponseFormatter::class],
    Controller\VisualConstructorController::class=>[Parser\HTMLRaw::class,Utils\ResponseFormatter::class]
);