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

class CronController 
{
    protected const CRON_TABLE_NAME=NEWS_PURSER_PLUGIN_CRON_OPTIONS_NAME;
    /**
     * Creates cron options data and saves it.
     * 
     * @param string $url 
     * @param array $cronData
     * 
     * @return array
     */
    public function create($cron_data)
    {
        $cron_model=$this->modelsFactory($cron_data);
        $cron_timestemp=time();
        if($cron_model->getStatus()=='active') $cron_model->setTimestamp($cron_timestemp);
        $cron_model->save();
        if(!$this->isCronExists($cron_model->getInterval())){
            $this->setCron($cron_model->getInterval(),$cron_timestemp);
        }
        return $cron_model->getAttributes('array');
    }
    public function getAll()
    {
        if(!$crons_data=$this->getOption(self::CRON_TABLE_NAME)){
            return [];
        }
        return $crons_data;
    }
    /**
     * Get cron job options data.
     * 
     * @param string $url
     * @return array
     */
    public function get($url=null)
    {
        $crons_data=$this->getAll();
        if($url==null) return $crons_data;
        if(isset($crons_data[$url])){
            $formated_cron_data=$this->modelsFactory($crons_data[$url])->getAttributes('array');
            return $formated_cron_data;
        }
        $default_cron_options=$this->getDefaultCronOptions();
        $default_cron_options['url']=$url;   
        return $default_cron_options;
    }
    /**
     * Delete cron options.
     * 
     * @param string $url
     * @return null
     * 
     */
    public function delete($url)
    {
        $crons_data=$this->getAll();
        $cron_model=$this->modelsFactory($crons_data[$url]);
        if(isset($crons_data[$url])){
            unset($crons_data[$url]);
        }
        $this->updateOption(self::CRON_TABLE_NAME,$crons_data);
        //check if there still left some crons that should be run in the same interval
        //if none remove runing wp_cron in this interval
        if(!$this->isIntervalActive($cron_model->getInterval(),$crons_data)){
            $this->unsetCron($cron_model->getInterval());
        }
        $default_cron_options=$this->getDefaultCronOptions();
        $default_cron_options['url']=$url;
        return $default_cron_options;
    }
    /**
    * Check if there are any active cron jobs with the specified interval.
    *
    * @param int $interval The interval to check.
    * @param array $cron_data An array of cron job data.
    * @return bool True if there are active cron jobs with the specified interval, false otherwise.
    */
    protected function isIntervalActive($interval,$cron_data)
    {
        $active_crons=array_filter($cron_data,function($cron_data) use ($interval)
        {
            return $cron_data['interval']==$interval&&$cron_data['status']=='active';
        });
        return count($active_crons)>0;
    }
    /**
     * Check if a cron job with the specified interval exists.
     *
     * @param string $interval The interval of the cron job to check.
     * @return int|false The timestamp of the next scheduled run of the cron job, or false if the cron job does not exist.
     */

    protected function isCronExists($interval)
    {
        return wp_next_scheduled(NEWS_PARSER_CRON_ACTION_PREFIX.$interval,array($interval));
    }
    /**
    * Schedule a new cron job with the specified interval.
    *
    * @param int $interval The interval of the new cron job, in seconds.
    * @param int $cron_timestemp The timestamp of the next scheduled run of the cron job, in Unix timestamp format.
    * @return void
    */
    protected function setCron($interval,$cron_timestemp)
    {
        wp_schedule_event($cron_timestemp, $interval, NEWS_PARSER_CRON_ACTION_PREFIX.$interval,array($interval));
    }
    /**
     * Unschedule a cron job with the specified interval.
     *
     * @param string $interval The interval of the cron job to unschedule.
     * @return void
     */
    protected function unsetCron($interval)
    {
        $timestamp = $this->isCronExists($interval);
        if($timestamp) return wp_unschedule_event( $timestamp, NEWS_PARSER_CRON_ACTION_PREFIX.$interval,array($interval));

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
    protected function updateOption($key,$value,$autoupdate=null){
       return update_option($key,$value,$autoupdate);
    }
    protected function getOption($key){
        return get_option($key);
    }
    protected function getDefaultCronOptions()
    {
        return CronDataModel::DEFAULT_CRONE_OPTIONS;
    }
}