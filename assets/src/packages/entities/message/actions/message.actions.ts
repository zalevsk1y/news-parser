import { SetAction } from '@news-parser/types';
import { MessageAction } from 'types/message'
import { MESSAGE, SHOW } from "../constants";

export const SHOW_MESSAGE = `[${MESSAGE}:${SHOW}]`;

export const showMessage: SetAction<MessageAction> = (messageObj) => ({
        type: SHOW_MESSAGE,
        payload:messageObj
    })