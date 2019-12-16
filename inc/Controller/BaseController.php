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
     * @var ModelsFactory
     */
    public function __construct(ResponseFormatter $formatter)
    {
        $this->formatResponse=$formatter;
    }
   
}