<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use function NewsParserPlugin\Models\Factory\getCronModel;
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
    public function create($cron_data)
    {
        $this->modelsFactory($cron_data)->save();
        return $this->formatResponse->message('success',Success::text('CRON_CREATED'));
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
        return $this->formatResponse->message('info',Errors::text('NO_CRON'))->options(null);
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
        return getCronModel($cron_data);
    }
}