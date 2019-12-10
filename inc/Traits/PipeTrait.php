<?php
namespace NewsParserPlugin\Traits;
use NewsParserPlugin\Utils\PipeController;
/**
 * Factory method for Utils\PipeController
 * 
 * PHP version 5.6
 *
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */
trait PipeTrait
{
    /**
     * Function factory for Utils\PipeController
     *
     * @param $input_data data that would be transferred thru the pipe
     * @return void
     */
    protected function pipe($input_data)
    {
        return new PipeController($this,$input_data);
    }
}