<?php 
namespace Factory;
use Models\ListModel;
use Interfaces\FactoryInterface;

class ListFactory implements FactoryInterface{
   public function get(array $data){
    return new ListModel($data);
   }
}