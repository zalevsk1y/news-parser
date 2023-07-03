import React, { useCallback } from 'react';
import { useGetSaveParsingTemplate } from "@news-parser/entities/sidebarTemplate/hooks"
import { useCreateWpPost } from '@news-parser/entities/post/hooks';
import { useCreateTemplate } from '../hooks';
import { useShowMessage } from '@news-parser/entities/message/hooks'
import { useClose } from '../hooks/visual-constructor/useClose'

export const VisualConstructorFooterRss = () => {
    const shouldParsingTemplateToBeSaved = useGetSaveParsingTemplate();
    const createWpPost = useCreateWpPost();
    const [isTemplateCreating, createTemplate] = useCreateTemplate();
    const close = useClose();
    const showMessage = useShowMessage()
    const buttonClickHandler = useCallback(() => {
        if (!shouldParsingTemplateToBeSaved) {
            createWpPost().then(() => close()).then(() => showMessage('success', "Post was parsed and saved."))
        } else {
            createTemplate().then(() => close()).then(() => showMessage('success', "Template was saved."))
        }

    }, [shouldParsingTemplateToBeSaved]);
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