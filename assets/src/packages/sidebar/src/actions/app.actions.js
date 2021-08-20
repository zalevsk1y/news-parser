import { SIDEBAR,CATEGORIES,MAP } from "../constants"

export const mapCategories=(categoriesArr)=>{
    console.log(categoriesArr)
    return {
        type:`[${SIDEBAR}:${CATEGORIES}]${MAP}`,
        payload:categoriesArr
    }
}