import { useState } from "react";
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { configConstantsMethods, configConstantsEntities } from '@news-parser/config/constants';
import { useDispatch } from "react-redux";
import { ResponseType } from '@news-parser/types';
import { TemplateDataWithPostOptions } from 'types/template'
import { setTemplate } from "../actions/template.actions";
import { MessageFormat } from "types/message";

namespace useFetchTemplate {
    export type TemplateResponseType = ResponseType<TemplateDataWithPostOptions>;
    export type IsFetching = boolean;
    export type FetchTemplate = (url: string) => Promise<TemplateResponseType>
    export type UseFetchTemplate = () => [IsFetching, FetchTemplate]
}

/**
 * Custom hook for fetching template data.
 * @returns {Array} An array containing the fetching status and the fetchTemplate function.
 * - isFetching: A boolean indicating whether the data is currently being fetched.
 * - fetchTemplate: A function used to initiate the template data fetching process.
* */

export const useFetchTemplate: useFetchTemplate.UseFetchTemplate = () => {
    const [isFetching, setIsFetching] = useState(false);
        const dispatch = useDispatch();
        const success: requestApi.RequestApiSuccess<useFetchTemplate.TemplateResponseType> = (templateData) => {
            const { data } = templateData;
            dispatch(setTemplate(data));
            return new Promise(resolve => resolve(templateData))
        };
        const error: requestApi.RequestApiError = (errorData) => {
            const {data}=errorData;
            throw new Error(data.message.text);
        };
        const fetchTemplate: useFetchTemplate.FetchTemplate = (url: string) => {
            const options: requestApi.RequestApiOptions = { entity: configConstantsEntities.TEMPLATE, event: configConstantsMethods.GET, data: { url } };
            setIsFetching(true);
            return requestApi(options, success, error).finally(() => setIsFetching(false))
        }
    return [isFetching, fetchTemplate]
}