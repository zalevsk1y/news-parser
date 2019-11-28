<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ControllerInterface;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Message\Error;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Parser\ParseContent;
use NewsParserPlugin\Utils\PipeController;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Utils\Settings;

/**
 * Class controller for post
 *
 * PHP version 7.2.1
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class PostController 
{
    protected $postFactory;
    protected $postData;
    protected $optionsFactory;
    protected $options;
    protected $formatResponse;
    protected $postParser;


    public function __construct(ParseContent $postParser, FactoryInterface $optionsFactory, ResponseFormatter $formatter, FactoryInterface $postFactory)
    {
        $this->postParser = $postParser;
        $this->optionsFactory = $optionsFactory;
        $this->formatResponse = $formatter;
        $this->postFactory = $postFactory;
        
    }
    /**
     * Create post draft and return response in proper format
     * All facade of PostModel class methods created for convenience of using in pipe
     *
     * @param string $url of post that should be parsed and saved as draft
     * @param array $options [gallery images that was selected]
     * @return void
     */
    public function get($url, $options=array())
    {
        try {
            
            $parsing_options=$this->optionsFactory->get($url);
            $parsed_data =$this->postParser->get($url,$parsing_options->getAttributes('object'));
            $parsed_data['authorId'] = \get_current_user_id();
            $this->options=$parsing_options->getExtraOptions();
            //unescaped url

            $parsed_data['sourceUrl'] = $url;
         
            $post = $this->postFactory->get($parsed_data);
 
            //Stages of post draw creating
            $this->pipe($post)
                ->createDraft()
                ->addSource()
                ->addPostThumbnail();
               

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
     * @return PostModel
     */
    public function createDraft(PostModel $post)
    {
        $post->createDraft();
        return $post;
    }
    /**
     * Add main image to the post
     *
     * @param PostModel $post
     * @return PostModel
     */
    public function addPostThumbnail(PostModel $post)
    {
        if ($this->options['addFeaturedMedia']) {
            $post->addPostThumbnail();
        }
        return $post;
    }
    /**
     * Add link to the source
     *
     * @param PostModel $post
     * @return PostModel
     */
    public function addSource(PostModel $post)
    {
        if ($this->options['addSource']) {
            $post->addSource();
        }
        return $post;
    }
   
   
    /**
     * Facade for pipe Utils\PipeController
     *
     * @param $input_data data that would be transferred thru the pipe
     * @return PipeController
     */
    protected function pipe($input_data)
    {
        return new PipeController($this, $input_data);
    }

}
