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

class TemplateController 
{   
    protected const TEMPLATE_TABLE_NAME = NEWS_PURSER_PLUGIN_TEMPLATE_OPTIONS_NAME;
   
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
        return $template_model->getAttributes('array');
    }
    public function get($url)
    {   
        $templates=$this->getAll();
        if($url==null){
            return array_keys($templates);
        }
        if(isset($templates[$url])){
            $template_model = $this->modelsFactory($templates[$url]);
            return $template_model->getAttributes('array');
        } 
        return false;
    }
    protected function getAll()
    {
        if(!$templates=get_option(self::TEMPLATE_TABLE_NAME)){
            return [];
        }
        return $templates;
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
