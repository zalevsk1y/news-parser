<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
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
     * @var AbstractParseContent
     */
    protected $parser;
    /**
     * Init function.
     *
     * @param AbstractParseContent $parser
     * @param ResponseFormatter $formatter
     */
    public function __construct(AbstractParseContent $parser, ResponseFormatter $formatter){
        $this->parser=$parser;
        $this->formatResponse=$formatter;
    }
    /**
     * Parse raw html data of the page.
     *
     * @param string $url Url of the page.
     * @param array $options Array of options.
     * @return string
     */
    public function getRawHTML($url,$options=array()){
        try{
            $html_data=$this->parser->get($url,$options);
            $response=$html_data;
        }catch(MyException $e){
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }
        return $response;
    }
    /**
     * Saves attached media.
     *
     * @param string $url Url of image that should be download.
     * @param string $postId Post id.
     * @param string $alt Description of image.
     * @return string 
     */
    public function saveMedia($url,$postId,$alt=''){
        $img_id = \media_sideload_image($url, $postId, $alt, 'id');
        if (\is_wp_error($img_id)) {
            $response = $this->formatResponse->error(1)->message('error', $img_id->get_error_message())->get('json');
        } else{
            $response=$this->formatResponse->media($img_id)->get('json');
        }
        return $response;
    }
}