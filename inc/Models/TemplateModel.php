<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;

/**
 * Class TemplateModel
 *
 * This class represents a model that operates with parsing options.
 *
 * @package  Models
 * @license  MIT
 */


class TemplateModel implements ModelInterface
{
    /**
     * The name of the template table.
     */

    protected const TEMPLATE_TABLE_NAME = NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME;
    /**
     * Url of resource that will be source of the posts feed.
     *
     * @var string
     */
    protected $resourceUrl;
    /**
     * Extra options
     * Structure:
     * [addSrcSetAndSizes] - bool - add sizes attribute with image sizes breakpoints
     * [groupImagesRow] - bool - Groups images in Guttenberg group by two and arrange them in a row
     * [addFeaturedMedia]- bool- Add featured media to the post.
     * [addSource] -bool - Add link to the source page to th end of the post.
     *
     * @var array
     */
    protected $extraOptions;
    /**
     * Template patterns need to automatic parse data from the page.
     * [className]- HTML Class name of the tag that contain post content.
     * [tagName]- tag name of the tag that contain post content.
     * [searchTemplate] - search pattern to get node from DOM using HtmlDomParser.
     * [children] - array of child node elements that contain elements of the post data.
     *      Structure:
     *          [tagName]-name of the tag? helps determine type of content e.g image, title etc.
     *          [searchTemplate] -search pattern to get node from DOM using HtmlDomParser.
     *          [position] - current value 'all'.
     * @var array
     */
    protected $parseTemplate;
    /**
     * Hash of resource url using as a key value.
     *
     * @var string
     */
    protected $hash;
    /**
     * init function
     *
     * @param array of template optrions.
     * [url]
     * [template]
     * [extraOptions]
     */
    public function __construct(array $template_data)
    {
        if (!$this->isOptionsValid($template_data)) {
            throw new MyException(Errors::text('OPTIONS_WRONG_FORMAT'), Errors::code('BAD_REQUEST'));
        }
        $this->assignOptions($template_data);
    }
    /**
     * Save options using wp function update_option.
     *
     * @throws MyException if options have wrong format.
     * @param array $options
     * @return boolean
     */
    public function create()
    {
        $templates=$this->getAll();
        $template_data=$this->getAttributes('array');
        if(!is_array($templates)) $templates=[];
        $templates[$this->resourceUrl]=$template_data;
        return $this->updateOptions(self::TEMPLATE_TABLE_NAME, $templates, 'no');
    }
    /**
     * Update options using wp function update_option.
     *
     * @param string $key The option key.
     * @param mixed $data The option data.
     * @param string|null $autoload Optional. Whether to load the option when WordPress starts up ('yes' or 'no').
     *
     * @return bool Returns true if the options were successfully updated, false otherwise.
     */

    public function update()
    {
        $templates=$this->getAll();
        if(array_key_exists($this->resourceUrl,$templates)){
            return $this->updateOptions(self::TEMPLATE_TABLE_NAME, $templates, 'no');
        }
        return false;
    }
    /**
     * Delete options using wp function update_option.
     *
     * @return bool Returns true if the options were successfully deleted, false otherwise.
     */

    public function delete (){
        $templates=$this->getAll();
        if(array_key_exists($this->resourceUrl,$templates)){
            unset($templates[$this->resourceUrl]);
            return $this->updateOptions(self::TEMPLATE_TABLE_NAME, $templates, 'no');
        }
        return false;
    }
    protected function updateOptions($key,$data,$autoload=null)
    {
        return update_option($key, $data, $autoload);
    }
    /**
     * Delete function using wp delete_option.
     *
     * @return boolean
     */
    public static function deleteAll()
    {
        return delete_option(self::TEMPLATE_TABLE_NAME);
    }
    /**
     * Get saved options using wp get_option()
     *
     * @return false|array
     */
    protected function getAll()
    {
        return get_option(self::TEMPLATE_TABLE_NAME);
    }
    /**
     * Getter function for parseTemplate options.
     *
     * @return false|array
     */
    public function getTemplate()
    {
        return isset($this->parseTemplate)?$this->parseTemplate:false;
    }
    /**
     * Getter function for extra options.
     *
     * @return false|array
     */
    public function getExtraOptions()
    {
        return isset($this->extraOptions)?$this->extraOptions:false;
    }
    /**
     * Check if the options have a valid format.
     *
     * @param array $options The options to validate.
     *
     * @return bool Returns true if the options have a valid format, false otherwise.
     */

    protected function isOptionsValid($options)
    {
        if(!isset($options['extraOptions'])||
        !isset($options['template'])||
        !isset($options['url'])){
            return false; 
        }
        return true;
    }
    /**
     * Assign options to object properties.
     *
     * @param array $options
     * @return void
     */
    protected function assignOptions($options)
    {
        $this->resourceUrl=$options['url'];
        $this->parseTemplate=$options['template'];
        $this->extraOptions=$options['extraOptions'];
    }
    /**
     * Get all options in needed format. If no options found return Exception.
     *
     * @throws MyException if there is no options for that url.
     * @param string $format accept array|object|json.
     * @return array|object|string
     */
    public function getAttributes($format)
    {
       return $this->formatAttributes($format);
    }
    /**
     * Return options data in proper format.
     * 
     * @param string $format accept array|object|json.
     * @return array|object|string
     */
    protected function formatAttributes($format)
    {
        $data=array(
            'url'=>$this->resourceUrl,
            'extraOptions'=>$this->extraOptions,
            'template'=>$this->parseTemplate
        );
        switch ($format) {
            case 'array':
                return $data;
            case 'object':
                return $this;
            case 'json':
                return json_encode($data);
        }
    }
}
