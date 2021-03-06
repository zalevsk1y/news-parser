export const SET_APP_STATE='SET_APP_STATE';
export const START_PARSE_APP='START_PARSE_APP';
export const OPEN_DIALOG='OPEN_DIALOG';


export {showMessage} from '@news-parser/message/';

export const setAppState=(entity,event,data)=>{
    return {
        type:SET_APP_STATE,
        payload:{
            entity,
            event,
            data
        }
    }
}

export const startApp=()=>{
    return {
        type:START_PARSE_APP
    }
}

export const openDialog=(_id,url,type)=>{
    return {
        type:`[${type}]OPEN_DIALOG`,
        payload:{
                _id,
                url,
            }
        
    }
}