<?php
namespace Interfaces;

/**
 * Interface for Menu pages class.
 * 
 *  * 
 * @package  Menu
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 * @link     https://github.com/2600BottlesOnTheWall
 */
interface MenuPageInterface
{
    public function render();
    public function setTemplate($template);
}