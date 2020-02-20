<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Utils\ResponseFormatter;
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

class VisualConstructorController extends BaseController
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
     * @param ResponseFormatter $formatter
     */
    public function __construct(AbstractParseContent $parser, ResponseFormatter $formatter)
    {
        parent::__construct($formatter);
        $this->parser=$parser;
    }
    /**
     * Parse raw html data of the page.
     *
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @param string $url Url of the page.
     * @param array $options Array of options.
     * @return string
     */
    public function get($url, $options = array())
    {
        try {
            $html_data=$this->parser->get($url, $options);
            $response=$this->formatResponse->rawHTML($html_data);
        } catch (MyException $e) {
            $response = $this->formatResponse->error($e->getCode())->message('error', $e->getMessage());
        }
        return $response;
    }
    /**
     * Magic method to call instance as class.
     *
     * @param string $url Url of the page.
     * @param array $options Array of options.
     * @return string
     */
    public function __invoke($url, $options)
    {
        return $this->get($url, $options);
    }
}
