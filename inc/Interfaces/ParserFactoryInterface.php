<?php
namespace NewsParserPlugin\Interfaces;

interface ParserFactoryInterface
{
    /**
     * Get HTML parser.
     *
     * @return HTMLPatternParser
     */
    public function html();
    /**
     * Get Xml parser.
     *
     * @return vXMLParser
     */
    public function xml();
    /**
     * Get raw html parser.
     *
     * @return HTMLRaw
     */
    public function rawHTML();
}