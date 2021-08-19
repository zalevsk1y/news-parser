<?php
namespace NewsParserPlugin\Interfaces;

/**
 * Interface for DI containers
 *
 * PHP version 5.6
 *
 * @package  Interfaces
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

interface ContainerInterface
{
     public function get($instance_name);
}
