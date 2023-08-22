import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { allowPinbacksSet, allowCommentsSet } from '../actions/descussion.actions';


namespace useSelectDiscussionGroup {
    export type SelectCategorieHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
    export type DiselectCategoryHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
    export type UseSelectDiscussionGroup = () => [SelectCategorieHandler, DiselectCategoryHandler]
}

/**
 * Custom hook for selecting discussion group settings by dispatching Redux actions.
 *
 * @returns {Array} An array containing the functions for selecting discussion group settings.
 * - allowComments: A function that triggers the selection of the "Allow Comments" setting by dispatching the corresponding action.
 * - allowPinbacks: A function that triggers the selection of the "Allow Pinbacks" setting by dispatching the corresponding action.
 * @param {React.ChangeEvent<HTMLInputElement>} event - The event object representing the change in the input field value.
 */

export const useSelectDiscussionGroup: useSelectDiscussionGroup.UseSelectDiscussionGroup = () => {
    const dispatch = useDispatch();
    const allowComments = useCallback((event: React.ChangeEvent<HTMLInputElement>) => dispatch(allowCommentsSet(!!event.target.value)), []);
    const allowPinbacks = useCallback((event: React.ChangeEvent<HTMLInputElement>) => dispatch(allowPinbacksSet(!!event.target.value)), []);
    return [allowComments, allowPinbacks];
}