<?php
namespace NewsParserPlugin\Parser\Modifiers;

/**
 * Iterates over an array of elements and groups consecutive 'img' elements into an 'imgRow' element.
 *
 * @param array $body_array The array of elements to process.
 * @return array The modified array after grouping consecutive 'img' elements.
 */

function groupPicturesModifier($body_array)
{
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
    return $new_body;
}
