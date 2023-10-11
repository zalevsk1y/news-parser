<?php
namespace NewsParserPlugin\Interfaces;

use NewsParserPlugin\Utils\MenuConfig;

/**
 * Interface for Menu pages class.
 *
 * PHP version 5.6
 *
 * @package  Interfaces
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
interface MenuPageInterface
{
    public function init(MenuConfig $config);
}
