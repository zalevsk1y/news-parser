
import {types} from '../actions/index';


export function main(state={},action){
    switch (action.type){
        case types.main.SEND_REQUEST:
            return {...state,
                isFetching:true};
        case types.main.RECEIVE_RESPONSE:
            return {...state,
                isFetching:false,
                error:action.data.err,
                message:action.data.msg,
                lang:action.data.lang
            }
        case types.main.FETCH_ERROR:
            return {...state,
                isFetching:false,
                error:action.data.error,
                message:action.data.message
            }
        default:
            return {...state,
                isFetching:false,
                error:false,
                message:false,
              
    };
    }
}

