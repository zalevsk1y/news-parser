<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Models\TemplateModelWithPostOptions;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Message\Errors;


/**
 * Class PostControllerExtendeOptions
 *
 * This class extends the `PostController` class and provides additional functionality related to extended options for posts.
 */

class PostControllerExtendeOptions extends PostController{
    protected const TEMPLATE_TABLE_NAME = NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME;
    /**
     * Parsing post options
     *
     * @var array
     */
    protected $postOptions;
   /**
     * Get the PostOptionsModel instance.
     *
     * @param int $options_id The ID of the options.
     * @return PostOptionsModel The PostOptionsModel instance.
     * @throws MyException If no extra options or post options are available.
     */

    protected function getPostOptionsModel($options_id)
    {
        $options_model=$this->templateModelsFactory($options_id);
        if (!$extraOptions=$options_model->getExtraOptions()) {
            throw new MyException(Errors::text('NO_EXTRA_OPTIONS'), Errors::code('BAD_REQUEST'));
        }
        if (!$postOptions=$options_model->getPostOptions()) {
            throw new MyException(Errors::text('NO_POST_OPTIONS'), Errors::code('BAD_REQUEST'));
        }
        $this->options=$extraOptions;
        $this->postOptions=$postOptions;
        return $options_model;
    } 
    /**
     * Create the post using the post options.
     *
     * @return $this The current instance of the class.
     */

    protected function createPost()
    {
            $this->post->createPost($this->postOptions);
        
    }
    /**
     * Add modifiers to adapter
     */
    protected function addAdapterModifiers()
    {
        $modifiers_array=[
            'NewsParserPlugin\Parser\Modifiers\removeDublicatedPicturesModifier'
        ];
        if ($this->options['groupImagesRow']) {
            array_push($modifiers_array,'NewsParserPlugin\Parser\Modifiers\groupPicturesModifier');
        }
        
        $this->adapter->addModifiers($modifiers_array);
    }
    protected function applyOptionsModifiers()
    {
        $this->addSource()->addPostThumbnail();
    }
    
    /**
    * Get instance of TemplateModel class.
    *
    * @param array $url Structure:
    * [scheme] - protocol
    * [host] - host name
    * [path] - path to resource
    * [fragment] - path fragment
    * @return TemplateModelWithPostOptions
    */
    protected function templateModelsFactory($template_url)
    {
        $template_data=get_option(self::TEMPLATE_TABLE_NAME);  
        return new TemplateModelWithPostOptions($template_data[$template_url]);
    }
}