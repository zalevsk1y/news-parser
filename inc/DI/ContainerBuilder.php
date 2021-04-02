<?php 
namespace NewsParserPlugin\DI;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Message\Errors;

class ContainerBuilder {
    protected $defenitionArray;
    protected $instancesArray=[];
    public function addDefinitions(string $pathToDefenitionFile){
        if(!file_exists($pathToDefenitionFile)) {
            throw new MyException(Errors::text('NO_DI_DEFENITION_FILE'), Errors::code('INNER_ERROR'));
        }
        $defenitionArray=require $pathToDefenitionFile;
        $this->isArray($defenitionArray);
        $this->defenitionArray=$defenitionArray;
    }
    public function get($instance_name){
        $this->hasDependency($instance_name);
        return $this->createInstance($instance_name,$this->defenitionArray[$instance_name]);
    }
    protected function createInstance($instance_name,$dependences){
        if (in_array($instance_name,$this->instancesArray)) return $this->instancesArray[$instance_name];
        if (count($dependences)==0) {
            $new_instance=new $instance_name();
            $this->instancesArray[$instance_name]=$new_instance;
            return $new_instance;
        }
        $dep_args=[];
        foreach ($dependences as $dep_item){
           
            if (in_array($dep_item,$this->instancesArray)){ 
                array_push($dep_args,$this->instancesArray[$dep_item]);
            } else if($this->isInstanceableDependece($dep_item)){
                $this->hasDependency($dep_item);
                array_push($dep_args,$this->createInstance($dep_item,$this->defenitionArray[$dep_item]));
            } else {
                array_push($dep_args,$dep_item);
            }
        }
        $this->instancesArray[$instance_name]=new $instance_name(...$dep_args);
        return $this->instancesArray[$instance_name];
    }
    protected function isInstanceableDependece($dep_item){
        return class_exists($dep_item);
    }
    protected function hasDependency($dep_item){
        $this->isArray($this->defenitionArray);
        if(!array_key_exists($dep_item,$this->defenitionArray)){
            throw new MyException(Errors::text('NO_NEEDED_DEPENDENCY_IN_DEFENITION'), Errors::code('INNER_ERROR'));
        }
    }
    protected function isArray($defeninitionArray){
        if(!is_array($defeninitionArray)){
            throw new MyException(Errors::text('WRONG_DEFENITION_FILE_FORMAT'), Errors::code('INNER_ERROR'));
        }
    }
}