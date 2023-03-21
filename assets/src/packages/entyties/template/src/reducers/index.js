import {SET_TEMPLATE,DELETE_TEMPLATE} from '../actions'

export const template=(state=false,action)=>{
    switch (action.type){
        case SET_TEMPLATE:
            return action.payload.template;
        case DELETE_TEMPLATE: 
            return false; 
        default:
            return state;      
    }
}