import { GET,POST, WP_API, CATEGORIES,TAGS } from "../constants"


export const getWPCategories=()=>{
    return {
        type:`[${WP_API}_${CATEGORIES}:${GET}]`,
        payload:{
            entity:`${WP_API}_${CATEGORIES}`,
            event:GET,
            data:null
        }
    }
}
export const postWPCategories=(data)=>{
    return {
        type:`[${WP_API}_${CATEGORIES}:${POST}]`,
        payload:{
            entity:`${WP_API}_${CATEGORIES}`,
            event:POST,
            data
        }
    }
}
