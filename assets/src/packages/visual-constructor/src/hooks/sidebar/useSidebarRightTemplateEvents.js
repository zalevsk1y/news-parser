import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
    toggleAddFeaturedMedia,
    toggleSaveParsingTemplate,
    toggleAddSource,
} from "../../actions/options.actions";
import { selectTitle, selectFeaturedMedia } from "../../actions/parsedData.actions";

/**
 * A custom hook that returns several callback functions for managing events on the sidebar right template.
 *
 * @param {Object} options - Optional settings for the template.
 * @param {Object} body - The body of the template.
 * @returns {Array} An array of callback functions for managing events on the sidebar right template:
 * - selectTitleHandler: Selects a new title for the template.
 * - selectFeaturedMediaHandler: Selects a featured media element from the template body and dispatches an action to update the selected media.
 * - toggleSaveParsingTemplateHandler: Toggles the flag to save the current parsing template.
 * - toggleAddSourceHandler: Toggles the flag to add a new source to the template.
 * - toggleAddFeaturedMediaHandler: Toggles the flag to add a new featured media to the template.
 *
 * @callback SelectTitleHandler
 * @param {string} title - The new title for the template.
 *
 * @callback SelectFeaturedMediaHandler
 *
 * @callback ToggleSaveParsingTemplateHandler
 *
 * @callback ToggleAddSourceHandler
 *
 * @callback ToggleAddFeaturedMediaHandler
 */

export const useSidebarRightTemplateEvents = (options, body) => {
    const dispatch = useDispatch();
    /**
     * Selects a new title for the template.
     *
     * @callback SelectTitle
     * @param {string} title - The new title for the template.
     */
    const selectTitleHandler = useCallback((title) => title && dispatch(selectTitle(title)), [dispatch]);
    /**
     * Selects a featured media element from the template body and dispatches an action to update the selected media.
     *
     * @callback SelectFeaturedMediaHandler
     */
    const selectFeaturedMediaHandler = useCallback(() => {
        const selectedElements = body || {};
        if (options?.noFeaturedMedia) return;
        for (let item in selectedElements) {
            if (selectedElements[item].tagName === "IMG") {
                selectedElements[item].content &&
                    dispatch(selectFeaturedMedia(selectedElements[item].content.src));
                break;
            }
        }
    }, [body, options]);
    /**
     * Toggles the flag to save the current parsing template.
     *
     * @callback ToggleSaveParsingTemplateHandler
     */
    const toggleSaveParsingTemplateHandler = useCallback(() => dispatch(toggleSaveParsingTemplate()), [dispatch]);
    /**
     * Toggles the flag to add a new source to the template.
     *
     * @callback ToggleAddSourceHandler
     */
    const toggleAddSourceHandler = useCallback(() => dispatch(toggleAddSource()), [dispatch]);
    /**
     * Toggles the flag to add a new featured media to the template.
     *
     * @callback ToggleAddFeaturedMediaHandler
     */
    const toggleAddFeaturedMediaHandler = useCallback(() => dispatch(toggleAddFeaturedMedia()), [dispatch]);

    return [selectTitleHandler, selectFeaturedMediaHandler, toggleSaveParsingTemplateHandler, toggleAddSourceHandler, toggleAddFeaturedMediaHandler]
}