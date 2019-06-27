<?php

require '../autoload.php';
use NewsParserPlugin\PHPUnit\Framework\TestCase;
use NewsParserPlugin\Sunra\PhpSimple\HtmlDomParser;
use NewsParserPlugin\Parser\HTMLParser;
/**
 * Unit tests fo Parser\GetContent class
 * 
 * PHP Version 7.2.1
 * 
 * @category Tests
 * @package  Parser
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT https://opensource.org/licenses/MIT
 */

class GetContentTest extends TestCase
{
    protected $testHtml;
    protected $getContent;
    protected function setUp()
    {   
        $this->parser=new HTMLParser(new HtmlDomParser());
      

    }
    public function testParse()
    {
        $testHtml=file_get_contents('https://www.autonews.com/sales/audis-streak-shifts-run-bad-luck');
        $data=$this->parser->parse($testHtml);
       echo var_dump($data);
        $this->assertEquals($data['title'], '2019 Honda CR-V vs. 2019 Toyota RAV4: Which Popular Compact SUV Is the Better Choice?');
    }
 
}