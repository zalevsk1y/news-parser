<?php
namespace NewsParserPlugin\Traits;
use NewsParserPlugin\Utils\ChainController;
/**
 * Factory method for Utils\ChainController
 * 
 * PHP version 5.6
 *
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@urk.net>
 * @license  MIT
 */
trait ChainTrait
{
    /**
     * Factory for chain building class. use NewsParserPlugin\::get() function at the end to get result.
     *
     * @param object|null object which methods will be called in chain.
     * 
     * @return NewsParserPlugin\Utils\ChainController ChainController
     */
    protected function chain($object=null)
    {
        $object=is_null($object)?$this:$object;
        return new ChainController($object);
    }
}