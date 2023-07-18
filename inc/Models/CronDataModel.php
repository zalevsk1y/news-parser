<?php
namespace NewsParserPlugin\Models;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ModelInterface;
use NewsParserPlugin\Message\Errors;

/**
 * Class operates with Cron options.
 *
 * PHP version 5.6
 *
 * @package  Models
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */

class CronDataModel implements ModelInterface
{
    protected const CRONE_OPTIONS_TABLE = NEWS_PURSER_PLUGIN_CRON_OPTIONS_NAME;
    public const DEFAULT_CRONE_OPTIONS = [
        'url'=>'',
        'maxCronCalls'=>'',
        'maxPostsParsed'=>'',
        'interval'=>'hourly',
        'timestamp'=>0,
        'cronCalls'=>0,
        'parsedPosts'=>0,
        'status'=>'idle'
    ];

    /**
     * Url of resource that will be source of the posts feed.
     *
     * @var string
     */
    protected $resourceUrl;
    protected $maxCronCalls;
    protected $maxPostsParsed;
    protected $interval;
    /**
    * Timestamp of last parsed post
    *
    * @var int
    */
    protected $timestam;
    /**
    * Crone calls counter
    *
    * @var int
    */
    protected $cronCalls;
    /**
    * Parsed posts counter
    *
    * @var int
    */
    protected $parsedPosts;
    /**
    * Timestamp of last parsed post
    *
    * @var string 'active' | 'idle'
    */
    protected $status;
    /**
     * init function
     *
     * @param string $url Url of resource that will be source of the posts feed.
     */
    public function __construct($cron_data)
    {
        if (!$this->isOptionsValid($cron_data)) {
            throw new MyException(Errors::text('OPTIONS_WRONG_FORMAT'), Errors::code('BAD_REQUEST'));
        }
        $this->assignOptions($cron_data);
    }
    /**
     * Save options using wp function update_option.
     *
     * @throws MyException if options have wrong format.
     * @param array $options
     * @return boolean
     */
    public function save()
    {
       $current_cron_data=$this->formatAttributes('array');
       $cron_data=$this->get();
       $cron_data[$this->resourceUrl]=$current_cron_data;
        $result=update_option(self::CRONE_OPTIONS_TABLE, $cron_data, '', 'no');
        if ($result) {
            return true;
        }
        return false;
    }
    public function update($data){
        if(!$this->isOptionsValid($data)){
            throw new MyException(Errors::text('OPTIONS_WRONG_FORMAT'), Errors::code('BAD_REQUEST'));
        }
        $this->assignOptions($data);
        return $this->save();
    }
    protected function isOptionsValid($options){
        if (!isset($options['interval'])||
        !isset($options['maxPostsParsed'])||
        !isset($options['maxCronCalls'])||
        !isset($options['url'])||
        !isset($options['timestamp'])||
        !isset($options['cronCalls'])||
        !isset($options['parsedPosts'])||
        !isset($options['status'])) {
            return false;
        }
        return true;
    }
    /**
     * 
     */
    public function delete(){
        $crone_options=$this->get();
        if (isset($crone_options[$this->resourceUrl])) {
            unset($crone_options[$this->resourceUrl]);
        }
        return update_option(self::CRONE_OPTIONS_TABLE, $crone_options);
    }
    /**
     * Delete function using wp delete_option.
     *
     * @return boolean
     */
    public function deleteAll()
    {
        return delete_option(self::CRONE_OPTIONS_TABLE);
    }
    /**
     * Get saved options using wp get_option()
     *
     * @return false|array
     */
    protected function get()
    {
        return get_option(self::CRONE_OPTIONS_TABLE);
    }
    /**
     * Getter function for maximum cron calls.
     *
     * @return false|int
     */
    public function getMaxCronCalls()
    {
        return isset($this->maxCronCalls)?$this->maxCronCalls:false;
    }
     /**
     * Getter function for maximum posts parsed.
     *
     * @return false|int
     */
    public function getMaxPostsParsed()
    {
        return isset($this->maxPostsParsed)?$this->maxPostsParsed:false;
    }
     /**
     * Getter function for parsind interval.
     *
     * @return false|string
     */
    public function getInterval()
    {
        return isset($this->interval)?$this->interval:false;
    }
    
    /**
     * Return timestamp of last parsed post.
     * 
     * @return false|int
     */
    public function getTimestamp()
    {
        return isset($this->timestamp)?$this->timestamp:false;
    }
    /**
     * Return number of cron job calls.
     * 
     * @return false|int
     */
    public function getCronCalls()
    {
        return isset($this->cronCalls)?$this->cronCalls:false;
    }
    /**
     * Return number of parsed posts.
     * 
     * @return false|int
     */
    public function getParsedPosts()
    {
        return isset($this->parsedPosts)?$this->parsedPosts:false;
    }
    /**
     * Return status of the cron job.
     * 
     * @return false|string
     */
    public function getStatus()
    {
        return isset($this->status)?$this->status:false;    
    }
   /**
    * Return url of the resource. 
    *
    * @return string
    */
    public function getUrl(){
        return $this->resourceUrl;
    }
    public function setTimestamp($timestamp){
        $this->timestamp=$timestamp;
    }
     /**
     * Assign options to object properties.
     *
     * @param array $options
     * @return void
     */
    protected function assignOptions($options)
    {
        $this->resourceUrl=$options['url'];
        $this->maxCronCalls=$options['maxCronCalls'];
        $this->maxPostsParsed=$options['maxPostsParsed'];
        $this->interval=$options['interval'];
        $this->timestamp=$options['timestamp'];
        $this->cronCalls=$options['cronCalls'];
        $this->parsedPosts=$options['parsedPosts'];
        $this->status=$options['status']; 
    }
    
    /**
     * Get all options in needed format.
     *
     * 
     * @param string $format accept array|object|json.
     * @return array|object|string
     */
    public function getAttributes($format)
    {
       return $this->formatAttributes($format);
    }
    /**
     * Return options data in proper format.
     * 
     * @param string $format accept array|object|json.
     * @return array|object|string
     */
    protected function formatAttributes($format)
    {
        $data=array(
            'url'=>$this->resourceUrl,
            'maxCronCalls'=>$this->maxCronCalls,
            'maxPostsParsed'=>$this->maxPostsParsed,
            'interval'=>$this->interval,
            'timestamp'=>$this->timestamp,
            'cronCalls'=>$this->cronCalls,
            'parsedPosts'=>$this->parsedPosts,
            'status'=>$this->status
        );
        switch ($format) {
            case 'array':
                return $data;
            case 'object':
                return $this;
            case 'json':
                return json_encode($data);
        }
    }
}