<?php
namespace NewsParserPlugin\Factory;

use NewsParserPlugin\Parser\HTMLPatternParser;
use NewsParserPlugin\Parser\XMLParser;
use NewsParserPlugin\Parser\HTMLRaw;
use NewsParserPlugin\Interfaces\ParserFactoryInterface;
/**
 * Class factory fo creating parsers.
 *
 * PHP version 5.6
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class ParserFactory implements ParserFactoryInterface
{
   
    /**
     * Get HTML parser.
     *
     * @return HTMLPatternParser
     */
    public function html()
    {
        return new HTMLPatternParser();
    }
    /**
     * Get Xml parser.
     *
     * @return vXMLParser
     */
    public function xml()
    {
        return new XMLParser();
    }
    /**
     * Get raw html parser.
     *
     * @return HTMLRaw
     */
    public function rawHTML()
    {
        return new HTMLRaw();
    }
}