import { useDispatch } from "react-redux";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import {API_WP_TAGS,POST} from "@news-parser/config/constants";
import { pushTag,selectTag } from '../actions/tag.actions'
import { showMessage } from "@news-parser/message/actions/";
import { useCallback, useState } from "react";

export const useCreateTag = (tags) => {
    const dispatch = useDispatch();
    const [isFetching,setIsFetching]=useState(false);
    const success = (entity,event,tag) => { 
        dispatch (pushTag(tag));
        dispatch (selectTag(tag.id))
    };
    const error = (entity,event,errorData) => {
        const { msg } = errorData;
            msg && dispatch(showMessage(msg.type, msg.text));
     };
    const createTag = useCallback((tag) => {
        const options={entity:API_WP_TAGS,event:POST,data:tag};
        if (tag.id === undefined) {
            const tagExists = tags.filter((item) => item.name === tag.name)[0];
            if (tagExists === undefined){
                setIsFetching(true);
                requestApi(options,success,error).then(setIsFetching(false))
            }else{
                dispatch(selectTag(tagExists.id));
            }
        }
    },[tags])
    return [isFetching,createTag];
} 