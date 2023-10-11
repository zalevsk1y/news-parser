import { useState } from "react";
import { requestApi,RequestApiSuccess,RequestApiError, RequestApiOptions } from "@news-parser/helpers/api/requestApi";
import { configConstantsMethods, configConstantsEntities } from '@news-parser/config/constants';
import { useDispatch } from "react-redux";
import { ResponseType } from '@news-parser/types';
import { TemplateDataWithPostOptions } from 'types/template'
import { setTemplate } from "../actions/template.actions";


export type TemplateResponseType = ResponseType<TemplateDataWithPostOptions>;
export type IsFetching = boolean;
export type FetchTemplate = (url: string) => Promise<TemplateResponseType>
export type UseFetchTemplate = () => [IsFetching, FetchTemplate]


/**
 * Custom hook for fetching template data.
 * @returns {Array} An array containing the fetching status and the fetchTemplate function.
 * - isFetching: A boolean indicating whether the data is currently being fetched.
 * - fetchTemplate: A function used to initiate the template data fetching process.
* */

export const useFetchTemplate: UseFetchTemplate = () => {
    const [isFetching, setIsFetching] = useState(false);
        const dispatch = useDispatch();
        const success: RequestApiSuccess<TemplateResponseType> = (templateData) => {
            const { data } = templateData;
            dispatch(setTemplate(data));
            return new Promise(resolve => resolve(templateData))
        };
        const error: RequestApiError = (errorData) => {
            const {data}=errorData;
            throw new Error(data.message.text);
        };
        const fetchTemplate: FetchTemplate = (url: string) => {
            const options: RequestApiOptions = { entity: configConstantsEntities.TEMPLATE, event: configConstantsMethods.GET, data: { url } };
            setIsFetching(true);
            return requestApi(options, success, error).finally(() => setIsFetching(false))
        }
    return [isFetching, fetchTemplate]
}