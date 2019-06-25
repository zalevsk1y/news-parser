<?php
namespace Exception;

/**
 * Class for handle plugins exception
 *
 * PHP version 7.2.1
 *
 *
 * @package  Exception
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class MyException extends \Exception
{
    public function __construct($msg, $e = null)
    {
        $this->original = $e;
        parent::__construct($msg);
    }
}
