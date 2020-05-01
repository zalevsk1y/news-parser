import { setCronOpions, setMaxPosts, setMaxCronCalls, setInterval, setCronStatus } from '../actions/cronOptions.actions'
import { createReducer } from '@reduxjs/toolkit';
import {initialCroneState} from './initialState';
import {CroneOptionsStateType} from './CroneOptionsStateType';

export const cronOptions = createReducer<CroneOptionsStateType>(initialCroneState, (builder) => {
    builder
        .addCase(setCronOpions, (state, action) => ({ ...action.payload }))
        .addCase(setMaxPosts, (state, action) => ({ ...state, maxPostsParsed: action.payload }))
        .addCase(setMaxCronCalls, (state, action) => ({ ...state, maxCronCalls: action.payload }))
        .addCase(setInterval, (state, action) => ({ ...state, interval: action.payload }))
        .addCase(setCronStatus, (state, action) => ({ ...state, status: action.payload }))
})
