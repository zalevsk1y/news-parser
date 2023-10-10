<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ControllerInterface;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Message\Error;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Parser\ParseContent;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Utils\Settings;

/**
 *Class creates and formats list from RSS feed
 *
 * PHP version 7.2.1
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class ListController 
{
    protected $listParser;
    protected $settings;
    protected $formatter;
    protected $listFactory;
    protected $formatResponse;
    
    public function __construct(ParseContent $listParser, Settings $settings, ResponseFormatter $formatter, FactoryInterface $listFactory)
    {
        $this->listParser = $listParser;
        $this->settings = $settings;
        $this->formatResponse = $formatter;
        $this->listFactory = $listFactory;
    }
    public function get(string $url)
    {

        try {
            $listData = $this->listParser->get($url);
            $list = $this->listFactory->get($listData);
            $response = $this->formatResponse->list($list->getAttributes())->message('success', Success::text('RSS_LIST_PARSED'))->get('json');
        } catch (MyException $e) {
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }
        return $response;
    }

}
