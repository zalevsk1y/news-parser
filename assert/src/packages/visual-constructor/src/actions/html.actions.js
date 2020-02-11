
import {VISUAL_CONSTRUCTOR} from '../constants/'
export const FETCH_HTML=`[${VISUAL_CONSTRUCTOR}]FETCH_HTML`;
export const SET_HTML=`[${VISUAL_CONSTRUCTOR}]SET_HTML`;

export const fetchHTML=(url)=>{
    return {
        type:FETCH_HTML,
        payload:{
            data:{
                url
            }
        }
    }
}


export function setHTML(htmlData){
    return {
        type:SET_HTML,
        payload:{
            rawHTML:htmlData
        }
    }
}