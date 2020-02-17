import { POST_DRAFT,CREATE } from '../constants'
export const CREATE_POST_DRAFT=`[${POST_DRAFT}:${CREATE}]`;
export function createPostDraft(){
    return {
        type:CREATE_POST_DRAFT
    }
}