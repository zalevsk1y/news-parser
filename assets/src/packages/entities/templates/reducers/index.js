import { SET_TEMPLATES } from '../actions/templates.actions'

export const templates = (state = [], action) => {
    switch (action.type) {
        case SET_TEMPLATES:
            return [...action.payload.templates];
        default:
            return state;
    }
}