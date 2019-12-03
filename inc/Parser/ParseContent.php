<?php
namespace NewsParserPlugin\Parser;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Interfaces\ParserInterface;
use NewsParserPlugin\Message\Errors;

/**
 * Class middleware for parser.
 * Download data
 * Store in the cache
 * Provides data to parser
 *
 * PHP version 7.2.1
 *
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */
abstract class ParseContent 
{
    
    protected $cache_expiration;
    public function __construct($cache_expiration)
    {

        $this->cache_expiration = $cache_expiration;
    }
    /**
     * Parsed data and create object or array with parsed data.
     *
     * @param string $data Data string that would be parsed.
     * @param array $options Array with additional options.
     * @return array|stdClass|string
     */
    abstract protected function parse($data,$options);
    /**
     * Get data from cache using wordpress get_transient()
     *
     *
     * @param string $url
     * @return string|bool
     */

    protected function getFromCache($url)
    {

        $hash_id = sha1($url);
        return get_transient($hash_id);

    }
    /**
     * Set cache using wordpress set_transient
     *
     * @param string $url
     * @param $data
     * @return bool
     */
    protected function setCache($url, $data)
    {
        $hash_id = sha1($url);
        return set_transient($hash_id, $data, $this->cache_expiration);
    }
    /**
     * Download page
     *
     * @param string $url url of page. 
     * @throws MyException if data could not be downloaded.
     * @return string HTML page data.
     */
    protected function download($url)
    {   $request_args=array('user-agent'=>'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        $data = wp_remote_get($url,$request_args);
        $response_code= wp_remote_retrieve_response_code($data);
        if ($response_code!=200) {
            throw new MyException(Errors::text('FILE_DOWNLOAD'));
        }
        $body=wp_remote_retrieve_body($data);
        return $body;
    }
    /**
     * Get data to transfer to parser
     *
     * @param string $url
     * @param array $options
     * @return string
     */
    public function get($url,$options=null)
    {
        $data = $this->getFromCache($url);
        if ($data) {
            $response = $this->parse($data,$options);
            return $response;
        }
        $data = $this->download($url);
        $this->setCache($url, $data);
        $response = $this->parse($data,$options);

        return $response;
    }

}
