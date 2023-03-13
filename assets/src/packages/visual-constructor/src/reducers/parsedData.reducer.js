import {SELECT_TITLE,SELECT_FEATURED_MEDIA,SELECT_CONTENT,REMOVE_CONTENT} from '../actions/parsedData.actions';
import {OPEN_DIALOG} from '../actions/dialogData.actions'
import {defaultState} from './defaultState';


export function parsedData (state=defaultState.parsedData,action){

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
        case OPEN_DIALOG:
                return {
                    ...defaultState.parsedData
                }
        default:
            return {...state}
    }
}


