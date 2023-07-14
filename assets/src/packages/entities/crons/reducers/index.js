import { SET_CRONS } from '../actions/crons.actions';

export const crons = (state = [], action) => {
    switch (action.type) {
        case SET_CRONS:
            return [...action.payload.crons];
        default:
            return state;
    }
}