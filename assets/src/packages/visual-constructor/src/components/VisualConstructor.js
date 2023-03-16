
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarRight from './SidebarRight';
import {Frame} from './Frame';
import { closeVisulaConstructor } from '../actions/dialogData.actions';
import { useScrolling } from "../hooks/visual-constructor/useScrolling";
import { useFetchHTML } from "../hooks/visual-constructor/useFetchHTML";
import { LoadingSpinner } from "../containers/LoadingSpinner";
import '@news-parser/styles/_resize-bar.scss'
import { useCreateWpPost } from "../hooks/visual-constructor/useCreateWpPost";
import { useCreateParsingTemplate } from "../hooks/visual-constructor/useCreateParsingTemplate";


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



function VisualConstructor() {
    const [enableScrolling, disableScrolling] = useScrolling(),
        dispatch = useDispatch(),
        [frameIsReady, setFrameIsReady] = useState(false),
        { url, isOpen } = useSelector(state => state.parse.dialog.visualConstructor.dialogData),
        { saveParsingTemplate } = useSelector(state => state.parse.dialog.visualConstructor.options),
        [isFetching, startFetching] = useFetchHTML(),
        [createWpPost]=useCreateWpPost(),
        [createParsingTemplate]=useCreateParsingTemplate(),
        close = () => {
            dispatch(closeVisulaConstructor());
        },
        buttonClickHandler = useCallback(() => {
            if (!saveParsingTemplate) {
                createWpPost()
            } else {
                createParsingTemplate();
            }
            //close();
        }, [saveParsingTemplate]),
        isVisualConstructorReady = useMemo(() => frameIsReady && !isFetching, [frameIsReady, isFetching]);
    useEffect(() => {
        if (isOpen) {
            disableScrolling();
            startFetching(url);
        }else{
            enableScrolling();
            setFrameIsReady(false);
        }
    }, [isOpen])

    const modalWindow = () => {
        return (
            <div className="media-modal-wrapper">
                <div className="modal-container">
                    <div className="modal-header">
                        <h1>Parsing Constructor</h1>
                        <button
                            type="button"
                            className="media-modal-close"
                            onClick={close}
                        >
                            <span className="media-modal-icon">
                                <span className="screen-reader-text">Close dialog</span>
                            </span>
                        </button>
                    </div>
                    {!isVisualConstructorReady && <LoadingSpinner />}
                    <div className="modal-main">
                        <div className="parsed-data-container">
                            {
                                //<Frame injectHTML={htmlData} injectCSS={} onReady={this.frameIsReady}/>
                            }
                            <Frame onReady={() => setFrameIsReady(true)} />
                        </div>
                        <div className="resize-drag-bar"></div>

                        <SidebarRight />
                    </div>
                    <div className="visual-container-modal-footer d-flex flex-row justify-content-end align-items-center">
                        <button
                            type="button"
                            className="button button-large button-primary"
                            onClick={buttonClickHandler}
                        >
                            {saveParsingTemplate ? "Save Template" : "Create Post"}
                        </button>
                    </div>
                </div>
                <div className="media-modal-backdrop"></div>
            </div>
        );
    }

    return (
        <>
            {isOpen && modalWindow()}
        </>
    );
}

export default VisualConstructor;
