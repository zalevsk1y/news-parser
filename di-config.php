<?php
namespace NewsParserPlugin;
use function DI\object;
use function DI\get;

return array(
    Utils\MenuConfig::class=>object(Utils\MenuConfig::class)->constructor(NEWS_PARSER_PLUGIN_DIR.'menu-config.php'),
    Parser\HTMLPatternParser::class=>object(Parser\HTMLPatternParser::class)->constructor(get(Utils\AdapterGutenberg::class)),
    Menu\Admin\MenuPage::class=>object(Menu\Admin\MenuPage::class)->constructor(get(Utils\MenuConfig::class)),
    Controller\PostController::class=>object(Controller\PostController::class)->constructor(get(Parser\HTMLPatternParser::class),get(Utils\ResponseFormatter::class)),
    Controller\ListController::class=>object(Controller\ListController::class)->constructor(get(Parser\XMLParser::class),get(Utils\ResponseFormatter::class)),
    Controller\VisualConstructorController::class=>object(Controller\VisualConstructorController::class)->constructor(get(Parser\HTMLRaw::class),get(Utils\ResponseFormatter::class)),
);