import { Action } from 'types'
import {SHOW_MESSAGE} from '../actions/message.actions'

export const message=(state=false,action:Action)=>{
    switch (action.type){
        case SHOW_MESSAGE:
            return {
                ...action.payload
            }

        default:
            return state
    }
}