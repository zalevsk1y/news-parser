import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Sidebar } from 'types/sidebar';
import { postStatusSet, postFormatSet, publishDateSet } from '../actions/status.visability.actions';

namespace useStatusVisibility {
    export type SideberStatus = Sidebar['status'];
    export type SidebarPostFormat = Sidebar['postFormat']
    export type PostStatusChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;
    export type PostFormatChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;
    export type PublishDateChangeHandler = (date: string|false) => void;
    export type UseStatusVisibility = () => [PostStatusChangeHandler, PostFormatChangeHandler, PublishDateChangeHandler]
}
/**
 * Custom hook for managing post status, visibility, and publish date by dispatching Redux actions.
 *
 * @returns {Array} An array containing the functions for managing post status, visibility, and publish date.
 * - postStatusChangeHandler: A function that triggers the change of post status by dispatching the corresponding action.
 * - postFormatChangeHandler: A function that triggers the change of post format by dispatching the corresponding action.
 * - publishDateChangeHandler: A function that triggers the change of publish date by dispatching the corresponding action.
 * @param {React.ChangeEvent<HTMLInputElement>} event - The event object representing the change in the input field value for post status or post format.
 * @param {string} date - The new publish date for the post.
 * @param {number} time - The new publish time for the post.
 */

export const useStatusVisibility: useStatusVisibility.UseStatusVisibility = () => {
    const dispatch = useDispatch();
    const postStatusChangeHandler:useStatusVisibility.PostStatusChangeHandler = useCallback((event) => {
        const targetElement = event.target as HTMLSelectElement;
        dispatch(postStatusSet(targetElement.value as useStatusVisibility.SideberStatus))
    }, [dispatch]);
    const postFormatChangeHandler:useStatusVisibility.PostFormatChangeHandler = useCallback((event) => {
        const targetElement = event.target as HTMLSelectElement;
        dispatch(postFormatSet(targetElement.value as useStatusVisibility.SidebarPostFormat))
    }, [dispatch]);
    const publishDateChangeHandler:useStatusVisibility.PublishDateChangeHandler = useCallback((date) => dispatch(publishDateSet(date)), [dispatch]);
    return [postStatusChangeHandler, postFormatChangeHandler, publishDateChangeHandler];
}