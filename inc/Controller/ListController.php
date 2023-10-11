<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Models\ListModel;

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
    protected $parser;
    /**
     * Factory class
     *
     * @var ModelsFactory
     */
    protected $modelsFactory;
    /**
     * Init function.
     *
     * @param AbstractParseContent $parser
     */
    public function __construct(AbstractParseContent $parser, ResponseFormatter $formatter)
    {
        parent::__construct($formatter);
        $this->parser = $parser;
    }
    /**
     * Get formated list of posts.
     *
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @uses NewsParserPlugin\Controller\BaseController::modelsFactory
     * @uses NewsParserPlugin\Utils\ResponseFormatter::message()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::rss()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::error()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::get()
     * @uses NewsParserPlugin\Parser\Abstracts\AbstractParseContent::get()
     * @uses NewsParserPlugin\Interfaces\ModelInterface::getAttribute()
     * @param string $url Url of the RSS source.
     * @return ResponseFormatter
     */
    public function get($url)
    {
        try {
            $listData = $this->parser->get($url);
            $list = $this->listModelFactory($listData);
            $response = $this->formatResponse->rss($list->getAttributes())->message('success', Success::text('RSS_LIST_PARSED'));
        } catch (MyException $e) {
            $response = $this->formatResponse->error($e->getCode())->message('error', $e->getMessage());
        }
        return $response;
    }
    /**
    * Get instance of ListModel class.
    *
    * @param array $listData  Structure:
    * [title] - title of post
    * [pubDate] -date of post publication
    * [description] -post brief description
    * [link] - link to the original post
    * [image] - main post image url
    * [status] - status of post parsed - if post was not saved as draft and draft -when post saved as draft
    * @return ListModel
    */
    protected function listModelFactory($listData)
    {
        return new ListModel($listData);
    }
}
