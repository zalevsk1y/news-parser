import {types} from '../actions/'

export function visualConstructorModal (state={},action){

    switch (action.type){
        case types.SELECT_TITLE:
            return {...state,
                parsedData:{...state.parsedData,
                    title:action.title
                }
            }
        case types.SELECT_FEATURED_IMAGE:
         
            return {...state,
                parsedData:{...state.parsedData,
                    image:action.url
                }
            }
        default:
            return {...state}
    }
}
