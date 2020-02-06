export const POST_ITEM='POST_ITEM';
import {SINGLE,CREATE} from '../constants';

export const createPostDraft=(post)=>{
    return {
        type:`[${SINGLE}:${CREATE}]${POST_ITEM}`,
        payload:{
            ...post
        }
    }
}