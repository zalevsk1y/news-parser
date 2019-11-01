import {types} from '../actions/visualConstructorDialog';


export function visualConstructorDialog(state={},action){
    switch(action.type){
        case types.DIALOG_START_FETCHING:
            return {
                ...state,
                isFetching:true
            }
        case types.DIALOG_STOP_FETCHING:
            return {
                ...state,
                isFetching:false
            }
        case types.GET_PAGE_HTML:
            return {
                ...state,
                rawHTML:action.rawHTML
            }
        default:
            return {...state}
    }
}