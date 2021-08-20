import { GET, WP_API, CATEGORIES } from "../constants"


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