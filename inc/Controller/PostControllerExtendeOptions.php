<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Controller\PostController;
use NewsParserPlugin\Models\TemplateModelWithPostOptions;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Message\Errors;

class PostControllerExtendeOptions extends PostController{
    protected const TEMPLATE_TABLE_NAME = NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME;
    /**
     * Parsing post options
     *
     * @var array
     */
    protected $postOptions;
    /**
     * Create post draft and return response in proper format
     *
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @param string $url of post that should be parsed and saved as draft
     * @param string $_id front end index of post that should be parsed and saved as draft
     * @param string $data object with parameters for wp post
     * @return ResponseFormatter
     */
    public function create($url, $_id,$data=false)
    {
        
            $parsing_options=$this->templateModelsFactory($data);
            $parsed_data =$this->parser->get($url, $parsing_options->getAttributes('array'));
           
            $parsed_data['authorId'] = \get_current_user_id();
            if (!$extraOptions=$parsing_options->getExtraOptions()) {
                throw new MyException(Errors::text('NO_EXTRA_OPTIONS'), Errors::code('BAD_REQUEST'));
            }
            if (!$postOptions=$parsing_options->getPostOptions()) {
                throw new MyException(Errors::text('NO_POST_OPTIONS'), Errors::code('BAD_REQUEST'));
            }
           
            $this->options=$extraOptions;
            $this->postOptions=$postOptions;
            //unescaped url

            $parsed_data['sourceUrl'] = $url;
         
            $this->post=$post= $this->postModelsFactory($parsed_data);
 
            //Stages of post draw creating
            $this->createPost($post,$postOptions)->addSource($post)->addPostThumbnail($post);
            
        return $post->getAttributes();
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