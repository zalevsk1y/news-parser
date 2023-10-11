import { createReducer } from '@reduxjs/toolkit'
import { showMessage } from '../actions/message.actions';
import { ParserRootState } from 'types/state';

export type MessageStateType=ParserRootState['parse']['message'];
const initialMessageData:MessageStateType  = false;
export const message = createReducer<MessageStateType>(initialMessageData, builder => {
    builder.addCase(showMessage, (state, action) => ({ ...action.payload }))
})
