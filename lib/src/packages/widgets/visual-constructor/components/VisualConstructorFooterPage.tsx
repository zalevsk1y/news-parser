import React, { useCallback } from 'react';
import { useCreateWpPost, useCreateLocalPost } from '@news-parser/entities/post/hooks';
import { useShowMessage } from '@news-parser/entities/message/hooks'
import { DEFAULT_POST_DATA } from '@news-parser/entities/post/constants';
import { useIsMutating } from '../hooks';
import { useClose } from '../hooks/visual-constructor/useClose';
import { useGetCurrentPostAttributes } from '../hooks/visual-constructor/useGetCurrentPostAttributes';
import { MESSAGE, WIDGETS } from '@news-parser/config/i18n';

export const VisualConstructorFooterPage: React.FC = () => {
    const createWpPost = useCreateWpPost();
    const currentPostAttributes = useGetCurrentPostAttributes();
    const [createLocalPost,removeLocalPost] = useCreateLocalPost();
    const [, setIsMutating] = useIsMutating();
    const close = useClose();
    const showMessage = useShowMessage()
    const buttonClickHandler = useCallback(() => {
        setIsMutating(true);
        const postId = createLocalPost(Object.assign(DEFAULT_POST_DATA, currentPostAttributes));
        createWpPost(postId)
            .then(() => {
                setIsMutating(false);
                close();
                showMessage('success', MESSAGE.SUCCESS.POST_PARSED);
            })
            .catch(err=>{
                removeLocalPost(postId)
                showMessage('error',MESSAGE.ERROR.POST_NOT_PARSED)
            })
    }, [createLocalPost, currentPostAttributes]);
    return (
        <div className='visual-container-modal-footer d-flex flex-row justify-content-end align-items-center'>
            <button
                type='button'
                className='button button-large button-primary'
                onClick={buttonClickHandler}
            >
                {WIDGETS.VISUAL_CONSTRUCTOR.CREAT_POST_BUTTON}
            </button>
        </div>
    )
}