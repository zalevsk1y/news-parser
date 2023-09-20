<?php

namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Models\TemplateModel;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Interfaces\AdapterInterface;

/**
 * Class controller for post parsing.
 *
 * PHP version 5.6
 *
 * @package  Controller
 * @license  MIT
 */
class PostController
{
    /**
     * @var PostModel Post model
     */
    public $post;

    /**
     * @var array $parsedData Structure:
     * [title] - post title @string
     * [image] - post main image url @string
     * [body] - post content @string|@array
     * [sourceUrl] - url of source page @string
     * [authorId] - id of wp-post author
     */
    protected $parsedData;

    /**
     * @var array Parsing extra options
     */
    protected $options;

    /**
     * @var AbstractParseContent Parser object
     */
    protected $parser;

    /**
     * Init function
     *
     * @param AbstractParseContent $parser Parser instance for parsing content.
     * @param AdapterInterface $adapter Adapter instance that converts array of body elements data.
     */
    public function __construct(AbstractParseContent $parser, AdapterInterface $adapter)
    {
        $this->adapter = $adapter;
        $this->parser = $parser;
    }

    /**
     * Create post draft and return response in proper format
     *
     * @param string $url URL of post that should be parsed and saved as draft.
     * @param string $_id Front-end index of post that should be parsed and saved as draft.
     * @param string $template_url Object with parameters for WP post.
     * @return array
     * @throws MyException
     */
    public function create($url, $_id, $template_url = false)
    {
        $parsed_url = parse_url($url);
        if (!is_array($parsed_url)) {
            throw new MyException(Errors::text('WRONG_OPTIONS_URL'), Errors::code('BAD_REQUEST'));
        }
        $post_options_model = $this->getPostOptionsModel($template_url);
        $this->parsedData = $this->parser->get($url, $post_options_model->getAttributes('array'));

        // Apply adapter to adapt parsed body of the post to editor or make changes according to options
        $this->applyBodyAdapter();
        $this->assignAuthorId();
        
        // Unescaped URL
        $this->assignSourceUrl($url);

        // Get post model
        $this->post =  $this->postModelsFactory();
        $this->createPost();

        // Apply modifiers to post according to template post options
        $this->applyOptionsModifiers();

        return $this->post->getAttributes();
    }

    /**
     * Apply body adapter to parsed data
     */
    protected function applyBodyAdapter()
    {
        $this->addAdapterModifiers();
        $pre_adapted_body = \apply_filters('news_parser_filter_pre_adapter', $this->parsedData['body']);
        $post_adapter_body = $this->adapter->convert($pre_adapted_body);
        $this->parsedData['body'] = \apply_filters('news_parser_filter_post_adapter', $post_adapter_body);
    }
    /**
     * Add modifiers to adapter
     */
    protected function addAdapterModifiers()
    {
        $this->adapter->addModifiers([
            'NewsParserPlugin\Parser\Modifiers\removeDublicatedPicturesModifier',
            'NewsParserPlugin\Parser\Modifiers\groupPicturesModifier'
        ]);
    }

    /**
     * Get the post options model based on the given options ID
     *
     * @param string $options_id ID of the template options.
     * @return TemplateModel
     * @throws MyException
     */
    protected function getPostOptionsModel($options_id)
    {
        $options_model = $this->templateModelsFactory($options_id);
        if (!$options = $options_model->getExtraOptions()) {
            throw new MyException(Errors::text('NO_EXTRA_OPTIONS'), Errors::code('BAD_REQUEST'));
        }
        $this->options = $options;
        return $options_model;
    }

    /**
     * Assign the current user's ID as the author ID
     */
    protected function assignAuthorId()
    {
        $this->parsedData['authorId'] = apply_filters('news_parser_filter_author_id', \get_current_user_id());
    }

    /**
     * Assign the source URL to the parsed data
     *
     * @param string $url Source URL to assign.
     */
    protected function assignSourceUrl($url)
    {
        $this->parsedData['sourceUrl'] = $url;
    }

    /**
     * Apply options modifiers to the post
     */
    protected function applyOptionsModifiers()
    {
        $this->addSource()->addPostThumbnail();
    }

    /**
     * Create a WP post
     */
    protected function createPost()
    {
        $this->post->createPost();
    }

    /**
     * Add the main image to the post
     */
    protected function addPostThumbnail()
    {
        if ($this->options['addFeaturedMedia']) {
            $this->post->addPostThumbnail();
        }
        return $this;
    }

    /**
     * Add the link to the source
     */
    protected function addSource()
    {
        if ($this->options['addSource']) {
            $this->post->addSource();
        }
        return $this;
    }

    /**
     * Get an instance of the PostModel class.
     *
     * @return PostModel
     */
    protected function postModelsFactory()
    {
        return new PostModel($this->parsedData);
    }

    /**
     * Get an instance of the TemplateModel class.
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
