
import React, { useState, useMemo, useLayoutEffect, useCallback } from "react";
import { Frame } from './Frame';
import { useScrolling } from "../../../hooks/useScrolling";
import { LoadingSpinner } from "@news-parser/ui/visual-constructor/LoadingSpinner";
// import '@news-parser/styles/_resize-bar.scss';
import { useIsOpen } from '../hooks/visual-constructor/useIsOpen';
import { useIsMutating } from '../hooks/';
import { useClose } from "../hooks/";
import { useGetPostId } from '../hooks/';;


/**
* 
* A functional component for the Parsing Constructor modal window, which allows users to create a post or save a parsing template.
* The component initializes several hooks, such as useScrolling, useDispatch, useState, useSelector, useFetchHTML, useCreateWpPost, useCreateParsingTemplate,
* to manage the state of the modal window and to fetch and parse HTML data.
* The component also includes a modalWindow function that returns the modal window, with a header, a loading spinner, a parsed data container,
* a sidebar, and a footer with a button to either save a template or create a post.
 
*
* @since 1.0.0
* @returns {JSX.Element} The modal window JSX element or null if the modal is not open.
*/


export const VisualConstructor = ({ onReady, children }) => {
    const [enableScrolling, disableScrolling] = useScrolling();
    const [frameIsReady, setFrameIsReady] = useState(false);
    const closeVisualConstructor = useClose();
    const [url, isOpen] = useIsOpen();
    const [isMutating] = useIsMutating();
    const _id = useGetPostId();
    const isVisualConstructorReady = useMemo(() => frameIsReady && !isMutating, [frameIsReady, isMutating]);
    useLayoutEffect(() => {
        if (isOpen) {
            disableScrolling();
        } else {
            enableScrolling();
        }
    }, [isOpen]);
    useLayoutEffect(() => setFrameIsReady(false), [url])
    const onFrameReady = useCallback(() => setFrameIsReady(true))
    if (frameIsReady && Array.isArray(onReady)) {
        onReady.forEach(func => func({ url, _id }))
    }

    return (
        <div className="media-modal-wrapper" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-container">
                <div className="modal-header">
                    <h1>Parsing Constructor</h1>
                    <button
                        type="button"
                        className="media-modal-close"
                        onClick={closeVisualConstructor}
                    >
                        <span className="media-modal-icon">
                            <span className="screen-reader-text">Close dialog</span>
                        </span>
                    </button>
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    {!isVisualConstructorReady && <LoadingSpinner />}
                    <div className="modal-main">
                        <div className="parsed-data-container">
                            <Frame url={url} onReady={onFrameReady} />
                        </div>
                        <div className="resize-drag-bar"></div>
                        {children[0]}
                    </div>
                    {children[1]}
                </div>
            </div>
            <div className="media-modal-backdrop"></div>
        </div>
    );
}


