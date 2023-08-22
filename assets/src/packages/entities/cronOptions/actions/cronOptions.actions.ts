import { SetAction } from 'types';
import { CronOptions } from 'types/cronOptions';
import { PAGE, STATUS, CRON_OPTIONS, SET, INTERVAL, MAX_POSTS, MAX_CRON_CALLS } from "../constants";

export const SET_CRON_OPTIONS = `[${PAGE}.${CRON_OPTIONS}:${SET}]`
export const SET_MAX_POSTS = `[${PAGE}.${CRON_OPTIONS}.${MAX_POSTS}:${SET}]`;
export const SET_MAX_CRON_CALLS = `[${PAGE}.${CRON_OPTIONS}.${MAX_CRON_CALLS}:${SET}]`;
export const SET_INTERVAL = `[${PAGE}.${CRON_OPTIONS}.${INTERVAL}:${SET}]`;
export const SET_CRON_STATUS = `[${PAGE}.${CRON_OPTIONS}.${STATUS}:${SET}]`;

export const setCronOpions:SetAction<CronOptions> = (cronOptions) => ({
        type: SET_CRON_OPTIONS,
        payload:cronOptions
    })

export const setMaxPosts:SetAction<CronOptions['maxPostsParsed']> = (maxPostsParsed) => ({
        type: SET_MAX_POSTS,
        payload:maxPostsParsed
    })

export const setMaxCronCalls:SetAction<CronOptions['maxPostsParsed']> = (maxCronCalls) => ({
        type: SET_MAX_CRON_CALLS,
        payload:maxCronCalls
    })

export const setInterval:SetAction<CronOptions['interval']> = (interval) => ({
        type: SET_INTERVAL,
        payload:interval
        
    })

export const setCronStatus:SetAction<CronOptions['status']> = (status) => ({
        type: SET_CRON_STATUS,
        payload:status
    })
