import { initialStateParse } from "@news-parser/parser-rss/reducers/initState";
import { SIDEBAR,CATEGORIES,CATEGORY,TAGS,TAG,MAP,SET,PUBLISH_DATE,SELECT,DISELECT,PUBLISH_INTERVAL,POST_FORMAT,ALLOW_COMMENTS,ALLOW_PINBACKS,POST_STATUS } from "../constants";

export function sidebar (state=initialStateParse.sidebar,action){
    
    switch (action.type){
//Catagories
        case `[${SIDEBAR}:${CATEGORIES}]${MAP}`:
            return {...state,categories:action.payload}
        case `[${SIDEBAR}:${CATEGORY}]${MAP}`:
            return {...state,categories:[...state.categories,action.payload]}
        case `[${SIDEBAR}:${CATEGORIES}]${SELECT}`:
            if (state.selectedCategories.includes(action.payload.id)) return {...state}
            return {...state,selectedCategories:[...state.selectedCategories,action.payload.id]}
        case `[${SIDEBAR}:${CATEGORIES}]${DISELECT}`:
            if (!state.selectedCategories.includes(action.payload.id)) return {...state}
            return {...state,selectedCategories:state.selectedCategories.filter(categoryId=>categoryId!==action.payload.id)}
//Tags
        case `[${SIDEBAR}:${TAGS}]${MAP}`:
            return {...state,tags:action.payload}
        case `[${SIDEBAR}:${TAG}]${MAP}`:
            return {...state,tags:[...state.tags,action.payload]}
        case `[${SIDEBAR}:${TAGS}]${SELECT}`:
            return {...state,selectedTags:[...state.selectedTags,action.payload.id]}
        case `[${SIDEBAR}:${TAGS}]${DISELECT}`:
            if (!state.selectedTags.includes(action.payload.id)) return {...state}
                return {...state,selectedTags:state.selectedTags.filter(tagId=>tagId!==action.payload.id)}
//Status&Visibility
        case `[${SIDEBAR}:${PUBLISH_DATE}]${SET}`:
            return {...state,publish:{...state.publish,...action.payload}}
        case `[${SIDEBAR}:${PUBLISH_INTERVAL}]${SET}`:
            return {...state,publishInterval:action.payload.publishInterval}
        case `[${SIDEBAR}:${POST_FORMAT}]${SET}`:
            return {...state,postFormat:action.payload.postFormat}
        case `[${SIDEBAR}:${ALLOW_COMMENTS}]${SET}`:
            return {...state,allowComments:action.payload.checked}    
        case `[${SIDEBAR}:${ALLOW_PINBACKS}]${SET}`:
            return {...state,allowPinbacks:action.payload.checked}  
        case `[${SIDEBAR}:${POST_STATUS}]${SET}`:
            return {...state,status:action.payload.postStatus}  
        default:
            return {...state};
    }
}