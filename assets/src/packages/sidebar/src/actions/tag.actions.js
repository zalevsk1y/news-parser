import { SIDEBAR,TAGS,TAG,MAP,ADD,SELECT,DISELECT } from "../constants";

export const mapTags=(categoriesArr)=>{
    return {
        type:`[${SIDEBAR}:${TAGS}]${MAP}`,
        payload:categoriesArr
    }
}
export const mapTag=(tagObject)=>{
    return {
        type:`[${SIDEBAR}:${TAG}]${MAP}`,
        payload:tagObject
    }
}
export const addTag=(name)=>{
    return{
        type:`[${SIDEBAR}:${TAGS}]${ADD}`,
        payload:{
            name
        }
    }
}

export const selectTag=(id)=>{
    return {
            type:`[${SIDEBAR}:${TAGS}]${SELECT}`,
            payload:{
                id
        }
    }
}

export const diselectTag=(id)=>{
    return {
            type:`[${SIDEBAR}:${TAGS}]${DISELECT}`,
            payload:{
                id
        }
    }
}