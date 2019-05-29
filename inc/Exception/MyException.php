<?php 
namespace Exception;

class MyException extends \Exception{
        public function __construct($msg,$e=null){
            $this->original=$e;
            parent::__construct($msg);
        }
}