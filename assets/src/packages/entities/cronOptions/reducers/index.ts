import { CronOptions } from 'types/cronOptions';
import { Action } from 'types/index'
import { SET_CRON_OPTIONS, SET_MAX_POSTS, SET_MAX_CRON_CALLS, SET_INTERVAL, SET_CRON_STATUS } from '../actions/cronOptions.actions'

export const cronOptions = (state: CronOptions | {} = {}, action: Action) => {
    switch (action.type) {
        case SET_CRON_OPTIONS:
            return { ...action.payload };
        case SET_MAX_POSTS:
            return { ...state, maxPostsParsed: action.payload };
        case SET_MAX_CRON_CALLS:
            return { ...state, maxCronCalls: action.payload };
        case SET_INTERVAL:
            return { ...state, interval: action.payload };
        case SET_CRON_STATUS:
            return { ...state, status: action.payload }
        default:
            return state;
    }
}
