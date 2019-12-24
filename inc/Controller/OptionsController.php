<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\OptionsModel;

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

class OptionsController extends BaseController
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
     * @uses NewsParserPlugin\Models\OptionsModel::save()
     * @param string $url
     * @param array $options
     * @return string
     */
    public function create($url,$options)
    {
        $parsed_url=parse_url($url);
        try{
            if(!is_array($parsed_url)) throw new MyException (Errors::text('WRONG_OPTIONS_URL'));
            $optionsModel=$this->modelsFactory($parsed_url);
            $optionsModel->save($options);
            $response=$this->formatResponse->message('success',Success::text('TEMPLATE_SAVED'))->get('json');
            
        }catch(MyException $e){
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }    
        return $response;
    }
     /**
    * Get instance of OptionsModel class.
    *
    * @param array $url Structure:
    * [scheme] - protocol
    * [host] - host name 
    * [path] - path to resource
    * [fragment] - path fragment
    * @return OptionsModel
    */
    protected function modelsFactory($url){
        return new OptionsModel($url['host']);
    }
}