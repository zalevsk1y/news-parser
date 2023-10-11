<?php
namespace NewsParserPlugin\Interfaces;

/**
 * Interface for event controller
 *
 * PHP version 5.6
 *
 * @package  Interfaces
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

interface EventControllerInterface
{
    /**
     * Bind event to controller
     *
     * @param string $event event name.
     * @param string|array $controller function or method that would be called.
     * @return void
     */
    public function on($event, $controller);
    /**
     * Remove event.
     *
     * @param string $event event name.
     * @return void
     */
    public function off($event);
    /**
     * Trigger event.
     *
     * @param string $event event name
     * @param array $args
     * @return mixed
     */
    public function trigger($event, $args);
}
