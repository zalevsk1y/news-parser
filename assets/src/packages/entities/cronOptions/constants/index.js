export const SELECTED_TEMPLATE='selectedTemplate';
export const CRON_OPTIONS='cronOptions';
export const MAX_POSTS='maxPostsParsed';
export const MAX_CRON_CALLS='maxCronCalls';
export const INTERVAL='interval';
export const TIMESTAMP='timestamp';
export const STATUS='status';
export const SET='set';
export const PAGE='page';

export const STATUS_IDLE='idle';
export const STATUS_ACTIVE='active';

export const defaultCronData={
    url:'',
    maxCronCalls:null,
    maxPostsParsed:null,
    interval:'hourly',
    timestamp:null,
    cronCalls:0,
    parsedPosts:0,
    status:STATUS_IDLE
}