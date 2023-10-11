<?php
namespace NewsParserPlugin\Parser\Modifiers\AdapterModifiers\Before;

use NewsParserPlugin\Interfaces\PostControllerInterface;

/**
 * Modifier function that iterates over an array of elements and generates the sizes attribute for the img tag.
 *
 * This function takes an instance of the PostController class and modifies the 'sizes' attribute of image elements in the parsed body array.
 * The sizes attribute is generated based on a set of breakpoints and the image widths obtained from the 'srcSet' attribute of each image element.
 *
 * @param PostControllerInterface $post_controller The instance of the PostController class.
 * @return void
 */

function addImageSizesModifier(PostControllerInterface $post_controller)
{
    $body_array=$post_controller->getParsedData()['body'];
    $break_points_array=[480, 768, 1024, 1280, 1440, 1900];
    foreach($body_array as &$element){
        if($element['tagName']=='img'){
            if(array_key_exists('srcSet',$element['content'])){
                $src_set_array=explode(',',trim($element['content']['srcSet']));
                $sizes_array=array_map(function($src)use($break_points_array)
                    {
                        $image_width=(int)explode(' ',trim($src))[1];
                        foreach($break_points_array as $break_point){
                            if($image_width<$break_point){
                                return "(max-width: ".$break_point."px) ".$image_width."w";
                            }
                        }
                        return $image_width."w";
                    },$src_set_array); 
                    $sizes=implode(',',$sizes_array);
                    $element['content']['sizes']=$sizes;
                    
                }
            }
        }
    $post_controller->updateParsedDataBody($body_array);    
}