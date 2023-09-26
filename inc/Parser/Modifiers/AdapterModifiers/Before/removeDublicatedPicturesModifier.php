<?php
namespace NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before;

use NewsParserPlugin\Interfaces\PostControllerInterface;
/**
 * Modifier function that removes duplicated parsed image elements.
 *
 * This function takes an instance of the PostController class and removes any duplicated image elements from the parsed body array based on their 'src' attribute.
 * It returns a new array of body elements with duplicated images removed.
 *
 * @param PostControllerInterface $post_controller The instance of the PostController class.
 * @return array The modified array of body elements with duplicated images removed.
 */


function removeDublicatedPicturesModifier(PostControllerInterface $post_controller)
{
    $body_array=$post_controller->getParsedData()['body'];
    $new_body=[];
    $image_src_map=array();
    foreach($body_array as $element){
        if($element['tagName']=='img'){
            if(!in_array($element['content']['src'],$image_src_map)){
                array_push($image_src_map,$element['content']['src']);
                array_push($new_body,$element);
            }
        }else{
            array_push($new_body,$element);
        } 
    }
    $post_controller->updateParsedDataBody($new_body);
}