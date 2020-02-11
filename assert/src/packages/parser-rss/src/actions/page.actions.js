import {PAGE,PARSE} from '../constants'
import { API_REQUEST } from './api.actions';

export const parseSelected=()=>{
    return {
        type:`[${PAGE}:${PARSE}]${API_REQUEST}`
    }
}
