import {SHOW_MESSAGE} from '../actions/message.actions'

export const message=(state=false,action)=>{
    switch (action.type){
        case SHOW_MESSAGE:
            return {
                ...action.payload,
                timestamp:Date.now(),
                open:true
            }

        default:
            return {
                ...state
            }
    }
}