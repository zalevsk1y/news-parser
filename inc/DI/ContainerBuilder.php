<?php 
namespace NewsParserPlugin\DI;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;

class ContainerBuilder {
    protected $defenitionArray;
    protected $instancesArray=[];
    public function __construct(){

    }
    public function addDefinitions(string $pathToDefenitionFile){
        if(!file_exists($pathToDefenitionFile)) {
            throw new MyException(Errors::text('NO_DI_DEFENITION_FILE'), Errors::code('INNER_ERROR'));
        }
        $this->defenitionArray=require_once($pathToDefenitionFile);
        
    }
    public function get($instance_name){
        return $this->createInstance($instance_name);
    }
    protected function createInstance($instance_name,$dependances){
        if (in_array($instance_name,$this->instancesArray)) return $this->instancesArray[$instance_name];
        if (count($dependances)==0) {
            $new_instance=new $instanceName();
            $this->instanceArray=$new_instance;
            return $new_instance;
        }
        $dep_args=[];
        foreach ($dep_item as $dependances){
            if(!in_array($dep_item,$this->defenitionArray)){
                throw new MyException(Errors::text('NO_NEEDED_DEPENDENCY_IN_DEFENITION'), Errors::code('INNER_ERROR'));
            }
            if (in_array($dep_item,$this->instancesArray)){ 
                array_push($dep_args,$this->instancesArray[$dep_item]);
            } else {
                array_push($dep_args,$this->createInstance($dep_item,$this->defenitionArray[$dep_item]));
            }
            
            
        }
        $this->instancesArray[$depItem]=new $instance_name(...$dep_args);
        return $this->instancesArray[$depItem];
    }
}