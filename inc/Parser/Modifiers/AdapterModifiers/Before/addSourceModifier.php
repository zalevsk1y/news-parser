<?php
namespace NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before;

use NewsParserPlugin\Interfaces\PostControllerInterface;

/**
 * Modifier function that adds a source link to the post.
 *
 * This function takes a PostController object and adds a source link to the associated PostModel object.
 * The source link is generated using the 'sourceUrl' property from the parsed data retrieved using the `getParsedData()` method of the PostController class.
 * The generated source link is then added as a new paragraph ('p') element to the body array using the `updateParsedDataBody()` method of the PostController class.
 *
 * @param PostControllerInterface $post_controller The PostController object to which the source link will be added.
 * @return void
 */


function addSourceModifier(PostControllerInterface $post_controller)
{
    $parsedData=$post_controller->getParsedData();
    $source_link_element=[
        'tagName'=>'source',
        'content'=>[
            'href'=>$parsedData['sourceUrl'],
            'text'=>'Source'
        ]
    ];
    $body_array=$parsedData['body'];
    array_push($body_array,$source_link_element);
    $post_controller->updateParsedDataBody($body_array); 
}