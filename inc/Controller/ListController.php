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

class ListController extends BaseController
{
    /**
     * Instance of list parser.
     *
     * @var AbstractParseContent
     */
    protected $listParser;
    /**
     * Init function.
     *
     * @param AbstractParseContent $listParser
     */
    public function __construct(AbstractParseContent $listParser)
    {
        parent::__construct();
        $this->listParser = $listParser;      
    }
    /**
     * Get formated list of posts.
     * 
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @uses NewsParserPlugin\Controller\BaseController::modelsFactory
     * @uses NewsParserPlugin\Interfaces\FactoryInterface::get()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::message()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::rss()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::error()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::get()
     * @uses NewsParserPlugin\Parser\Abstracts\AbstractParseContent::get()
     * @uses NewsParserPlugin\Interfaces\ModelInterface::getAttribute()
     * @param string $url Url of the RSS source.
     * @return string
     */
    public function get($url)
    {
        try {
            $listData = $this->listParser->get($url);
            $list = $this->modelsFactory->listModel($listData);
            $response = $this->formatResponse->rss($list->getAttributes())->message('success', Success::text('RSS_LIST_PARSED'))->get('json');
        } catch (MyException $e) {
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }
        return $response;
    }

}
