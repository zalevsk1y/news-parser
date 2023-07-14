import React, { useCallback } from 'react';
import { useGetSaveParsingTemplate } from "@news-parser/entities/sidebarTemplate/hooks"
import { useCreateWpPost,useResetSelectedPosts } from '@news-parser/entities/post/hooks';
import { useCreateTemplate, useIsMutating } from '../hooks';
import { useShowMessage } from '@news-parser/entities/message/hooks'
import { useClose } from '../hooks/visual-constructor/useClose';

export const VisualConstructorFooterRss = ({rssUrl}) => {
    const shouldParsingTemplateToBeSaved = useGetSaveParsingTemplate();
    const createWpPost = useCreateWpPost();
    const [isTemplateCreating, createTemplate] = useCreateTemplate();
    const [isMutating,setIsMutating]=useIsMutating();
    const resetSelectedPost = useResetSelectedPosts()
    const close = useClose();
    const showMessage = useShowMessage()
    const buttonClickHandler = useCallback(() => {
        const settledCallback = (promis,message) => {
            return promis.then(() => {
                setIsMutating(false);
                resetSelectedPost();
                close();
            }).then(()=>showMessage('success',message))
        };
        setIsMutating(true);
        if (!shouldParsingTemplateToBeSaved) {
            settledCallback(createWpPost(), "Post was parsed and saved.")
        } else {
            settledCallback(createTemplate(rssUrl), "Template was saved.")
        }
       
    }, [shouldParsingTemplateToBeSaved]);
    return (
        <div className="visual-container-modal-footer d-flex flex-row justify-content-end align-items-center">
            <button
                disabled={isTemplateCreating}
                type="button"
                className="button button-large button-primary"
                onClick={buttonClickHandler}
            >
                {shouldParsingTemplateToBeSaved ? "Save Template" : "Create Post"}
            </button>
        </div>
    )
}