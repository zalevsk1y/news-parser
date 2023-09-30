import {CroneOptionsStateType} from './CroneOptionsStateType'

export const initialCroneState: CroneOptionsStateType = {
    url: '',
    maxCronCalls: 0,
    maxPostsParsed: 0,
    interval: 'hourly',
    timestamp: null,
    cronCalls: 0,
    parsedPosts: 0,
    status: 'inactive'
};