<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ControllerInterface;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Message\Error;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Utils\ResponseFormatter;


/**
 * Class controller for post
 *
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class PostController extends BaseController
{
    protected $postFactory;
    protected $postData;
    protected $optionsFactory;
    protected $options;
    protected $postParser;

    /**
     * Undocumented function
     *
     * @uses InitFormatterTrait::InitFormatter()
     * @param AbstractParseContent $postParser
     * @param FactoryInterface $optionsFactory
     * @param FactoryInterface $postFactory
     * @param [type] $formatter
     */
    public function __construct(AbstractParseContent $postParser, FactoryInterface $optionsFactory, FactoryInterface $postFactory, $formatter=ResponseFormatter::class)
    {
        parent::__construct($formatter);
        $this->postParser = $postParser;
        $this->optionsFactory = $optionsFactory;
        $this->postFactory = $postFactory;
    }
    /**
     * Create post draft and return response in proper format
     * All facade of PostModel class methods created for convenience of using in pipe
     *
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @param string $url of post that should be parsed and saved as draft
     * @return void
     */
    public function get($url)
    {
        try {
            $parsed_url=parse_url($url);
            if(!is_array($parsed_url)) throw new MyException (Errors::text('WRONG_OPTIONS_URL'));
            $parsing_options=$this->optionsFactory->get($parsed_url);
            $parsed_data =$this->postParser->get($url,$parsing_options->getAttributes('array'));
           
            $parsed_data['authorId'] = \get_current_user_id();
            $this->options=$parsing_options->getExtraOptions();
            //unescaped url

            $parsed_data['sourceUrl'] = $url;
         
            $post = $this->postFactory->get($parsed_data);
 
            //Stages of post draw creating
            $this->createDraft($post)->addSource($post)->addPostThumbnail($post);
               

            $response = $this->formatResponse->post($post->getAttributes())->message('success', sprintf(Success::text('POST_SAVED_AS_DRAFT'),$post->title))->get('json');

        } catch (MyException $e) {
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }
        return $response;
    }
   
    /**
     * Create WP post draft
     *
     * @param PostModel $post
     * @return PostController
     */
    public function createDraft(PostModel $post)
    {
        $post->createDraft();
        return $this;
    }
    /**
     * Add main image to the post
     *
     * @param PostModel $post
     * @return PostController
     */
    public function addPostThumbnail(PostModel $post)
    {
        if ($this->options['addFeaturedMedia']) {
            $post->addPostThumbnail();
        }
        return $this;
    }
    /**
     * Add link to the source
     *
     * @param PostModel $post
     * @return PostController
     */
    public function addSource(PostModel $post)
    {
        if ($this->options['addSource']) {
            $post->addSource();
        }
        return $this;
    }
   

}
