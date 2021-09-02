import { SIDEBAR,TAGS,ADD } from "../constants"
import { postWPTags } from "@news-parser/parser-rss/actions/wp.api.actions";

export const tagsMiddleware = ({dispatch})=>next=>action=>{
    next (action);
  
    switch(action.type){
        case `[${SIDEBAR}:${TAGS}]${ADD}`:
            console.log(action)
            dispatch (postWPTags(action.payload));
            break;
    }
}