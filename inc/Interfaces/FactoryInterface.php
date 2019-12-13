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
     * @return object
     */
    public static function getInstance();
    public function listModel($data);
    public function optionsModel($url);
    public function postModel($data);
}