import {PAGE,PARSE,SELECTED} from '../constants'
import { API_REQUEST } from './api.actions';


export const parseSelected=()=>{
    return {
        type:`[${PAGE}:${PARSE}]${SELECTED}`,
        payload:{
            entity:PAGE,
            event:PARSE,
            data:null
        }
    }
}
