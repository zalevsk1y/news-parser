// package name
import { VISUAL_CONSTRUCTOR } from "../constants";
//state properties name
import { OPTIONS, ADD_FEATURED_MEDIA, ADD_SOURCE, SAVE_PARSING_TEMPLATE } from '../constants';
//actions name
import { TOGGLE } from '../constants';

export const TOGGLE_ADD_FEATURED_MEDIA=`[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${ADD_FEATURED_MEDIA}:${TOGGLE}]`,
    TOGGLE_ADD_SOURCE=`[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${ADD_SOURCE}:${TOGGLE}]`,
    TOGGLE_SAVE_PARSING_TEMPLATE=`[${VISUAL_CONSTRUCTOR}.${OPTIONS}.${SAVE_PARSING_TEMPLATE}:${TOGGLE}]`;

export const toggleAddFeaturedMedia=()=>{
    return {
        type:TOGGLE_ADD_FEATURED_MEDIA
    }
}
export const toggleAddSource=()=>{
    return {
        type:TOGGLE_ADD_SOURCE
    }
}
export const toggleSaveParsingTemplate=()=>{
    return {
        type:TOGGLE_SAVE_PARSING_TEMPLATE
    }
}