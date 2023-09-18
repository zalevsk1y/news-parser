<?php
namespace NewsParserPlugin\Parser\Modifiers;

function removeDublicatedPicturesModifier($body_array)
{
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
    return $new_body;
}