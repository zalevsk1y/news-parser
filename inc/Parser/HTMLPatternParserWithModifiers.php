<?php
namespace NewsParserPlugin\Parser;

use NewsParserPlugin\Parser\HTMLPatternParser;
use NewsParserPlugin\Interfaces\AdapterInterface;

/**
 * Class HTMLPatternParser
 *
 * Parse HTML using pre-saved template pattern.
 *
 * @package NewsParserPlugin\Parser
 */
class HTMLPatternParserWithModifiers extends HTMLPatternParser
{   
    public function __construct(AdapterInterface $adapter, $cache_expiration = 3600,$modifiers=[])
    {
        parent::__construct($adapter,$cache_expiration);
        $this->modifiers=$modifiers;
    }
    protected function parseContainer($elements)
    {
        return $this->addModifiers(parent::parseContainer($elements));
    }
    protected function addModifiers($body){
        //implement modification
        return $body;
    }

}