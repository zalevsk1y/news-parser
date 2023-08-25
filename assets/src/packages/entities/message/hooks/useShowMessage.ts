import { useCallback, useMemo } from 'react';
import { useDispatch } from "react-redux"
import { MessageAction } from 'types/message';
import { showMessage } from "../actions/message.actions";

namespace useShowMessage {
    export type UseShowMessage =()=> (type: MessageAction['type'], text: string) => void
}

/**
 * Custom hook for showing messages by dispatching a Redux action.
 *
 * @returns {Function} A function to show a message by dispatching the corresponding action.
 * - type: The type of the message action.
 * - text: The text content of the message.
 */

export const useShowMessage: useShowMessage.UseShowMessage = () => {
    const dispatch = useDispatch();
    return (type: MessageAction['type'], text: string) => dispatch(showMessage({ type, text }));
}