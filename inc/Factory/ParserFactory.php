<?php
namespace NewsParserPlugin\Factory;

use NewsParserPlugin\Parser\HTMLPatternParser;
use NewsParserPlugin\Parser\XMLParser;
use NewsParserPlugin\Parser\HTMLRaw;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Parser\AbstractParseContent;
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
class ParserFactory implements FactoryInterface
{
    /**
     * Get instance of parser class.
     *
     * @throws Exception
     * @param string $class short class name.
     * @return AbstractParseContent
     */
    public function getInstance($class)
    {
        switch($class){
            case 'html':
                return $this->html();
            case 'xml':
                return $this->xml();
            case 'rawHTML':
                return $this->rawHTML();
        }
        throw new Exception('Wrong ParserFactory::class method name '.$class.'.');
    }
    /**
     * Get HTML parser.
     *
     * @return HTMLPatternParser
     */
    protected function html()
    {
        return new HTMLPatternParser();
    }
    /**
     * Get Xml parser.
     *
     * @return vXMLParser
     */
    protected function xml()
    {
        return new XMLParser();
    }
    /**
     * Get raw html parser.
     *
     * @return HTMLRaw
     */
    protected function rawHTML()
    {
        return new HTMLRaw();
    }
}