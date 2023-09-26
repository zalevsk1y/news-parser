<?php

namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Models\TemplateModel;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Interfaces\AdapterInterface;
use NewsParserPlugin\Traits\FunctionAutoloadTrait;
use NewsParserPlugin\Interfaces\PostControllerInterface;

/**
 * Class controller for post parsing.
 *
 *
 * @package  Controller
 * @license  MIT
 */
class PostController implements PostControllerInterface
{

    /**
     * Methods to get function psr-4 like way.
     *
     * @method loadFunction()
     * @method executerCallback()
     */
    use FunctionAutoloadTrait;
    /**
     * @var PostModel Post model
     */
    protected $post;
    protected $beforeAdapterModifiers;
    protected $postModifiers;
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
     * Class Constructor.
     *
     * Initializes the class instance.
     *
     * @param AbstractParseContent $parser Parser instance for parsing content.
     * @param AdapterInterface $adapter Adapter instance that converts array of body elements data.
     * @param array $before_adapter_modifiers (optional) Associative array of modifiers to be applied before the adapter conversion. The format is as follows:
     *   [
     *     'option_id' => [
     *          'path_to_true_modifier_function',
     *          'path_to_false_modifier_function'
     *         ],
     *          ...
     *         ]
     * The 'option_id' is the identifier of the option.
     * The 'path_to_true_modifier_function' is the full PSR-4 like path to the modifier function that will be applied if the 'option_id' is true.
     * The 'path_to_false_modifier_function' is the full PSR-4 like path to the modifier function that will be applied if the 'option_id' is false.
     * @param array $post_modifiers (optional) Associative array of modifiers to be applied after the adapter conversion. The format is the same as the before_adapter_modifiers array.
     */

    public function __construct(AbstractParseContent $parser, AdapterInterface $adapter,array $before_adapter_modifiers=[],array $post_modifiers=[])
    {
        $this->adapter = $adapter;
        $this->parser = $parser;
        $this->beforeAdapterModifiers=$before_adapter_modifiers;
        $this->postModifiers=$post_modifiers;
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

        $this->assignAuthorId();
        
        // Unescaped URL
        $this->assignSourceUrl($url);
        $this->applyBeforAdapterModifiers();
        // Apply adapter to adapt parsed body of the post to editor or make changes according to options
        $this->applyBodyAdapter();
       
        // Get post model
        $this->post =  $this->postModelsFactory();
        $this->createPost();

        // Apply modifiers to post according to template post options
        $this->applyPostModifiers();

        return $this->post->getAttributes();
    }
    /**
     * Retrieves the parsed data associated with the PostController.
     *
     * This method returns the parsed data stored in the PostController object.
     *
     * @return array The parsed data associated with the PostController.
     */ 

    public function getParsedData()
    {
        return $this->parsedData;
    }
    /**
     * Updates the body array in the parsed data of the PostController.
     *
     * This method takes an array of body elements and updates the 'body' key in the parsed data of the PostController with the provided array.
     *
     * @param array $body_array The array of body elements to update the parsed data with.
     * @return void
     */

    public function updateParsedDataBody(array $body_array)
    {
        $this->parsedData['body']=$body_array;
    }
    /**
     * Apply body adapter to parsed data
     */
    protected function applyBodyAdapter()
    {
        $pre_adapted_body = \apply_filters('news_parser_filter_pre_adapter', $this->parsedData['body']);
        $post_adapter_body = $this->adapter->convert($pre_adapted_body);
        $this->parsedData['body'] = \apply_filters('news_parser_filter_post_adapter', $post_adapter_body);
    }
    /**
     * Add modifiers to the adapter.
     *
     * The modifiers array should be in the following format:
     * 
     * [
     *    'option_id' => [
     *        'path_to_true_modifier_function',
     *        'path_to_false_modifier_function'
     *    ],
     *    ...
     * ]
     *
     * The 'option_id' is the identifier of the option.
     * The 'path_to_true_modifier_function' is the full PSR-4 like path to the modifier function that will be applied if the 'option_id' is true.
     * The 'path_to_false_modifier_function' is the full PSR-4 like path to the modifier function that will be applied if the 'option_id' is false. If a false modifier is not provided, it can be set as null.
     *
     * Syntax Example:
     * $modifiers_array = [
     *    'option1' => [
     *        'Namespace\Modifiers\TrueModifier',
     *        'Namespace\Modifiers\FalseModifier'
     *    ],
     *    'option2' => [
     *        'Namespace\Modifiers\AnotherTrueModifier',
     *        null
     *    ],
     *    ...
     * ];
     *
     * @return void
     */

    protected function applyBeforAdapterModifiers()
    {
        //add modifier that removes duplicated images from parsed data
        $this->executerCallback($this,'NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before\removeDublicatedPicturesModifier');
        foreach ($this->beforeAdapterModifiers as $option_id=>$modifier_function){
            if(array_key_exists($option_id,$this->options)&&$this->options[$option_id]) 
            {
                $this->executerCallback($this,$modifier_function[0]);

            }else if($modifier_function[1]!==null){
                $this->executerCallback($this,$modifier_function[1]);
            }
        }
    }
    /**
     * Apply post modifiers to the adapter.
     *
     * The `executerCallback` function is a trait that allows executing a function by given path in a PSR-4 like way.
     *
     * The modifiers array should be in the following format:
     * 
     * [
     *    'option_id' => [
     *        'path_to_true_modifier_function',
     *        'path_to_false_modifier_function'
     *    ],
     *    ...
     * ]
     *
     * The 'option_id' is the identifier of the option.
     * The 'path_to_true_modifier_function' is the full PSR-4 like path to the modifier function that will be applied if the 'option_id' is true.
     * The 'path_to_false_modifier_function' is the full PSR-4 like path to the modifier function that will be applied if the 'option_id' is false.
     *
     * Syntax Example:
     * $modifiers_array = [
     *    'option1' => [
     *        'Namespace\Modifiers\TrueModifier',
     *        'Namespace\Modifiers\FalseModifier'
     *    ],
     *    'option2' => [
     *        'Namespace\Modifiers\AnotherTrueModifier',
     *        'Namespace\Modifiers\AnotherFalseModifier'
     *    ],
     *    ...
     * ];
     *
     * @return void
     */

    protected function applyPostModifiers()
    {
        foreach ($this->postModifiers as $option_id=>$modifier_function){
            if(array_key_exists($option_id,$this->options)&&$this->options[$option_id])
            {
                $this->executerCallback($this->post,$modifier_function[0]);

            } else if ($modifier_function[1]!==null)
            {
                $this->executerCallback($this->post,$modifier_function[1]);
            }
        }
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
