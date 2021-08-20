import { initialStateParse } from "@news-parser/parser-rss/reducers";
import { SIDEBAR,CATEGORIES,MAP } from "../constants";

export function sidebar (state=initialStateParse.sidebar,action){
    
    switch (action.type){
        case `[${SIDEBAR}:${CATEGORIES}]${MAP}`:
            return {...state,categories:action.payload}
        default:
            return {...state};
    }
}