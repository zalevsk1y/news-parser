<?php
namespace NewsParserPlugin\Models\Factory;

use NewsParserPlugin\Models\CronDataModel;

/**
 * Class operates with Cron options.
 *
 * PHP version 5.6
 *
 * @package  Models
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */

function getCronModel($url){
    $cronOptions=get_option(NEWS_PURSER_PLUGIN_CRON_OPTIONS_NAME);
    if(!$cronOptions){
        return false;
    }
    if(isset($cronOptions[$url])){
        return new CronDataModel($cronOptions[$url]);
    }
    return false;
}