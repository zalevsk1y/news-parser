import React, { useCallback } from 'react';
import { useGetSaveParsingTemplate } from "@news-parser/entities/sidebarTemplate/hooks"
import { useCreateWpPost } from '../hooks/visual-constructor';
import { useCreateTemplate } from '../hooks';
import { useClose } from '../hooks/visual-constructor/useClose'

export const VisualConstructorFooterMain = () => {
    const shouldParsingTemplateToBeSaved = useGetSaveParsingTemplate();
    const [createWpPost] = useCreateWpPost();
    const [isTemplateCreating, createTemplate] = useCreateTemplate();
    const close = useClose();
    const buttonClickHandler = useCallback(() => {
        if (!shouldParsingTemplateToBeSaved) {
            createWpPost().then(() => close())
        } else {
            createTemplate().then(() => close())
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