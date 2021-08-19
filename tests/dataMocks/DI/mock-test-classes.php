<?php
namespace NewsParserPlugin\Tests\DI;

class TestClass1 {
    public $d1;
    public $d2;
    public function __construct($d1,$d2){
        $this->d1=$d1;
        $this->d2=$d2;
    }
};
class TestClass2 {
    public $d1;
    public function __construct($d1){
        $this->d1=$d1;
    }
};
class TestClass3 {
    public $d1;
    public function __construct($d1){
        $this->d1=$d1;
    }
};
class TestClass4 {};
