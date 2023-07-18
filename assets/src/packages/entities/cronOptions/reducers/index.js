import { SET_CRON_OPTIONS, SET_MAX_POSTS, SET_MAX_CRON_CALLS, SET_INTERVAL,SET_CRON_STATUS } from '../actions/cronOptions.actions.js'

export const cronOptions = (state = {}, action) => {
    switch (action.type) {
        case SET_CRON_OPTIONS:
            return { ...action.payload.cronOptions };
        case SET_MAX_POSTS:
            return { ...state, maxPostsParsed: action.payload.maxPostsParsed };
        case SET_MAX_CRON_CALLS:
            return { ...state, maxCronCalls: action.payload.maxCronCalls };
        case SET_INTERVAL:
            return { ...state, interval: action.payload.interval };
        case SET_CRON_STATUS:
            return { ...state, status: action.payload.status}
        default:
            return state;
    }
}
