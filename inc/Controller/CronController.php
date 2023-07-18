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

class CronController extends BaseController 
{
    protected const CRON_TABLE_NAME=NEWS_PURSER_PLUGIN_CRON_OPTIONS_NAME;
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
    public function update($cron_data)
    {
        $cron_model=$this->modelsFactory($cron_data);
        if($cron_model->getStatus()=='active') $cron_model->setTimestamp(time());
        $cron_model->save();
        return $this->formatResponse->message('success',Success::text('CRON_CREATED'))->options($cron_model->getAttributes('array'));
    }
    public function getAll()
    {
        if(!$cron_data=get_option(self::CRON_TABLE_NAME)){
            return [];
        }
        return $cron_data;
    }
    /**
     * Get cron options.
     * 
     * @param string $url
     * @return array
     */
    public function get($url=null){
        $cron_data=$this->getAll();
        if($url==null) return $this->formatResponse->message('success',Success::text('CRON_EXIST'))->options($cron_data);
        if(isset($cron_data[$url])){
            $formated_cron_data=$this->modelsFactory($cron_data[$url])->getAttributes('array');
            return $this->formatResponse->message('success',Success::text('CRON_EXIST'))->options($formated_cron_data);
        }
        $default_cron_options=$this->getDefaultCronOptions();
        $default_cron_options['url']=$url;   
        return $this->formatResponse->message('info',Errors::text('NO_CRON'))->options($default_cron_options);
    }
    /**
     * Delete cron options.
     * 
     * @param string $url
     * @return null
     * 
     */
    public function delete($url){
        $cron_data=$this->getAll();
        if(isset($cron_data[$url])){
            unset($cron_data[$url]);
        }
        update_option(self::CRON_TABLE_NAME,$cron_data);
        $default_cron_options=$this->getDefaultCronOptions();
        $default_cron_options['url']=$url;
        return $this->formatResponse->message('success',Success::text('CRON_DELETED'))->options($default_cron_options);
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
    protected function modelsFactory($cron_data)
    {
        return new CronDataModel($cron_data);
    }
    protected function getDefaultCronOptions()
    {
        return CronDataModel::DEFAULT_CRONE_OPTIONS;
    }
}