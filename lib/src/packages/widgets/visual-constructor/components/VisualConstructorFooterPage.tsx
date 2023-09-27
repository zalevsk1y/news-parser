import React, { useCallback } from 'react';
import { useCreateWpPost, useCreateLocalPost } from '@news-parser/entities/post/hooks';
import { useShowMessage } from '@news-parser/entities/message/hooks'
import { DEFAULT_POST_DATA } from '@news-parser/entities/post/constants';
import { useIsMutating } from '../hooks';
import { useClose } from '../hooks/visual-constructor/useClose';
import { useGetCurrentPostAttributes } from '../hooks/visual-constructor/useGetCurrentPostAttributes';

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
                showMessage('success', 'Post was parsed and saved.')
            })
            .catch(err=>{
                removeLocalPost(postId)
                showMessage('error','Post was not parsed.')
            })
    }, [createLocalPost, currentPostAttributes]);
    return (
        <div className='visual-container-modal-footer d-flex flex-row justify-content-end align-items-center'>
            <button
                type='button'
                className='button button-large button-primary'
                onClick={buttonClickHandler}
            >
                Create Post
            </button>
        </div>
    )
}