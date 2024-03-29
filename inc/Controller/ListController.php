<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
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

class ListController 
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
    public function __construct(AbstractParseContent $parser)
    {
        $this->parser = $parser;
    }
    /**
     * Get formated list of posts.
     *
     * @uses NewsParserPlugin\Parser\Abstracts\AbstractParseContent::get()
     * @uses NewsParserPlugin\Interfaces\ModelInterface::getAttribute()
     * @param string $url Url of the RSS source.
     * @return array
     */
    public function get($url)
    {
        
        $listData = $this->parser->get($url);
        $list = $this->listModelFactory($listData);   
        return $list->getAttributes();
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
