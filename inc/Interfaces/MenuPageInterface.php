<?php
namespace NewsParserPlugin\Interfaces;

/**
 * Interface for Menu pages class.
 * 
 *  * 
 * @package  Menu
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 */
interface MenuPageInterface
{
    public function render();
    public function setTemplate($template);
}