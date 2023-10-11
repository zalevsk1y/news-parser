<?php
namespace NewsParserPlugin\Utils;

/**
 * Class creating chain from method of any class.
 * it calls every link of the chain until gets the result. To get result add ::get()
 * function at the end of the chain. Method of the chain should return false or result.
 *
 * Example:
 *
 * $result=$chainObject->myMethod1($arg)
 *             ->myMethod2($arg)
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
class Chain
{
    protected $obj;
    protected $result;
    /**
     * You could add to chain only methods of one class, but not the functions
     *
     * @param object instance of object whose methods you will add to the chain.
     */
    public function __construct($object)
    {
        $this->obj = $object;
    }

    public function __call($method, $args)
    {
        if ($method == 'get') {
            return $this->result ?: false;
        }
        if (method_exists($this->obj, $method)) {
            $this->result = $this->result ?: call_user_func_array(array($this->obj, $method), $args);
        } else {
            throw new \Exception('Wrong method name ' . get_class($this->obj) . '::' . $method);
        }
        return $this;
    }
}
