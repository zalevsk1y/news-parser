<?php 
namespace NewsParserPlugin\Factory;
use NewsParserPlugin\Models\OptionsModel;
use NewsParserPlugin\Interfaces\FactoryInterface;

/**
 * Class factory fo creating post objects
 *
 * PHP version 7.2.1
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class OptionsFactory implements FactoryInterface{
   public function get($url){
    return new OptionsModel($url['host']);
   }
}