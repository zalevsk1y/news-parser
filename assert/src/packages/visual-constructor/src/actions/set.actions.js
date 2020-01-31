import {decodeHTMLEntities} from '@news-parser/helpers';
export const SET_HTML='SET_HTML';
export function getPostHTML(htmlData){
    return {
        type:SET_HTML,
        payload:{
            rawHTML:htmlData
        }
    }
}