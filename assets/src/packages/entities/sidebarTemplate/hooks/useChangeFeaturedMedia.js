import { useSelector } from 'react-redux';
import {useSetFeaturedMedia} from './useSetFeaturedMedia';
import { useCallback } from 'react';

export const useChangeFeaturedMedia=()=>{   
    const setPostFeaturedMedia=useSetFeaturedMedia();
    const {parsedData}=useSelector(state=>state.parse.sidebarTemplate);
    const changeFeaturedMedia=useCallback(()=>{
        const imgTagObject=Object.values(parsedData.body).find(item=>item.tagName==='IMG');
        const src=imgTagObject.content?.srcset?
            imgTagObject.content.srcset.split(',').pop().trim().split(' ')[0]:
            imgTagObject.content.src;
        src&&setPostFeaturedMedia(src);
    },[parsedData]);
    return changeFeaturedMedia;
}