<?php
namespace NewsParserPlugin\Utils;

/**
 * Class creates pipe that pass data thru every method or function that connect to the pipe.
 * it calls every member of pipe add pass input data to it gets the result and saves it to be passed to another member.
 * To get result add ::get() to the end of pipe.
 *
 * Example:
 *
 * $result=$pipeObject->myMethod1($arg)
 *             ->func('myFunc',array($arg,'data'))
 *             ->myMethod3($arg)
 *             ->get()
 *
 *
 * PHP version 5.6
 *
 * @package  Message
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */

class Pipe
{
    protected $result;
    protected $obj;
    /**
     * Init func
     *
     * @param object $object pass instance of class method of witch you would use NewsParserPlugin\in pipe
     * @param $inputData data that would be passed thru the pipe
     */
    public function __construct($object, $inputData)
    {
        $this->obj = $object;
        $this->result = $inputData;
    }
    /**
     * Add to pipe functions. Add arguments of function to the array. Data that passed
     * thru the pipe name 'data'
     * Example:
     * You want to create array from string and then slice that array
     * $result=explode(' ',$someString);
     * array_slice($result,0,3);
     * With pipe you can do that:
     * $result=$pipeObject->func('explode', array(" ", "data"))
     *                    ->func('array_slice', array('data', 0, $length))
     *                    ->get()
     *
     * @param string $function_name name of function
     * @param array $args array of args that will be passed to function
     * @return void
     */
    public function func($function_name, $args)
    {
        if (is_callable($function_name)) {
            $key = array_search("data", $args);
            if ($key !== false) {
                $args[$key] = $this->result;
            }

            $this->result = $this->callFunc($function_name, $args);
        } else {
            throw new \Exception('Wrong function name ' . $function_name);
        }
        return $this;
    }
    /**
     * @return \NewsParserPlugin\Utils\Pipe
     */
    protected function callFunc($function_name, $args)
    {
        $temp_result = call_user_func_array($function_name, $args);
        $result = $temp_result === false ? $this->result : $temp_result;
        return $result;
    }
    /*
     * When you add method of object data will pass to it as the last argument
     * public function method1($pipeData){}
     *
     * $pipeObject->method1()   piped data will be passed
     * if there any other args add piped data at the end
     * public function method1($arg1,$arg2,$pipeData){}
     * $pipeObject->method1($arg1,$arg2)   piped data will be passed
     */
    public function __call($method, $args)
    {
        if (is_null($this->obj)) {
            throw new \Exception('Object did not set.');
        }
        if ($method == 'get') {
            return $this->result ?: false;
        }
        if (method_exists($this->obj, $method)) {
            $args[] = $this->result;
            $this->result = $this->callFunc(array($this->obj, $method), $args);
        } else {
            throw new \Exception('Wrong method name ' . get_class($this->obj) . '::' . $method);
        }
        return $this;
    }
}
