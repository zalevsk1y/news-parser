<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\TemplateModelWithPostOptions as TemplateModel;
use NewsParserPlugin\Utils\ResponseFormatter;

/**
 * Class saves received options.
 *
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class TemplateController extends BaseController
{   
    protected const TEMPLATE_TABLE_NAME = NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME;
    /**
     * Init function.
     *
     */
    public function __construct(ResponseFormatter $formatter)
    {
        parent::__construct($formatter);
    }
    /**
     * Save received options.
     *
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @uses NewsParserPlugin\Controller\BaseController::modelsFactory
     * @uses NewsParserPlugin\Utils\ResponseFormatter::message()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::error()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::get()
     * @uses NewsParserPlugin\Models\TemplateModel::save()
     * @param string $url
     * @param array $options
     * @return ResponseFormatter
     */
    public function create($options)
    {
        $template_model = $this->modelsFactory($options);
        $template_model->save();
        $response = $this->formatResponse->message('success', Success::text('TEMPLATE_SAVED'));
        return $response;
    }
    public function get($url)
    {   
        if($url==null){
            return $this->getList();
        }
        $templates=$this->getAll();
        if(isset($templates[$url])){
            $template_model = $this->modelsFactory($templates[$url]);
            return $this->formatResponse->message('success', Success::text('TEMPLATE_EXIST'))->options($template_model->getAttributes('array'));
        }
        return $this->formatResponse->message('info', Errors::text('NO_TEMPLATE'))->options(null);
    }
    protected function getAll()
    {
        if(!$templates=get_option(self::TEMPLATE_TABLE_NAME)){
            return [];
        }
        return $templates;
    }
    protected function getList()
    {
        $templates = $this->getAll();
        if (is_array($templates)) {
            return $this->formatResponse->message('success', '')->options(array_keys($templates));  
        }
        return $this->formatResponse->message('info', Errors::text('NO_TEMPLATE'))->options(null);
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
    protected function modelsFactory($template_options)
    {
        $template_model = new TemplateModel($template_options);
        return $template_model;
    }
}
