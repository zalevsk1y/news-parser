import {types} from '../actions/option.actions';

export const defaultOptionsState={
    addFeaturedMedia:true,
    addSource:false,
    saveParsingTemplate:false
}

export function options(state=defaultOptionsState,action){
    switch (action.type){
        case types.TOGGLE_ADD_FEATURED_MEDIA:
            return {...state,
                addFeaturedMedia:!state.addFeaturedMedia
            }
        case types.TOGGLE_SAVE_PARSING_TEMPLATE:
            return {...state,
                saveParsingTemplate:!state.saveParsingTemplate
            }
        case types.ADD_SOURCE:{
            return {...state,
                addSource:!state.addSource
            }
        }
        default:
            return {...state}
    }
}