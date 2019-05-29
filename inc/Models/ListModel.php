<?php
namespace Models;
use Interfaces\ModelInterface;

class ListModel implements ModelInterface{
    protected $data;

    public function __construct(array $data){
        $this->data=$data;
    } 
    public function getAttributes($format='array'){
        if($format=='json'){
           return json_encode($this->data);
        }
       return $this->data;
    }
}