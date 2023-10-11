<?php
namespace NewsParserPlugin\Parser\Abstracts;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Utils\Pipe;
use NewsParserPlugin\Utils\Chain;
use NewsParserPlugin\Models\TemplateModel;

/**
 * Base abstract class for parser.
 * Download data
 * Store in the cache
 * Provides data to parser
 *
 * PHP version 5.6
 *
 * @package  Parser\Abstracts
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */
abstract class AbstractParseContent
{
    /**
     * Time expiration of cache data.
     *
     * @var int
     */
    protected $cache_expiration;
    /**
     * Parsing options
     *
     * @var array
     */
    protected $options;
    
    protected $url;
    /**
     * @param integer $cache_expiration
     */
    public function __construct($cache_expiration)
    {

        $this->cache_expiration = $cache_expiration;
    }
    /**
     * Parsed data and create object or array with parsed data.
     *
     * @param string $data Data string that would be parsed.
     * @return array|stdClass|string
     */
    abstract protected function parse($data);
    /**
     * Get data from cache using wordpress get_transient()
     *
     *
     * @param string $url Url of the requested page, used as hash key.
     * @return false|string Return data from cache or false.
     */

    protected function getFromCache($url)
    {

        $hash_id = sha1($url);
        return get_transient($hash_id);
    }
    /**
     * Set cache using wordpress set_transient.
     *
     * @param string $url Url of the requested page, used as hash key.
     * @param string $data Data that should be stored to the cache.
     * @return bool Return true if data was set and false if data was not set.
     */
    protected function setCache($url, $data)
    {
        $hash_id = sha1($url);
        return set_transient($hash_id, $data, $this->cache_expiration);
    }
    /**
     * Download html of the page using wp_remote_get() function.
     *
     * @param string $url url of page.
     * @throws MyException if data could not be downloaded.
     * @return string HTML data of the page.
     */
    protected function download($url)
    {
        $request_args=array('user-agent'=>'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        $data = $this->wpRemoteGet($url, $request_args);
        if (is_wp_error($data)) {
            $error_code=$data->get_error_code();
            $error_message=$data->get_error_message($error_code);
                throw new MyException(Errors::text('FILE_DOWNLOAD'), Errors::code('INNER_ERROR'));
        }
        $response_code= wp_remote_retrieve_response_code($data);
        if ($response_code!=200) {
            throw new MyException(Errors::text('FILE_DOWNLOAD'), Errors::code('INNER_ERROR'));
        }
        $body=wp_remote_retrieve_body($data);
        return $body;
    }
    /**
     * Get html data from the cache or download it, pass them to the parser and cache if needed.
     *
     * @param string $url url of the page that should get.
     * @param TemplateModel $options Extra options that might be used by parser.
     * @return array|stdClass|string Parsed data.
     */
    public function get($url, $options=array())
    {
        $this->url=$url;
       
        $this->options=$options;
        
        $data = $this->getFromCache($url);
        if (gettype($data)==='string') {
            $response = $this->parse($data);
            return $response;
        }
        $data = $this->download($url);
        $this->setCache($url, $data);
        $response = $this->parse($data);

        return $response;
    }
    /**
     * Remove <script> tag with with inner text using preg_replace.
     *
     * @param string $data html data.
     * @return string
     */
    public function removeScriptTags($data)
    {
        return preg_replace('/<script(>|.)[\s\S]*?<\/script>/i', '', $data);
    }
    /**
     * Remove <style> tag with with inner text using preg_replace.
     *
     * @param string $data html data.
     * @return string
     */
    public function removeStyleTags($data)
    {
        return preg_replace('/<style(>|.)[\s\S]*?<\/style\>/i', '', $data);
    }
    /**
     * Facade for wp_remote_get function.
     * Performs an HTTP request using the GET method and returns its response.
     *
     * @param string $url
     * @param array $request_args
     * @return \WP_Error|array
     */
    protected function wpRemoteGet($url, $request_args)
    {
        return wp_remote_get($url, $request_args);
    }
     /**
     * Factory for chain building class. use  get() function at the end to get result.
     *
     * @param object|null object which methods will be called in chain.
     *
     * @return ChainController ChainController
     */
    protected function chain($object = null)
    {
        $object=is_null($object)?$this:$object;
        return new Chain($object);
    }
     /**
     * Function factory for Utils\Pipe
     *
     * @param $input_data data that would be transferred thru the pipe
     * @return Pipe
     */
    protected function pipe($input_data)
    {
        return new Pipe($this, $input_data);
    }
}
