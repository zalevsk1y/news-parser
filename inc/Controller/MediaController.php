<?php
namespace NewsParserPlugin\Controller;
use NewsParserPlugin\Exception\MyException;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Message\Errors;
use NewsParserPlugin\Message\Success;
use NewsParserPlugin\Utils\ResponseFormatter;

class MediaController extends BaseController
{
    public function __construct(ResponseFormatter $formatter)
    {
        parent::__construct($formatter);
    }
    /**
     * Saves attached media.
     *
     * @uses NewsParserPlugin\Controller\BaseController::formatResponse
     * @throws MyException
     * @param string $url Url of image that should be download.
     * @param string $post_id Post id.
     * @param string $alt Description of image.
     * @return string 
     */
    public function create($url,$post_id,$alt=''){
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
    /**
     * Magic method to save media file when called as function.
     *
     * @param string $url Url of image that should be download.
     * @param string $post_id Post id.
     * @param string $alt Description of image.
     * @return string 
     */
    public function __invoke($url,$post_id,$alt='')
    {
       return $this->create($url,$post_id,$alt);
    }
}