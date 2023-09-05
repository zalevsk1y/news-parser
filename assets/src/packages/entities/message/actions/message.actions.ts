import { SetAction } from '@news-parser/types';
import { Message } from 'types/message'
import { MESSAGE, SHOW } from "../constants";

export const SHOW_MESSAGE = `[${MESSAGE}:${SHOW}]`;

export const showMessage: SetAction<Message> = (messageObj) => ({
        type: SHOW_MESSAGE,
        payload:messageObj
    })