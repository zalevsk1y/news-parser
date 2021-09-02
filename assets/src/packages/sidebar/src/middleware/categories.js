import { SIDEBAR,CATEGORIES,ADD } from "../constants"
import { postWPCategories } from "@news-parser/parser-rss/actions/wp.api.actions";

export const categoriesMiddleware = ({dispatch})=>next=>action=>{
    next (action);
    switch(action.type){
        case `[${SIDEBAR}:${CATEGORIES}]${ADD}`:
            dispatch (postWPCategories(action.payload));
            break;
    }
}