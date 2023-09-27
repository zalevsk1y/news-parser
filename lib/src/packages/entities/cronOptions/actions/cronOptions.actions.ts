import { SetAction } from 'types';
import { CronOptions } from 'types/cronOptions';
import { PAGE, STATUS, CRON_OPTIONS, SET, INTERVAL, MAX_POSTS, MAX_CRON_CALLS } from "../constants";
import { createAction } from '@reduxjs/toolkit';

export const SET_CRON_OPTIONS = `[${PAGE}.${CRON_OPTIONS}:${SET}]`
export const SET_MAX_POSTS = `[${PAGE}.${CRON_OPTIONS}.${MAX_POSTS}:${SET}]`;
export const SET_MAX_CRON_CALLS = `[${PAGE}.${CRON_OPTIONS}.${MAX_CRON_CALLS}:${SET}]`;
export const SET_INTERVAL = `[${PAGE}.${CRON_OPTIONS}.${INTERVAL}:${SET}]`;
export const SET_CRON_STATUS = `[${PAGE}.${CRON_OPTIONS}.${STATUS}:${SET}]`;


export const setCronOpions = createAction<CronOptions>(SET_CRON_OPTIONS);

export const setMaxPosts = createAction<CronOptions['maxPostsParsed']>(SET_MAX_POSTS);

export const setMaxCronCalls = createAction<CronOptions['maxPostsParsed']>(SET_MAX_CRON_CALLS);

export const setInterval = createAction<CronOptions['interval']>(SET_INTERVAL);

export const setCronStatus = createAction<CronOptions['status']>(SET_CRON_STATUS);
