import { CRONS, SET } from '../constants'

export const SET_CRONS = `[${CRONS}:${SET}]`;

export const setCrons = (crons) => {
    return {
        type: SET_CRONS,
        payload: {
            crons
        }
    }
}