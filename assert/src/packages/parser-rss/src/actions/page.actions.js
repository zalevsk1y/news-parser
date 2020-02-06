import {PAGE,PARSE} from '../constants'
export const POST_ITEM='POST_ITEM';

export const parseSelected=()=>{
    return {
        type:`[${PAGE}:${PARSE}]${POST_ITEM}`
    }
}
