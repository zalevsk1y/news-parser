import { useState } from 'react'
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { configConstantsMethods, configConstantsEntities } from '@news-parser/config/constants';
import { formatCreateTemplateRequest } from '@news-parser/helpers/response-formatters/TemplateModelWithPostOptions';
import { useSelector } from 'react-redux';
import { useFetchTemplate } from '@news-parser/entities/template/hooks/';
import { ResponseType } from 'types/index';
import { TemplateDataWithPostOptions } from 'types/template';
import { ParserRootState } from 'types/state'

namespace useCreateTemplate {
    export type CreateTemplateResponseType = ResponseType<TemplateDataWithPostOptions>;
    export type IsFetching = boolean;
    export type CreateTemplate = (rssUrl: string) => Promise<CreateTemplateResponseType>
    export type UseCreateTemplate = () => [IsFetching, CreateTemplate]
}

export const useCreateTemplate: useCreateTemplate.UseCreateTemplate = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [isTemplateFetching, fetchTemplate] = useFetchTemplate()
    const { parsedData, postOptions, extraOptions } = useSelector((state: ParserRootState) => ({
        parsedData: state.parse.sidebarTemplate.parsedData,
        postOptions: state.parse.sidebar,
        extraOptions: state.parse.sidebarTemplate.options
    }));
    const createTemplate = (rssUrl: string) => {
        const requestOptions: requestApi.RequestApiOptions = { entity: configConstantsEntities.TEMPLATE, event: configConstantsMethods.CREATE, data: null };
        const error: requestApi.RequestApiError = (errorData) => {
            const { msg } = errorData;
            throw new Error(msg)
        };
        const success: requestApi.RequestApiSuccess<useCreateTemplate.CreateTemplateResponseType> = (templateData) => {
            fetchTemplate(rssUrl)
            return new Promise(resolve => resolve(templateData));
        };
        setIsFetching(true);
            const template = formatCreateTemplateRequest(parsedData, rssUrl, postOptions, extraOptions);
            requestOptions.data = { template };
            return requestApi(requestOptions, success, error).finally(() => setIsFetching(false))
        }
    return [isFetching, createTemplate]
}