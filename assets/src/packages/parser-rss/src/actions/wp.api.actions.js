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
export const getWPTags=()=>{
    return {
        type:`[${WP_API}_${TAGS}:${GET}]`,
        payload:{
            entity:`${WP_API}_${TAGS}`,
            event:GET,
            data:null
        }
    }
}

export const postWPTags=(data)=>{
    return {
        type:`[${WP_API}_${TAGS}:${POST}]`,
        payload:{
            entity:`${WP_API}_${TAGS}`,
            event:POST,
            data
        }
    }
}