import { requestApi } from "@news-parser/helpers/api/requestApi";
import { useCallback, useState } from "react";
import { PARSER_RSS_LIST, PARSE } from "@news-parser/config/constants";
import { showMessage } from "@news-parser/message/actions";
import { getTemplate } from "@news-parser/template/actions";
import { setAppState } from "../actions/app.actions";
import { useMapPostList } from "./useMapPostList";
import { decodeHTMLEntities, setUrlSearchParams } from '@news-parser/helpers/';
import { useStore, useDispatch } from "react-redux";

export const useParseListAction = () => {
    const startFetching = useCallback((url) => setUrlSearchParams({entity:PARSER_RSS_LIST, url}), []);
    return startFetching;
}