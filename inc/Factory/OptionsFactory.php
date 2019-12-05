<?php 
namespace NewsParserPlugin\Factory;
use NewsParserPlugin\Models\OptionsModel;
use NewsParserPlugin\Interfaces\FactoryInterface;

/**
 * Class factory fo creating post objects
 *
 * PHP version 5.6
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class OptionsFactory implements FactoryInterface{
   /**
    * Get instance of OptionsModel class.
    *
    * @param array $url Structure:
    * [scheme] - protocol
    * [host] - host name 
    * [path] - path to resource
    * [fragment] - path fragment
    * @return NewsParserPlugin\Models\OptionsModel
    */
   public function get($url){
    return new OptionsModel($url['host']);
   }
}