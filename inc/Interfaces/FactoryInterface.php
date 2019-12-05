<?php
namespace NewsParserPlugin\Interfaces;
/**
 * Interface for factories
 *
 * PHP version 5.6
 *
 *
 * @package  Interfaces
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

interface FactoryInterface{
    /**
     * Get instance of object
     *
     * @param array $data
     * @return object
     */
    public function get($data);
}