import { TOGGLE_ADD_FEATURED_MEDIA, TOGGLE_SAVE_PARSING_TEMPLATE, TOGGLE_ADD_SOURCE } from '../actions/options.actions';
import { initialState } from './initialState';


export function options(state = initialState.options, action) {
    switch (action.type) {
        case TOGGLE_ADD_FEATURED_MEDIA:
            return {
                ...state,
                addFeaturedMedia: !state.addFeaturedMedia
            }
        case TOGGLE_SAVE_PARSING_TEMPLATE:
            return {
                ...state,
                saveParsingTemplate: !state.saveParsingTemplate
            }
        case TOGGLE_ADD_SOURCE: {
            return {
                ...state,
                addSource: !state.addSource
            }
        }
        default:
            return state;
    }
}