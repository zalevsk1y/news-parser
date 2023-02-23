<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\TemplateModel;
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
    public function create($url, $options)
    {

        $template_model = $this->modelsFactory($url);
        $template_model->save($options);
        $response = $this->formatResponse->message('success', Success::text('TEMPLATE_SAVED'));

        return $response;
    }
    public function get($url)
    {
        $TemplateModel = $this->modelsFactory($url);
        $template_options = $TemplateModel->queryAttributes('array');
        if ($template_options==null) return $this->formatResponse->message('info', Errors::text('NO_TEMPLATE'));
        return $this->formatResponse->message('success', Success::text('TEMPLATE_EXIST'))->options($template_options);
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
    protected function modelsFactory($url)
    {
        $parsed_url = parse_url($url);

        if (!is_array($parsed_url)) {
            throw new MyException(Errors::text('WRONG_OPTIONS_URL'), Errors::code('BAD_REQUEST'));
        }
        $template_model = new TemplateModel($parsed_url['host']);

        return $template_model;
    }
}
