import {TOGGLE_ADD_FEATURED_MEDIA,TOGGLE_SAVE_PARSING_TEMPLATE,TOGGLE_ADD_SOURCE} from '../actions/options.actions';
import {OPEN_DIALOG} from '../actions/app.actions'
import {defaultState} from './index';


export function options(state=defaultState.options,action){
    switch (action.type){
        case TOGGLE_ADD_FEATURED_MEDIA:
            return {...state,
                addFeaturedMedia:!state.addFeaturedMedia
            }
        case TOGGLE_SAVE_PARSING_TEMPLATE:
            return {...state,
                saveParsingTemplate:!state.saveParsingTemplate
            }
        case TOGGLE_ADD_SOURCE:{
            return {...state,
                addSource:!state.addSource
            }
        }
        case OPEN_DIALOG:
                return {
                    ...defaultState.options
                }
        default:
            return {...state}
    }
}