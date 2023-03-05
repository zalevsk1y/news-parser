import { WP_POST,CREATE,VISUAL_CONSTRUCTOR,API,POST } from '../constants';
export const CREATE_WP_POST=`[${VISUAL_CONSTRUCTOR}.${WP_POST}:${CREATE}]${API}/${POST}`;
export function createWpPost(){
    return {
        type:CREATE_WP_POST
    }
}