<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\PostModel;

/**
 * Class controller for visual constructor.
 *
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class VisualConstructorController 
{
    /**
     * Parser
     *
     * @var AbstractParseContent
     */
    protected $parser;
    /**
     * Init function.
     *
     * @param AbstractParseContent $parser
     */
    public function __construct(AbstractParseContent $parser)
    {
        $this->parser=$parser;
    }
    /**
     * Parse raw html data of the page.
     *
     * @param string $url Url of the page.
     * @param array $options Array of options.
     * @return array|string
     */
    public function get($url, $options = array())
    {
        $html_data=$this->parser->get($url, $options);   
        return $html_data;
    }
    /**
     * Magic method to call instance as class.
     *
     * @param string $url Url of the page.
     * @param array $options Array of options.
     * @return array|string
     */
    public function __invoke($url, $options)
    {
        return $this->get($url, $options);
    }
}
