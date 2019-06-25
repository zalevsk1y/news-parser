<?php 
namespace Factory;
use Models\PostModel;
use Interfaces\FactoryInterface;

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
class PostFactory implements FactoryInterface{
   public function get(array $data){
    return new PostModel($data);
   }
}