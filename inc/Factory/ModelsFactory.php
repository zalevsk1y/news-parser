<?php

namespace NewsParserPlugin\Factory;
use NewsParserPlugin\Interfaces\FactoryInterface;
use NewsParserPlugin\Models\ListModel;
use NewsParserPlugin\Models\OptionsModel;
use NewsParserPlugin\Models\PostModel;

/**
 * Class factory fo creating models.
 *
 * PHP version 5.6
 *
 *
 * @package  Factory
 * @author   Evgeniy S.Zalevskiy <2600@ukr.net>
 * @license  MIT
 *
 */
class ModelsFactory implements FactoryInterface
{
    public static function getInstance(){
        return new static();
    }
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
    public function listModel($data){
        return new ListModel($data);
    }

    /**
    * Get instance of OptionsModel class.
    *
    * @param array $url Structure:
    * [scheme] - protocol
    * [host] - host name 
    * [path] - path to resource
    * [fragment] - path fragment
    * @return NewsParserPlugin\Models\OptionsModel
    */
    public function optionsModel($url){
        return new OptionsModel($url['host']);
    }

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
    public function postModel($data){
        return new PostModel($data);
    }
}
