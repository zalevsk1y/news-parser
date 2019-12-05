<?php
namespace NewsParserPlugin\Traits;
use NewsParserPlugin\Utils\PipeController;
trait PipeTrait{
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