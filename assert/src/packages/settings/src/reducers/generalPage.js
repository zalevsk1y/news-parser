
import {types} from '../actions/index';
import { defaultState } from './defaultState';

const generalPage=(state=defaultState.settings.general,action)=>{
    switch(action.type){
        case types.main.SET_ALL_SETTINGS:
            return {...action.settings.general}
        case types.general.TOGGLE_ADDSOURCE:
            return{...state,
                'addSource':!state.addSource
            }
        default:
            return{
                ...state
            }
    }
    }

export default generalPage;