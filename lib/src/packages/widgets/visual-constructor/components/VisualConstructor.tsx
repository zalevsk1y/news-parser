import React, { useState, useMemo, useLayoutEffect, useEffect, useCallback, Suspense } from 'react';
import { LoadingSpinner } from '@news-parser/ui/visual-constructor/LoadingSpinner';
import { useFetchTags, useFetchCategories } from '@news-parser/entities/sidebar/hooks';
import { useScrolling } from '../../../hooks/useScrolling';
import { useIsOpen } from '../hooks/visual-constructor/useIsOpen';
import { useIsMutating, useClose, useGetPostId } from '../hooks';
import { VisualConstructorHeader } from './VisualConstructorHeader';
import { Frame } from './Frame';
import { useResetSidebarTemplate } from '@news-parser/entities/sidebarTemplate/hooks/';
import { useResetSidebar } from '@news-parser/entities/sidebar/hooks';
import { WIDGETS } from '@news-parser/config/i18n';

interface VisualConstructorProps {
    onReady?: () => void,
    children: Array<React.ReactElement>
}

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


export const VisualConstructor: React.FC<VisualConstructorProps> = ({ onReady, children }) => {
    const [, fetchTags] = useFetchTags();
    const [, fetchCategories] = useFetchCategories();
    const [enableScrolling, disableScrolling] = useScrolling();
    const [frameIsReady, setFrameIsReady] = useState<boolean>(false);
    const closeVisualConstructor = useClose();
    const [url, isOpen] = useIsOpen();
    const [isMutating] = useIsMutating();
    const resetSelectedContent = useResetSidebarTemplate();
    const resetSidebarData = useResetSidebar();
    const isVisualConstructorReady = useMemo(() => frameIsReady && !isMutating, [frameIsReady, isMutating]);
    useEffect(() => {
        fetchTags();
        fetchCategories();
    }, [])
    useLayoutEffect(() => {
        if (isOpen) {
            disableScrolling();
        } else {
            setFrameIsReady(false);
            resetSelectedContent();
            resetSidebarData();
            enableScrolling();
        }
    }, [isOpen]);
    const onFrameReady = useCallback(() => setFrameIsReady(true), [setFrameIsReady]);
    return (
        <div className='media-modal-wrapper' style={{ display: isOpen ? 'block' : 'none' }}>
            <div className='modal-container'>
                <VisualConstructorHeader title={WIDGETS.VISUAL_CONSTRUCTOR.WIDGET_TITLE} closeHandler={closeVisualConstructor} />
                <div className='d-flex flex-column flex-grow-1 position-relative'>
                    {!isVisualConstructorReady && <LoadingSpinner style={{ paddingBottom: '22vh' }} />}
                    <div className='modal-main'>
                        <div className='parsed-data-container'>
                            <Frame onReady={onFrameReady} isOpen={isOpen} url={url} />
                        </div>
                        <div className='resize-drag-bar' />
                        {
                            // The menu element should be unmounted from the DOM when the visual constructor is closed
                            // to avoid unnecessary recalculations and re-renders of elements that are not in use. Performance optimization
                            isOpen && children[0]
                        }
                    </div>
                    {children[1]}
                </div>
            </div>
            <div className='media-modal-backdrop' />
        </div>
    );
}


