<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Parser\ParseContent;
use NewsParserPlugin\Message\Error;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Interfaces\ControllerInterface;

class VisualConstructorController {
    /**
     * Response formatter.
     *
     * @var ResponseFormatter
     */
    protected $formatResponse;
    /**
     * Parser 
     *
     * @var ParseContent
     */
    protected $parser;
    /**
     * Init function.
     *
     * @param ParseContent $postParser
     * @param ResponseFormatter $formatter
     */
    public function __construct(ParseContent $parser, ResponseFormatter $formatter){
        $this->parser=$parser;
        $this->formatResponse=$formatter;
    }
    /**
     * Parse raw html data of the page.
     *
     * @param string $url Url of the page.
     * @param array $options Array of options.
     * @return void
     */
    public function get($url,$options=array()){
        try{
            $html_data=$this->parser->get($url,$options);
            $response=$html_data;
        }catch(MyException $e){
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }
        return $response;
    }
}