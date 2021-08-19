
import { FRAME,SELECT,REMOVE } from '../constants/'
export const SELECT_TITLE=`[${FRAME}:${SELECT}]TITLE`,
        SELECT_FEATURED_MEDIA=`[${FRAME}:${SELECT}]FEATURED_MEDIA`,
        SELECT_CONTENT=`[${FRAME}:${SELECT}]CONTENT`,
        REMOVE_CONTENT=`[${FRAME}:${REMOVE}]CONTENT`;
        


export function selectTitle(title){
    return {
        type:SELECT_TITLE,
        title
    }
}
export function selectFeaturedMedia(url){
    return {
        type:SELECT_FEATURED_MEDIA,
        url
    }
}
export function selectContent(hash,content){
    return {
        type:SELECT_CONTENT,
        hash,
        content
    }
}
export function removeContent(hash){
    return {
        type:REMOVE_CONTENT,
        hash
    }
}
