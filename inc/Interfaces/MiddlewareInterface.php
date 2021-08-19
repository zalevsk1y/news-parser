<?php
namespace NewsParserPlugin\Interfaces;

/**
 * Interface for middleware modifiers
 *
 * PHP version 5.6
 *
 * @package  Interfaces
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
interface MiddlewareInterface{
    public function __invoke($data);
}