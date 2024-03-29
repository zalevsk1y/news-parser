import React, { useCallback } from 'react';
import { useGetSaveParsingTemplate } from "@news-parser/entities/sidebarTemplate/hooks"
import { useCreateWpPost,useResetSelectedPosts } from '@news-parser/entities/post/hooks';
import { useShowMessage } from '@news-parser/entities/message/hooks'
import { useCreateTemplate, useIsMutating } from '../hooks';
import { useClose } from '../hooks/visual-constructor/useClose';
import { WIDGETS } from '@news-parser/config/i18n';

interface VisualConstructorFooterRss{
    rssUrl:string|false
}
type settledCallback = <PromiseType>(promise:Promise<PromiseType>,message:string)=>void;


export const VisualConstructorFooterRss:React.FC<VisualConstructorFooterRss> = ({rssUrl}) => {
    const shouldParsingTemplateToBeSaved = useGetSaveParsingTemplate();
    const createWpPost = useCreateWpPost();
    const [isTemplateCreating, createTemplate] = useCreateTemplate();
    const [,setIsMutating]=useIsMutating();
    const resetSelectedPost = useResetSelectedPosts()
    const close = useClose();
    const showMessage = useShowMessage()
    const buttonClickHandler = useCallback(() => {
        const settledCallback:settledCallback = (promise,message) => promise
            .then(()=>showMessage('success',message))
            .catch((err)=>showMessage('success',err.message))
            .finally(() => {
                setIsMutating(false);
                resetSelectedPost();
                close();
            })
        setIsMutating(true);
        if (!shouldParsingTemplateToBeSaved) {
            settledCallback(createWpPost(), "Post was parsed and saved.")
        } else if(typeof rssUrl==='string')settledCallback(createTemplate(rssUrl), "Template was saved.")
       
    }, [shouldParsingTemplateToBeSaved,createTemplate]);
    return (
        <div className="visual-container-modal-footer d-flex flex-row justify-content-end align-items-center">
            <button
                disabled={isTemplateCreating}
                type="button"
                className="button button-large button-primary"
                onClick={buttonClickHandler}
            >
                {shouldParsingTemplateToBeSaved ? WIDGETS.VISUAL_CONSTRUCTOR.SAVE_TEMPLATE_BUTTON : WIDGETS.VISUAL_CONSTRUCTOR.CREAT_POST_BUTTON}
            </button>
        </div>
    )
}