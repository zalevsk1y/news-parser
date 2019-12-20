<?php
namespace NewsParserPlugin\Factory;

use NewsParserPlugin\Controller\ListController;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Controller\VisualConstructorController;
use NewsParserPlugin\Controller\OptionsController;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Interfaces\ControllersFactoryInterface;
use NewsParserPlugin\Interfaces\ParserFactoryInterface;

/**
 * Class factory fo creating controllers.
 *
 * PHP version 5.6
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class ControllersFactory implements ControllersFactoryInterface
{
    /**
     * Response formatter
     *
     * @var ResponseFormatter
     */
    protected $formatter;
    /**
     * Parsers factory.
     *
     * @var FactoryInterface
     */
    protected $parser;
    /**
     * Init function.
     *
     * @param ResponseFormatter $formatter
     * @param FactoryInterface $parserFactory
     */
    public function __construct(ResponseFormatter $formatter,ParserFactoryInterface $parserFactory)
    {
        $this->formatter=$formatter;
        $this->parser=$parserFactory;
    }
    /**
     * Get list controller.
     *
     * @return ListController
     */
    public function rssList()
    {
        return new ListController($this->parser->xml(),$this->formatter);
    }
    /**
     * Get options controller.
     *
     * @return OptionsController
     */
    public function option()
    {
        return new OptionsController($this->formatter);
    }
    /**
     * Get post controller
     *
     * @return PostController
     */
    public function post()
    {
        return new PostController($this->parser->html(),$this->formatter);
    }
    /**
     * Get visual constructor controller.
     *
     * @return VisualConstructorController
     */
    public function visual()
    {
        return new VisualConstructorController($this->parser->rawHTML(),$this->formatter);
    }
}