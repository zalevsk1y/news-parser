import React, { useCallback } from 'react';
import { useGetSaveParsingTemplate } from "@news-parser/entities/sidebarTemplate/hooks"
import { useCreateWpPost, useCreateLocalPost } from '@news-parser/entities/post/hooks';
import { useCreateTemplate, useIsMutating } from '../hooks';
import { useShowMessage } from '@news-parser/entities/message/hooks'
import { useClose } from '../hooks/visual-constructor/useClose'
import { useGetCurrentPostAttributes } from '../hooks/visual-constructor/useGetCurrentPostAttributes';
import { DEFAULT_POST_DATA } from '@news-parser/entities/post/constants';

export const VisualConstructorFooterPage = () => {
    const shouldParsingTemplateToBeSaved = useGetSaveParsingTemplate();
    const createWpPost = useCreateWpPost();
    const currentPostAttributes = useGetCurrentPostAttributes();
    const createLocalPost = useCreateLocalPost();
    const [isMutating, setIsMutating] = useIsMutating();
    const [isTemplateCreating, createTemplate] = useCreateTemplate();
    const close = useClose();
    const showMessage = useShowMessage()
    const buttonClickHandler = useCallback(() => {
        setIsMutating(true);
        if (!shouldParsingTemplateToBeSaved) {
           const postId = createLocalPost(Object.assign(DEFAULT_POST_DATA,currentPostAttributes));
            createWpPost(postId).then(() => {
                setIsMutating(false);
                close();
                showMessage('success', "Post was parsed and saved.")
            })
        } else {

            createTemplate().then(() => close()).then(() => {
                setIsMutating(false);
                showMessage('success', "Template was saved.")
            })
        }

    }, [shouldParsingTemplateToBeSaved, createLocalPost,currentPostAttributes]);
    return (
        <div className="visual-container-modal-footer d-flex flex-row justify-content-end align-items-center">
            <button
                type="button"
                className="button button-large button-primary"
                onClick={buttonClickHandler}
            >
                {shouldParsingTemplateToBeSaved ? "Save Template" : "Create Post"}
            </button>
        </div>
    )
}