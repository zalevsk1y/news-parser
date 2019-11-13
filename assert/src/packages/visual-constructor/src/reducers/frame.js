import {types} from '../actions/frame';


export function frame (state={},action){

    switch (action.type){
        case types.SELECT_TITLE:
            return {...state,
                    title:action.title
            }
        case types.SELECT_FEATURED_IMAGE: 
            return {...state,
                    image:action.url
            }
        case types.SELECT_CONTENT:
            return {...state,
                    body:{...state.body,
                        [action.hash]:action.content
                    }
            }
        case types.REMOVE_CONTENT:
            if (state.body.hasOwnProperty(action.hash)){
                delete state.body[action.hash]
            }
            return {...state,
                    body:{...state.body}
                }
        default:
            return {...state}
    }
}


