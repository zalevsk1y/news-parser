<?php
namespace NewsParserPlugin;
use function DI\create;
use function DI\get;

return array(
    Utils\MenuConfig::class=>create(Utils\MenuConfig::class)->constructor(NEWS_PARSER_PLUGIN_DIR.'menu-config.php'),
    Parser\HTMLPatternParser::class=>create(Parser\HTMLPatternParser::class)->constructor(get(Utils\AdapterGutenberg::class)),
    Menu\Admin\MenuPage::class=>create(Menu\Admin\MenuPage::class)->constructor(get(Utils\MenuConfig::class)),
    Controller\PostController::class=>create(Controller\PostController::class)->constructor(get(Parser\HTMLPatternParser::class),get(Utils\ResponseFormatter::class)),
    Controller\ListController::class=>create(Controller\ListController::class)->constructor(get(Parser\XMLParser::class),get(Utils\ResponseFormatter::class)),
    Controller\VisualConstructorController::class=>create(Controller\VisualConstructorController::class)->constructor(get(Parser\HTMLRaw::class),get(Utils\ResponseFormatter::class))
);