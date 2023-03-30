
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import SidebarRight from '../../../modules/SidebarRight';
import { Frame } from '../../../modules/Frame';
import { closeVisulaConstructor } from '../actions/dialogData.actions';
import { useScrolling } from "../hooks/visual-constructor/useScrolling";
import { useFetchHTML } from "../hooks/visual-constructor/useFetchHTML";
import { LoadingSpinner } from "../containers/LoadingSpinner";
import '@news-parser/styles/_resize-bar.scss'
import { useCreateWpPost } from "../hooks/visual-constructor/useCreateWpPost";
import { useCreateTemplate } from "@news-parser/template/hooks/useCreateTemplate";
import SidebarRightTemplate from "../../../components/sidebar-groups/SidebarRightTemplate";
import SidebarRightPost from "../../../components/sidebar-groups/SidebarRightPost";
import {useIsOpen} from '../hooks/visual-constructor/useIsOpen'
import {useSaveParsingTemplate} from '../hooks/visual-constructor/useSaveParsingTemplate'
import {useClose} from '../hooks/visual-constructor/useSaveParsingTemplate';

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
    const [enableScrolling, disableScrolling] = useScrolling();
    const [frameIsReady, setFrameIsReady] = useState(false);
    const [ url, isOpen ] = useIsOpen();
    const shouldParsingTemplateBeSaved = useSaveParsingTemplate();
    const [isHTMLFetching, html] = useGetHTML(url);
    const [createWpPost] = useCreateWpPost();
    const [isTemplateCreating, createTemplate] = useCreateTemplate();
    const close = useClose();
    const buttonClickHandler = useCallback(() => {
            if (!shouldParsingTemplateBeSaved) {
                createWpPost()
            } else {
                createTemplate().then(() => close())
            }
            //close();
        }, [shouldParsingTemplateBeSaved]);
    const isVisualConstructorReady = useMemo(() => frameIsReady && !isHTMLFetching && !isTemplateCreating, [frameIsReady, isHTMLFetching, isTemplateCreating]);
    useEffect(() => {
        if (isOpen) {
            disableScrolling();
            startFetching(url);
        } else {
            enableScrolling();
            setFrameIsReady(false);
        }
    }, [isOpen]);
    const tabs = {
        'Template': () => (<SidebarRightTemplate />),
        'Post': () => (<SidebarRightPost />)
      };
   

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
                            <Frame onReady={() => setFrameIsReady(true)} html={html}/>
                        </div>
                        <div className="resize-drag-bar"></div>

                            <SidebarRight tabs={tabs}/>
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

export default VisualConstructor;
