import {PARSER_RSS} from  '@news-parser/config/constants';
import {POSTS,SELECTED,DRAFT,INSERT} from '../constants';

//[news-parser.posts.selected:toggle]
export const TOGGLE_POST_SELECT=`[${PARSER_RSS}.${POSTS}.${SELECTED}:${SELECT}]`;
//[news-parser.posts.draft:insert]
export const INSERT_DRAFT_POST=`[${PARSER_RSS}.${POSTS}.${DRAFT}:${INSERT}]`;

export const togglePostSelect=(_id)=>{
    return {
        type:TOGGLE_SELECT_POST,
        payload:{
            _id
        }
    }
}
export const insertDraftPost=(_id,data)=>{
    return {
        type:INSERT_DRAFT_POST,
        payload:{
            _id,
            ...data
        }
    }
}


