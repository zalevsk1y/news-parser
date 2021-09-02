import { SIDEBAR,CATEGORIES,CATEGORY,MAP,ADD,SELECT,DISELECT } from "../constants"

export const mapCategories=(categoriesArr)=>{
    return {
        type:`[${SIDEBAR}:${CATEGORIES}]${MAP}`,
        payload:categoriesArr
    }
}
export const mapCategory=(categoryObject)=>{
    return {
        type:`[${SIDEBAR}:${CATEGORY}]${MAP}`,
        payload:categoryObject
    }
}
export const addCategory=(name,parent)=>{
    return{
        type:`[${SIDEBAR}:${CATEGORIES}]${ADD}`,
        payload:{
            name,
            parent
        }
    }
}

export const selectCategory=(id)=>{
    return {
            type:`[${SIDEBAR}:${CATEGORIES}]${SELECT}`,
            payload:{
                id
        }
    }
}

export const diselectCategory=(id)=>{
    return {
            type:`[${SIDEBAR}:${CATEGORIES}]${DISELECT}`,
            payload:{
                id
        }
    }
}