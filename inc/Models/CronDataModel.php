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
    /**
     * Url of resource that will be source of the posts feed.
     *
     * @var string
     */
    protected $resourceUrl;
    /**
     * Cron options
     * Structure:
     * url: string, -  url for accessing the RSS feed, the same as for saved template
     * options: {
     *  maxCronCalls: number, -  maximum number of calls
     *  maxPostsParsed: number, - maximum number of saved posts
     *  interval: 'hourly' | 'twicedaily' | 'daily' | 'weekly' - interval at which the cron job will run
     * }
     * timestamp: number, -  time of the last run or the time of the last saved post indicated in the RSS feed
     * croneCalls: number, - number of cron job calls
     * parsedPosts: number, - number of saved posts
     * status: 'active' | 'idle', - current state of the cron job
     *
     * @var array
     */
    protected $options;
    /**
    * Timestamp of last parsed post
    *
    * @var int
    */
    protected $timestamp;
    /**
    * Crone calls counter
    *
    * @var int
    */
    protected $croneCalls=0;
    /**
    * Parsed posts counter
    *
    * @var int
    */
    protected $parsedPosts=0;
    /**
    * Timestamp of last parsed post
    *
    * @var string 'active' | 'idle'
    */
    protected $status='idle';
    /**
     * Hash of resource url using as a key value.
     *
     * @var string
     */
    protected $hash;
    /**
     * init function
     *
     * @param string $url Url of resource that will be source of the posts feed.
     */
    public function __construct($hash,$url,$croneData)
    {
        if (!$this->isOptionsValid($options)) {
            throw new MyException(Errors::text('OPTIONS_WRONG_FORMAT'), Errors::code('BAD_REQUEST'));
        }
        $this->resourceUrl=$url;
        $this->hash=$hash;
        $this->assignOptions($cronData);
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
       $cronData=$this->formatAttributes('array');
        $result=update_option($this->hash, $cronData, '', 'no');
        if ($result) {
            return true;
        }
        return false;
    }
    protected function isOptionsValid(){
        if (!isset($options['options'])||
        !isset($options['timestamp'])||
        !isset($options['croneCalls'])||
        !isset($options['parsedPosts'])||
        !isset($options['status'])) {
            return false;
        }
        return true;
    }
    /**
     * Delete function using wp delete_option.
     *
     * @return boolean
     */
    public function delete()
    {
        return delete_option($this->hash);
    }
    /**
     * Get saved options using wp get_option()
     *
     * @return false|array
     */
    protected function get()
    {
        return get_option($this->hash);
    }
    /**
     * Getter function for cron options.
     *
     * @return false|array
     */
    public function getOptions()
    {
        return isset($this->options)?$this->options:false;
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
    public function getCroneCalls()
    {
        return isset($this->croneCalls)?$this->croneCalls:false;
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
     /**
     * Assign options to object properties.
     *
     * @param array $options
     * @return void
     */
    protected function assignOptions($options)
    {
        $this->options=$options->options;
        $this->timestamp=$options->timestamp;
        $this->croneCalls=$options->croneCalls;
        $this->parsedPosts=$options->parsedPosts;
        $this->status=$options->status; 
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
            'url'=>$this->url,
            'options'=>$this->options,
            'timestamp'=>$this->timestamp,
            'croneCalls'=>$this->croneCalls,
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