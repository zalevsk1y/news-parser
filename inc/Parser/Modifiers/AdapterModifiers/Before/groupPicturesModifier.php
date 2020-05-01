<?php
namespace NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before;

use NewsParserPlugin\Interfaces\PostControllerInterface;
/**
 * Modifier function that iterates over an array of elements and groups consecutive 'img' elements into an 'imgRow' element.
 *
 * This function takes an instance of the PostController class and modifies the parsed body array by grouping consecutive 'img' elements into an 'imgRow' element.
 * It returns a new array of body elements with consecutive 'img' elements grouped.
 *
 * @param PostControllerInterface $post_controller The instance of the PostController class.
 * @return array The modified array of body elements with consecutive 'img' elements grouped.
 */


function groupPicturesModifier(PostControllerInterface $post_controller)
{
    $body_array=$post_controller->getParsedData()['body'];
    $new_body=[];
    $prev_element=null;
    foreach($body_array as $element){
        if($element['tagName']=='img'&&$prev_element['tagName']=='img'){
            $prev_image_element=array_pop($new_body);
            array_push($new_body,array(
                'tagName'=>'imgRow',
                'content'=>array($prev_image_element,$element)
            ));
        } else {
            array_push($new_body,$element);
        }
        $prev_element=end($new_body);
    }
    $post_controller->updateParsedDataBody($new_body);  
}
