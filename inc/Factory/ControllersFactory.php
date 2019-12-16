<?php
namespace NewsParserPlugin\Factory;

use NewsParserPlugin\Controller\ListController;
use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Controller\VisualConstructorController;
use NewsParserPlugin\Controller\OptionsController;
use NewsParserPlugin\Controller\BaseController;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Interfaces\FactoryInterface;

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

class ControllersFactory implements FactoryInterface
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
    function __construct(ResponseFormatter $formatter,FactoryInterface $parserFactory)
    {
        $this->formatter=$formatter;
        $this->parser=$parserFactory;
    }
    /**
     * Get instance of class.
     *
     * @param string $class short class name
     * @return BaseController

     */
    public function getInstance($class)
    {
        switch($class){
            case 'list':
                return $this->list();
            case 'post':
                return $this->options();
            case 'options':
                return $this->options();
            case 'visual':
                return $this->visualConstructor();
        }
        throw new \Exception('Wrong ControllersFactory::class method name '.$class.'.');
    }
    /**
     * Get list controller.
     *
     * @return ListController
     */
    protected function list()
    {
        return new ListController($this->parser->getInstance('xml'),$this->formatter);
    }
    /**
     * Get options controller.
     *
     * @return OptionsController
     */
    protected function options()
    {
        return new OptionsController($this->formatter);
    }
    /**
     * Get post controller
     *
     * @return PostController
     */
    protected function post()
    {
        return new PostController($this->parser->getInstance('html'),$this->formatter);
    }
    /**
     * Get visual constructor controller.
     *
     * @return VisualConstructorController
     */
    protected function visualConstructor()
    {
        return new VisualConstructorController($this->parser->getInstance('rawHTML'),$this->formatter);
    }
}