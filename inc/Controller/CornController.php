<?php

namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Models\CronDataModel;
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

class CronController extends BaseController {
    /**
     * Init function.
     *
     */
    public function __construct(ResponseFormatter $formatter)
    {
        parent::__construct($formatter);
    }
    /**
     * Creates cron options data and saves it.
     * 
     * @param string $url 
     * @param array $cronData
     * 
     * @return array
     */
    public function create($url,$cron_data)
    {
        $hash=$this->getHash($url);
        $this->modelsFactory($url,$hash,$cron_data)->save();
        return $this->formatter->message('success',Success::text('CRON_CREATED'));
    }
    protected function getCronOptions($hash){
        $hash=$this->getHash($url);
        if($cron_data=get_option($hash)){
            return $cron_data;
        }
        return false;
    }
    /**
     * Get cron options.
     * 
     * @param string $url
     * @return array
     */
    public function get($url){
        $hash=$this->getHash($url);
        if(!$cron_data=get_option($hash)){
            throw new MyException(Errors::text('CRONE_NOT_EXIST'));
        }
        $formated_crone_data=$this->modelsFactory($url,$hash,$this->getCronOptions($hash))->getAttributes('array');
        return $this->formatter->message('success',Success::text('CRONE_EXIST'))->options($formated_crone_data);
    }
    /**
     * Creates hash that used as a key for cron options saving.
     * 
     * @param string $url
     * 
     * @return string
     */
    protected function getHash($url)
    {
        return sha1('cron:'.$url);
    }
    /**
     * Get instance of CronModel class.
     *
     * @param string $url
     * @param string $hash
     * @param array $croneData
     * 
     * @return CroneDataModel
     */
    protected function modelsFactory($url,$hash,$croneData)
    {
        return new CronDataModel($hash,$url,$croneData);
    }
}