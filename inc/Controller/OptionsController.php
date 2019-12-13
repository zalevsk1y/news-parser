<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;

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

class OptionsController
{
    /**
     * Factory for creating OptionsModel.
     *
     * @var FactoryInterface
     */
    protected $optionsFactory;
    /**
     * Instance of response formatter class.
     *
     * @var ResponseFormatter
     */
    protected $formatResponse;
    /**
     * Init function
     *
     * @param FactoryInterface $optionsFactory
     * @param ResponseFormatter $formatter
     */
    public function __construct(FactoryInterface $optionsFactory,ResponseFormatter $formatter)
    {
        $this->optionsFactory=$optionsFactory;
        $this->formatResponse=$formatter;
    }
    /**
     * Save received options.
     *
     * @uses NewsParserPlugin\Interfaces\FactoryInterface::get()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::message()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::error()
     * @uses NewsParserPlugin\Utils\ResponseFormatter::get()
     * @uses NewsParserPlugin\Models\OptionsModel::save()
     * @param string $url
     * @param array $options
     * @return string
     */
    public function save($url,$options)
    {
        $parsed_url=parse_url($url);
        try{
            if(!is_array($parsed_url)) throw new MyException (Errors::text('WRONG_OPTIONS_URL'));
            $optionsModel=$this->optionsFactory->get($parsed_url);
            $optionsModel->save($options);
            $response=$this->formatResponse->message('success',Success::text('TEMPLATE_SAVED'))->get('json');
            
        }catch(MyException $e){
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }    
        return $response;
    }
    
}