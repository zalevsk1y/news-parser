<?php

namespace NewsParserPlugin\Controller;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Factory\ModelsFactory;

class BaseController
{
    /**
     * Instance of response formatter class.
     *
     * @var ResponseFormatter
     */
    protected $formatResponse;
    /**
     * Factory class
     *
     * @var modelFactory
     */
    protected $modelsFactory;
    /**
     * Init function.
     *
     * @param string|object $formatter
     */
    public function __construct()
    {
        $this->formatResponse=ResponseFormatter::getInstance();
        $this->modelsFactory=ModelsFactory::getInstance();
    }
    /**
    * Check Formatter class and return object of it.
    *
    * @throws \Exception if class does not implements interface NewsParserPlugin\Interfaces\ResponseFormatterInterface.
    * @param string|object $formatterClass
    * @return ResponseFormatterInterface
    */
    protected function initFormatter($formatterClass)
    {
        $interfaces=class_implements($formatterClass);
        if(false===$interfaces||!in_array('NewsParserPlugin\Interfaces\ResponseFormatterInterface',$interfaces)) throw new \Exception('Wrong ResponseFormatter class was provide.Should implies ResponseFormatterInterface.');
        return gettype($formatterClass)==='object'?$formatterClass:$formatterClass::format();
    }
}