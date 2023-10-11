<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Controller\EventController;
use NewsParserPlugin\Models\CronDataModel;
use NewsParserPlugin\Exception\MyException;

class CronTaskController {

    protected const CRON_TABLE_NAME=NEWS_PURSER_PLUGIN_CRON_OPTIONS_NAME;
    public function __construct(EventController $event){
        $this->event=$event;
    }
    public function cronTaskCallback($interval){
        $cron_options=$this->getCronOptions(array('interval',$interval));
        foreach ($cron_options as $cron_options_data){
            $cron_options_model=$this->getCronOptionsModel($cron_options_data);
            if($cron_options_model->getCronCalls()<$cron_options_model->getMaxCronCalls())
            { 
                $rss_list=$this->event->trigger('list:get',array($cron_options_model->getUrl()));
                $last_parsed_post_timestamp=$cron_options_model->getTimestamp();
                $this->parsePosts(array_filter($rss_list,function($post_data) use ($last_parsed_post_timestamp){
                    return strtotime($post_data->pubDate)>$last_parsed_post_timestamp;
                }),$cron_options_model);
                $cron_options_model->increaseCronCalls();
                $cron_options_model->save();
            }
        };
    }
    protected function parsePosts($posts_rss_data,$cron_options_model){
        //to avoid sorting data by pubDate use $latest_timestamp
        $latest_timestamp=$cron_options_model->getTimestamp();
        foreach (array_reverse($posts_rss_data) as $post_data){
            if($cron_options_model->getParsedPosts()<$cron_options_model->getMaxPostsParsed())
            {
                try{
                    $this->event->trigger('post:create',array($post_data->link,null,$cron_options_model->getUrl()));
                }catch (MyException $e)
                {
                   //ToDo: should add some logging 
                    continue;
                }
                $cron_options_model->increaseParsedPosts();
                $post_timestamp=strtotime($post_data->pubDate);
                if($latest_timestamp<$post_timestamp) $latest_timestamp=$post_timestamp;
            } else {
                break;
            }
        }
        return $cron_options_model->setTimestamp($latest_timestamp);
    }
    protected function getCronOptionsModel($cron_options_data){
        return new CronDataModel($cron_options_data);
    }
    protected function getCronOptions($filter_data=[]){
        if($crons_options=$this->getOption(self::CRON_TABLE_NAME)){
            return $crons_options;
            if(count($filter_data)){
               return array_filter($crons_options,function($cron_options)use($filter_data){
                    return $cron_options[$filter_data[0]]==$filter_data[1];
                });
            }
        }
        
       return array();
    }
    protected function getOption($key)
    {
        return get_option($key);
    }
}