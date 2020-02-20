<?php
namespace NewsParserPlugin\Interfaces;

/**
 * Interface for Response formatter class.
 *
 * PHP version 5.6
 *
 * @package  Interfaces
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
interface ResponseFormatterInterface
{
   /**
     * Return new instance of ResponseFormatter class
     *
     * @return ResponseFormatterInterface
     */
    public static function format();
}
