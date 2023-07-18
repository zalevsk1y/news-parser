import { PAGE,STATUS, CRON_OPTIONS, SET,INTERVAL,MAX_POSTS,MAX_CRON_CALLS } from '../constants';

export const SET_CRON_OPTIONS=`[${PAGE}.${CRON_OPTIONS}:${SET}]`
export const SET_MAX_POSTS = `[${PAGE}.${CRON_OPTIONS}.${MAX_POSTS}:${SET}]`;
export const SET_MAX_CRON_CALLS = `[${PAGE}.${CRON_OPTIONS}.${MAX_CRON_CALLS}:${SET}]`;
export const SET_INTERVAL= `[${PAGE}.${CRON_OPTIONS}.${INTERVAL}:${SET}]`;
export const SET_CRON_STATUS=`[${PAGE}.${CRON_OPTIONS}.${STATUS}:${SET}]`;

export const setCronOpions=(cronOptions)=>{
    return {
        type:SET_CRON_OPTIONS,
        payload:{
            cronOptions
        }
    }
}


export const setMaxPosts = (maxPostsParsed) => {
    return {
        type: SET_MAX_POSTS,
        payload: {
            maxPostsParsed
        }
    }
}

export const setMaxCronCalls = (maxCronCalls) => {
    return {
        type: SET_MAX_CRON_CALLS,
        payload: {
            maxCronCalls
        }
    }
}

export const setInterval = (interval) => {
    return {
        type: SET_INTERVAL,
        payload: {
            interval
        }
    }
}

export const setCronStatus = (status) => {
    return {
        type: SET_CRON_STATUS,
        payload: {
            status
        }
    }
}
