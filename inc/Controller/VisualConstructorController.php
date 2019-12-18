<?php
namespace NewsParserPlugin\Controller;

use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Parser\Abstracts\AbstractParseContent;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Utils\ResponseFormatter;
use NewsParserPlugin\Models\PostModel;

/**
 * Class controller for visual constructor.
 *
 * PHP version 5.6
 *
 *
 * @package  Controller
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */

class VisualConstructorController extends BaseController
{
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
    public function __construct(AbstractParseContent $parser,ResponseFormatter $formatter)
    {
        parent::__construct($formatter);
        $this->parser=$parser;
    }
    /**
     * Parse raw html data of the page.
     *
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
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
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @param string $url Url of image that should be download.
     * @param string $post_id Post id.
     * @param string $alt Description of image.
     * @return string 
     */
    public function saveMedia($url,$post_id,$alt=''){
        try{
            $post=$this->postModelsFactory($post_id);
            if(!$post) throw new MyException(Errors::text('WRONG_POST_ID'));
            $media_id=$post->addPostThumbnail($url,$alt);
            $response=$this->formatResponse->media($media_id)->message('success',Success::text('FEATURED_IMAGE_SAVED'))->get('json');
        }catch(MyException $e){
            $response = $this->formatResponse->error(1)->message('error', $e->getMessage())->get('json');
        }
        return $response;
    }
    /**
    * Get instance of PostModel class.
    *
    * @param string $post_id 
    * @return false|PostModel
    */
    protected function postModelsFactory($post_id){
        return PostModel::getPostById($post_id);
    }
}