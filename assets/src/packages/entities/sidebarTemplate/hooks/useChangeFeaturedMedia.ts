import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { ParserRootState } from 'types/state';
import { ParsedData,ImageContent } from 'types/sidebarTemplate';
import {useSetFeaturedMedia} from './useSetFeaturedMedia';

/**
 * Custom hook for changing the featured media of a post.
 * @returns {Function} The changeFeaturedMedia function.
 */

interface ParseImagedData extends ParsedData{
    content:ImageContent
}

export const useChangeFeaturedMedia=()=>{   
    const setPostFeaturedMedia=useSetFeaturedMedia();
    const {parsedData}=useSelector((state:ParserRootState)=>state.parse.sidebarTemplate);
    const changeFeaturedMedia=useCallback(()=>{
        const imgTagObject:ParseImagedData|undefined=Object.values(parsedData.body).find((item:any):item is ParseImagedData=>item.content?.src) as ParseImagedData|undefined;
        if(imgTagObject===undefined) return;
        let src;
        if(imgTagObject.content.srcSet!==undefined) {
            const srcArr=imgTagObject.content.srcSet.split(',');
            if(srcArr.length>0) {
                const media=srcArr.pop() as string;
                src=media.trim().split(' ')[0];
            }
        }
            imgTagObject.content.src;
        src&&setPostFeaturedMedia(src);
    },[parsedData]);
    return changeFeaturedMedia;
}