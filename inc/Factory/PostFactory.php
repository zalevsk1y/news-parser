<?php 
namespace NewsParserPlugin\Factory;
use NewsParserPlugin\Models\PostModel;
use NewsParserPlugin\Interfaces\FactoryInterface;

/**
 * Class factory fo creating post objects
 *
 * PHP version 5.6
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class PostFactory implements FactoryInterface{
   /**
    * Get instance of PostModel class.
    *
    * @param array $data Structure: 
     * [title] - post title @string
     * [image] - post main image url @string
     * [body] - post content @string|@array
     * [sourceUrl]-url of source page @string
     * [authorId]- id of wp-post author
    * @return NewsParserPlugin\Models\PostModel
    */
   public function get($data){
    return new PostModel($data);
   }
}