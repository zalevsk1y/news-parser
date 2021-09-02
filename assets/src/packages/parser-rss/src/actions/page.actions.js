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

export const parseSelectedWithProps=(props)=>{
        return {
            type:`[${PAGE}:${PARSE}]${SELECTED}`,
        payload:{
            entity:PAGE,
            event:PARSE,
            data:{
                post_category:props.selectedCategories,
                tags_input:props.selectedTags,
                comment_status:props.allowComments?'open':'close',
                ping_status:props.allowPinbacks?'open':'close',
                post_date:props.date?props.date:(new Date()).toISOString(),
                post_status:props.status
            }
        }
        }
}
