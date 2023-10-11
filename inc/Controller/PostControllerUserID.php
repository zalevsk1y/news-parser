<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Models\TemplateModelWithUserID as TemplateModel;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Message\Errors;


/**
 * Class PostControllerExtendeOptions
 *
 * This class extends the `PostController` class and provides additional functionality related to extended options for posts.
 */

class PostControllerUserID extends PostControllerExtendeOptions
{
    protected const TEMPLATE_TABLE_NAME = NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME;
    /**
     * User ID of post author
     */
    protected $authorID;
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
        $options_model=parent::getPostOptionsModel($options_id);
        $this->authorID=$options_model->getUserID();
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
    * Get instance of TemplateModel class.
    *
    * @param array $url of rss feed that used as templateID
    * @return TemplateModelWithUserID
    */
    protected function templateModelsFactory($template_url)
    {
        $template_data=get_option(self::TEMPLATE_TABLE_NAME);  
        return new TemplateModel($template_data[$template_url]);
    } 
     /**
     * Assign the template creator user's ID of as the author ID
     */
    protected function assignAuthorId(){
        $this->parsedData['authorId'] = apply_filters('news_parser_filter_author_id', $this->authorID);
    }
}