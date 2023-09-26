<?php
namespace NewsParserPlugin;


return array(
    Utils\MenuConfig::class=>[NEWS_PARSER_PLUGIN_DIR.'inc/Config/menu-config.php'],
    Utils\AdapterGuttenberg::class=>[],
    Utils\ResponseFormatter::class=>[],
    Parser\XMLParser::class=>[],
    Parser\HTMLRaw::class=>[],
    Parser\HTMLPatternParser::class=>[],
    Menu\Admin\MenuPage::class=>[Utils\MenuConfig::class],
    Controller\TemplateController::class=>[],
    Controller\CronController::class=>[],
    Controller\PostControllerExtendeOptions::class=>[Parser\HTMLPatternParser::class,Utils\AdapterGuttenberg::class,[
        'addSrcSetAndSizes'=>['NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before\addImageSizesModifier',
            'NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before\removeSrcSetAndSizesModifier'],
        'groupImagesRow'=>['NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before\groupPicturesModifier',null],
        'addSource'=>['NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before\addSourceModifier',null],
    ],[
        
        'addFeaturedMedia'=>['NewsParserPlugin\Parser\Modifiers\PostModifiers\addPostThumbnailModifier',null]
    ]],
    Controller\ListController::class=>[Parser\XMLParser::class],
    Controller\VisualConstructorController::class=>[Parser\HTMLRaw::class],
    Controller\MediaController::class=>[Utils\ResponseFormatter::class],
);