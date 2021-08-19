<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;

/**
 * Class operates with parsing options.
 *
 * PHP version 5.6
 *
 * @package  Models
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */

class TemplateModel implements ModelInterface
{
    /**
     * Url of resource that will be source of the posts feed.
     *
     * @var string
     */
    protected $resourceUrl;
    /**
     * Extra options
     * Structure:
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
     * @param string $url Url of resource that will be source of the posts feed.
     */
    public function __construct($url)
    {
        $this->resourceUrl=$url;
        $this->hash=sha1($this->resourceUrl);
        if ($options=$this->get()) {
            $this->assignOptions($options);
        };
    }
    /**
     * Save options using wp function update_option.
     *
     * @throws MyException if options have wrong format.
     * @param array $options
     * @return boolean
     */
    public function save($options)
    {
        if (!isset($options['extraOptions'])||!isset($options['template'])) {
            throw new MyException(Errors::text('OPTIONS_WRONG_FORMAT'), Errors::code('BAD_REQUEST'));
        }
        $data=array(
            'extraOptions'=>$options['extraOptions'],
            'template'=>$options['template']
        );
        $result=update_option($this->hash, $data, '', 'no');
        if ($result) {
            $this->assignOptions($data);
        }
        return $result;
    }
    /**
     * Delete function using wp delete_option.
     *
     * @return boolean
     */
    public function delete()
    {
        return delete_option($this->hash);
    }
    /**
     * Get saved options using wp get_option()
     *
     * @return false|array
     */
    protected function get()
    {
        return get_option($this->hash);
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
    }/**
     * Assign options to object properties.
     *
     * @param array $options
     * @return void
     */
    protected function assignOptions($options)
    {
        $this->parseTemplate=$options['template'];
        $this->extraOptions=$options['extraOptions'];
    }
    /**
     * Get all options in needed format.
     *
     * @throws MyException if there is no options for that url.
     * @param string $format accept array|object|json.
     * @return array|object|string
     */
    public function getAttributes($format)
    {
        if (!isset($this->extraOptions)||!isset($this->parseTemplate)) {
            throw new MyException(Errors::text('NO_TEMPLATE'), Errors::code('BAD_REQUEST'));
        }
        $data=array(
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
