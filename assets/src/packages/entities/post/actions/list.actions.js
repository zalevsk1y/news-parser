import {PARSER_RSS} from '@news-parser/config/constants';
import {POSTS,SET} from '../constants';

export const SET_LIST='[${PARSER_RSS}.${POSTS}:${SET}]';


export const setList=(data)=>{
    return{ 
        type:SET_LIST,
        payload:{
            data
        }
    }
}