<?php
namespace NewsParserPlugin\Exception;

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
    protected $original;
    public function __construct($msg, $code, $e = null)
    {
        $this->original = $e;
        parent::__construct($msg, (int)$code);
    }
}
