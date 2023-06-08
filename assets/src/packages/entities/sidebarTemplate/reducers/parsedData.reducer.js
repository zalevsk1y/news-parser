import { SELECT_TITLE, SELECT_FEATURED_MEDIA, SELECT_CONTENT, REMOVE_CONTENT, RESET_SIDEBAR_TEMPLATE } from '../actions/parsedData.actions';
import { initialState } from './initialState';


export const parsedData = (state = initialState.parsedData, action) => {

    switch (action.type) {
        case SELECT_TITLE:
            return {
                ...state,
                title: action.payload.title
            }
        case SELECT_FEATURED_MEDIA:
            return {
                ...state,
                image: action.payload.url
            }
        case SELECT_CONTENT:
            return {
                ...state,
                body: {
                    ...state.body,
                    [action.payload.hash]: action.payload.content
                }
            }
        case REMOVE_CONTENT:
            if (state.body.hasOwnProperty(action.hash)) {
                delete state.body[action.payload.hash]
            }
            return {
                ...state,
                body: { ...state.body }
            }
        case RESET_SIDEBAR_TEMPLATE:
            return { ...initialState.parsedData }
        default:
            return { ...state }
    }
}


