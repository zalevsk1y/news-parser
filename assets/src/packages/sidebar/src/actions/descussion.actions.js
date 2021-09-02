import { SIDEBAR,SET,ALLOW_PINBACKS,ALLOW_COMMENTS } from "../constants";


export const allowPinbacksSet=checked=>{
    return {
        type:`[${SIDEBAR}:${ALLOW_PINBACKS}]${SET}`,
        payload:{
            checked
        }
    }
}

export const allowCommentsSet=checked=>{
    return {
        type:`[${SIDEBAR}:${ALLOW_COMMENTS}]${SET}`,
        payload:{
            checked
        }
    }
}