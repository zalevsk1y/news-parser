<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ControllerInterface;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Utils\ResponseFormatter;

/**
 * Class creates and formats list from RSS feed
 *
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class ListController 
{
    /**
     * Instance of list parser.
     *
     * @var AbstractParseContent
     */
    protected $listParser;
    /**
     * Factory for creating ListModel
     *
     * @var FactoryInterface
     */
    protected $listFactory;
    /**
     * Instance of response formatter class.
     *
     * @var ResponseFormatter
     */
    protected $formatResponse;
    /**
     * Init function.
     *
     * @param AbstractParseContent $listParser
     * @param ResponseFormatter $formatter
     * @param FactoryInterface $listFactory
     */
    public function __construct(AbstractParseContent $listParser, ResponseFormatter $formatter, FactoryInterface $listFactory)
    {
        $this->listParser = $listParser;
        $this->formatResponse = $formatter;
        $this->listFactory = $listFactory;
    }
    /**
     * Get formated list of posts.
     * 
     * @param string $url Url of the RSS source.
     * @return string
     */
    public function get(string $url)
    {
        try {
            $listData = $this->listParser->get($url);
            $list = $this->listFactory->get($listData);
            $response = $this->formatResponse->rss($list->getAttributes())->message('success', Success::text('RSS_LIST_PARSED'))->get('json');
        } catch (MyException $e) {
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }
        return $response;
    }

}
