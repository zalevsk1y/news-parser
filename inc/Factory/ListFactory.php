<?php 
namespace NewsParserPlugin\Factory;
use NewsParserPlugin\Models\ListModel;
use NewsParserPlugin\Interfaces\FactoryInterface;

/**
 * Class factory fo creating list objects
 *
 * PHP version 5.6
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class ListFactory implements FactoryInterface{
   /**
    * Get instance of ListModel class.
    *
    * @param array $data  Structure:
     * [title] - title of post
     * [pubDate] -date of post publication
     * [description] -post brief description
     * [link] - link to the original post
     * [image] - main post image url
     * [status] - status of post parsed - if post was not saved as draft and draft -when post saved as draft
    * @return NewsParserPlugin\Models\ListModel
    */
   public function get($data){
    return new ListModel($data);
   }
}