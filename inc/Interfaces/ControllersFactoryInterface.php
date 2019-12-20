<?php
namespace NewsParserPlugin\Interfaces;
use NewsParserPlugin\Controller\ListController;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Controller\VisualConstructorController;
use NewsParserPlugin\Controller\OptionsController;

/**
 * Interface for creating controllers factory.
 *
 * PHP version 5.6
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
interface ControllersFactoryInterface
{
    /**
     * List controller.
     *
     * @return ListController
     */
    public function rssList();
    /**
     * Post controller.
     *
     * @return PostController
     */
    public function post();
    /**
     * Options controller.
     *
     * @return OptionsController
     */
    public function option();
    /**
     * Visual constructor.
     *
     * @return VisualConstructorController
     */
    public function visual();
}