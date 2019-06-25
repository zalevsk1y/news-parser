<?php 
namespace Factory;
use Models\ListModel;
use Interfaces\FactoryInterface;

/**
 * Class factory fo creating list objects
 *
 * PHP version 7.2.1
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class ListFactory implements FactoryInterface{
   public function get(array $data){
    return new ListModel($data);
   }
}