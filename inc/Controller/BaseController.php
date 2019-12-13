<?php

namespace NewsParserPlugin\Controller;


class BaseController
{
    /**
     * Instance of response formatter class.
     *
     * @var ResponseFormatterInterface
     */
    protected $formatResponse;
    /**
     * Init function.
     *
     * @param string|object $formatter
     */
    public function __construct($formatter)
    {
        $this->formatResponse=$this->initFormatter($formatter);
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