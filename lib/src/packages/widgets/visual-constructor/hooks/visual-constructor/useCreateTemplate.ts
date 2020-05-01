import { useState } from 'react'
import { requestApi,RequestApiError,RequestApiOptions,RequestApiSuccess } from '@news-parser/helpers/api/requestApi';
import { configConstantsMethods, configConstantsEntities } from '@news-parser/config/constants';
import { formatCreateTemplateWithOptionsRequest } from '@news-parser/helpers/response-formatters/formatCreateTemplateWithOptionsRequest';
import { useSelector } from 'react-redux';
import { useFetchTemplate } from '@news-parser/entities/template/hooks/';
import { ResponseType } from 'types/index';
import { TemplateDataWithPostOptions } from 'types/template';
import { ParserRootState } from 'types/state';


export type CreateTemplateResponseType = ResponseType<TemplateDataWithPostOptions>;
export type IsFetching = boolean;
export type CreateTemplate = (rssUrl: string) => Promise<CreateTemplateResponseType>
export type UseCreateTemplate = () => [IsFetching, CreateTemplate]


export const useCreateTemplate: UseCreateTemplate = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [, fetchTemplate] = useFetchTemplate()
    const { parsedData, postOptions, extraOptions } = useSelector((state: ParserRootState) => ({
        parsedData: state.parse.sidebarTemplate.parsedData,
        postOptions: state.parse.sidebar,
        extraOptions: state.parse.sidebarTemplate.options
    }));
    const createTemplate = (rssUrl: string) => {
        const requestOptions: RequestApiOptions = { entity: configConstantsEntities.TEMPLATE, event: configConstantsMethods.CREATE, data: null };
        const error: RequestApiError = (errorData) => {
            const { data } = errorData;
            throw new Error(data.message.text);
        };
        const success: RequestApiSuccess<CreateTemplateResponseType> = (templateData) => {
            fetchTemplate(rssUrl)
            return new Promise(resolve => resolve(templateData));
        };
        setIsFetching(true);
            const template = formatCreateTemplateWithOptionsRequest(parsedData, rssUrl, postOptions, extraOptions);
            requestOptions.data = { template };
            return requestApi(requestOptions, success, error).finally(() => setIsFetching(false))
        }
    return [isFetching, createTemplate]
}