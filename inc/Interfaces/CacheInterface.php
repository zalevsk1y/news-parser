<?php
namespace Interfaces;

interface CacheInterface{
    static public function read($name);
    static public function update($name,$data);
    static public function create($name,$data);
    static public function delete($name);
}