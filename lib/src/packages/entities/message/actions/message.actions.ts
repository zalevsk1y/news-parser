import { Message } from 'types/message'
import { MESSAGE, SHOW } from "../constants";
import { createAction } from '@reduxjs/toolkit';

export const SHOW_MESSAGE = `[${MESSAGE}:${SHOW}]`;

export const showMessage=createAction<Message>(SHOW_MESSAGE);