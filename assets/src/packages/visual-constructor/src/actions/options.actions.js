import { OPTIONS,TOGGLE } from '../constants'

export const TOGGLE_ADD_FEATURED_MEDIA=`[${OPTIONS}:${TOGGLE}]FEATURED_MEDIA`;
export const TOGGLE_ADD_SOURCE=`[${OPTIONS}:${TOGGLE}]ADD_SOURCE`;
export const TOGGLE_SAVE_PARSING_TEMPLATE=`[${OPTIONS}:${TOGGLE}]PARSING_TEMPLATE`;

export function toggleAddFeaturedMedia(){
    return {
        type:TOGGLE_ADD_FEATURED_MEDIA
    }
}
export function toggleAddSource(){
    return {
        type:TOGGLE_ADD_SOURCE
    }
}
export function toggleSaveParsingTemplate(){
    return {
        type:TOGGLE_SAVE_PARSING_TEMPLATE
    }
}