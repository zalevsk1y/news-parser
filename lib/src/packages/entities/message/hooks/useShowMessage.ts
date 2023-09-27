import { useDispatch } from "react-redux"
import { Message } from 'types/message';
import { showMessage } from "../actions/message.actions";

export type UseShowMessage =()=> (type: Message['type'], text: string) => void


/**
 * Custom hook for showing messages by dispatching a Redux action.
 *
 * @returns {Function} A function to show a message by dispatching the corresponding action.
 * - type: The type of the message action.
 * - text: The text content of the message.
 */

export const useShowMessage: UseShowMessage = () => {
    const dispatch = useDispatch();
    return (type: Message['type'], text: string) => dispatch(showMessage({ type, text }));
}