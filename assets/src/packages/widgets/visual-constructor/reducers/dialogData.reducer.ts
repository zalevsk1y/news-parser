import { DialogData } from 'types/dialog';
import { Action } from '@news-parser/types';
import { OPEN_VISUAL_CONSTRUCTOR, CLOSE_VISUAL_CONSTRUCTOR, SET_HTML, SET_IS_MUTATING } from '../actions/dialogData.actions';
import { initialState } from './initialState';

export const dialogData = (state:DialogData = initialState, action:Action) => {
    switch (action.type) {
        case OPEN_VISUAL_CONSTRUCTOR:
            const { url, _id } = action.payload;
            return {
                ...state,
                isOpen: true,
                url,
                _id
            }
        case CLOSE_VISUAL_CONSTRUCTOR:
            return {
                ...state,
                isOpen: false,
                frameIsReady: false,
                rawHTML: false
            }
        case SET_HTML:
            return {
                ...state,
                rawHTML: action.payload
            }
        case SET_IS_MUTATING:
            return {
                ...state,
                isMutating: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}