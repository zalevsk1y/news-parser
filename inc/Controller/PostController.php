<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Models\TemplateModel;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Utils\ResponseFormatter;

/**
 * Class controller for post parsing.
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
    /**
     * Post model
     *
     * @var PostModel
     */
    public $post;
    /**
     * Parsing extra options
     *
     * @var array
     */
    protected $options;
    /**
     * Parser object
     *
     * @var AbstractParseContent
     */
    protected $parser;

    /**
     * Init function
     *
     * @param AbstractParseContent $parser
     * @param ResponseFormatter $formatter
     */
    public function __construct(AbstractParseContent $parser, ResponseFormatter $formatter)
    {
        parent::__construct($formatter);
        $this->parser = $parser;
    }
    /**
     * Create post draft and return response in proper format
     *
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @param string $url of post that should be parsed and saved as draft
     * @param string $_id front end index of post that should be parsed and saved as draft
     * @return ResponseFormatter
     */
    public function create($url, $_id)
    {
        try {
            $parsed_url=parse_url($url);
            if (!is_array($parsed_url)) {
                throw new MyException(Errors::text('WRONG_OPTIONS_URL'), Errors::code('BAD_REQUEST'));
            }
            $parsing_options=$this->templateModelsFactory($parsed_url);
            $parsed_data =$this->parser->get($url, $parsing_options->getAttributes('array'));
           
            $parsed_data['authorId'] = \get_current_user_id();
            if (!$options=$parsing_options->getExtraOptions()) {
                throw new MyException(Errors::text('NO_EXTRA_OPTIONS'), Errors::code('BAD_REQUEST'));
            }
            $this->options=$options;
            //unescaped url

            $parsed_data['sourceUrl'] = $url;
         
            $this->post=$post= $this->postModelsFactory($parsed_data);
 
            //Stages of post draw creating
            $this->createDraft($post)->addSource($post)->addPostThumbnail($post);
               

            $response = $this->formatResponse->post($post->getAttributes())->addCustomData('_id', $_id)->message('success', sprintf(Success::text('POST_SAVED_AS_DRAFT'), $post->title));
        } catch (MyException $e) {
            $response = $this->formatResponse->error($e->getCode())->message('error', $e->getMessage())->addCustomData('_id', $_id);
        }
        return $response;
    }
   
    /**
     * Create WP post draft
     *
     * @param PostModel $post
     * @return PostController
     */
    protected function createDraft(PostModel $post)
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
    protected function addPostThumbnail(PostModel $post)
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
    protected function addSource(PostModel $post)
    {
        if ($this->options['addSource']) {
            $post->addSource();
        }
        return $this;
    }
   /**
    * Get instance of PostModel class.
    *
    * @param array $data Structure:
    * [title] - post title @string
    * [image] - post main image url @string
    * [body] - post content @string|@array
    * [sourceUrl]-url of source page @string
    * [authorId]- id of wp-post author
    * @return PostModel
    */
    protected function postModelsFactory($data)
    {
        return new PostModel($data);
    }
    /**
    * Get instance of TemplateModel class.
    *
    * @param array $url Structure:
    * [scheme] - protocol
    * [host] - host name
    * [path] - path to resource
    * [fragment] - path fragment
    * @return TemplateModel
    */
    protected function templateModelsFactory($url)
    {
        return new TemplateModel($url['host']);
    }
}
