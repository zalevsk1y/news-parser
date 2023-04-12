import {SELECT_TITLE,SELECT_FEATURED_MEDIA,SELECT_CONTENT,REMOVE_CONTENT} from '../actions/parsedData.actions';
import {initialState} from './initialState';


export function parsedData (state=initialState.parsedData,action){

    switch (action.type){
        case SELECT_TITLE:
            return {...state,
                    title:action.title
            }
        case SELECT_FEATURED_MEDIA: 
            return {...state,
                    image:action.url
            }
        case SELECT_CONTENT:
            return {...state,
                    body:{...state.body,
                        [action.hash]:action.content
                    }
            }
        case REMOVE_CONTENT:
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


