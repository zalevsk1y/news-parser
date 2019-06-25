<?php
namespace Parser;

use Exception\MyException;
use Interfaces\ParserInterface;
use Message\Errors;

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
class ParseContent 
{
    
    protected $cache_expiration;
    public function __construct($cache_expiration)
    {

        $this->cache_expiration = $cache_expiration;
    }

    /**
     * Get data from cache using wordpress get_transient()
     *
     *
     * @param string $url
     * @return void
     */

    protected function getFromCache($url)
    {

        $hashId = sha1($url);
        return get_transient($hashId);

    }
    /**
     * Set cache using wordpress set_transient
     *
     * @param string $url
     * @param $data
     * @return void
     */
    protected function setCache($url, $data)
    {
        $hashId = sha1($url);
        return set_transient($hashId, $data, $this->cache_expiration);
    }
    /**
     * Download page
     *
     * @param string $url
     * @return string HTML page data
     */
    protected function download($url)
    {
        $data = file_get_contents($url);
        if (!$data) {
            throw new MyException(Errors::text('FILE_DOWNLOAD'));
        }

        return $data;
    }
    /**
     * Get data to transfer to parser
     *
     * @param [type] $url
     * @return void
     */
    public function get($url)
    {
        $data = $this->getFromCache($url);
        if ($data) {
            $response = $this->parse($data);
            return $response;
        }
        $data = $this->download($url);
        $this->setCache($url, $data);
        $response = $this->parse($data);

        return $response;
    }

}
