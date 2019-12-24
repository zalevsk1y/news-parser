<?php
namespace NewsParserPlugin;
use function DI\create;

return array(
    Utils\MenuConfig::class=>new Utils\MenuConfig(NEWS_PARSER_PLUGIN_DIR.'menu-config.php'),
    Controller\PostController::class=>new Controller\PostController(create(Parser\HTMLPatternParser::class),create(Utils\ResponseFormatter::class)),
    Controller\ListController::class=>new Controller\ListController(create(Parser\XMLParser::class),create(Utils\ResponseFormatter::class)),
    Controller\VisualConstructorController::class=>new Controller\VisualConstructorController(create(Parser\HTMLRaw::class),create(Utils\ResponseFormatter::class))
);