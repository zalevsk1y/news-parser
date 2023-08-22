import { Action } from '@news-parser/types';
import { SET_TEMPLATES } from '../actions/templates.actions'

export const templates = (state:Array<string> = [], action:Action) => {
    switch (action.type) {
        case SET_TEMPLATES:
            return [...action.payload];
        default:
            return state;
    }
}