<?php 
namespace Factory;
use Models\PostModel;
use Interfaces\FactoryInterface;

class PostFactory implements FactoryInterface{
   public function get(array $data){
    return new PostModel($data);
   }
}