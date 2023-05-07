
import React, { useState, useMemo,useLayoutEffect } from "react";
import { Frame } from './Frame';
import { useScrolling } from "../hooks/visual-constructor/useScrolling";
import { useFetchHTML } from "../hooks/visual-constructor/useFetchHTML";
import { LoadingSpinner } from "@news-parser/ui/visual-constructor/LoadingSpinner";
// import '@news-parser/styles/_resize-bar.scss';
import {useIsOpen} from '../hooks/visual-constructor/useIsOpen';
import {useIsMutating} from '../hooks/'
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



export const VisualConstructor=({children})=> {
    const [enableScrolling, disableScrolling] = useScrolling();
    const [frameIsReady, setFrameIsReady] = useState(false);
    const [ url, isOpen ] = useIsOpen();
    const [isHTMLFetching, startHTMLFetching] = useFetchHTML(url);
    const isMutating=useIsMutating();
    const isVisualConstructorReady = useMemo(() => frameIsReady && !isHTMLFetching && !isMutating, [frameIsReady, isHTMLFetching, isMutating]);
    useLayoutEffect(() => {
        if (isOpen) {
            disableScrolling();
            startHTMLFetching(url);
        } else {
            enableScrolling();
            setFrameIsReady(false);
        }
    }, [url,isOpen]);
    

    return (
        <div className="media-modal-wrapper" style={{display:isOpen?'block':'none'}}>
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
                            <Frame url={url}/>
                        </div>
                        <div className="resize-drag-bar"></div>

                        {children[0]}
                    </div>
                        {children[1]}
                    </div>
                <div className="media-modal-backdrop"></div>
            </div>
    );
}


