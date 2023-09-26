<?php
namespace NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before;

use NewsParserPlugin\Interfaces\PostControllerInterface;

/**
 * Modifier function that iterates over an array of elements and removes 'srcSet' and 'sizes' attributes from 'img' tags.
 *
 * This function takes a PostController instance as input and modifies the 'srcSet' and 'sizes' attributes of image elements in the parsed body array.
 * It sets the 'srcSet' and 'sizes' attributes of all 'img' tags to empty strings.
 *
 * @param PostControllerInterface $post_controller The instance of the PostController class.
 * @return void
 */

function removeSrcSetAndSizesModifier(PostControllerInterface $post_controller)
{
    $body_array=$post_controller->getParsedData()['body'];
    foreach($body_array as $element){
        if($element['tagName']=='img'){
            $element['content']['srcSet']='';
            $element['content']['sizes']='';
        }
    }
    $post_controller->updateParsedDataBody($body_array); 
}