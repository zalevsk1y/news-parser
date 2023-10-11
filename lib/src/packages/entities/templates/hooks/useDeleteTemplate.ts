import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { requestApi,RequestApiSuccess,RequestApiError, RequestApiOptions } from '@news-parser/helpers/api/requestApi';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants';
import { ResponseType } from '@news-parser/types';
import { setTemplates } from '../actions/templates.actions';


export type TemplatesResponseType = ResponseType<Array<string>>;
export type isDeleting = boolean;
export type DeleteTemplate = (templateId:string) => void//Promise<TemplatesResponseType>;
export type UseDeleteTemplate = () => [isDeleting, DeleteTemplate]


export const useDeleteTemplate: UseDeleteTemplate = () => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
        const dispatch = useDispatch();
        const success: RequestApiSuccess<TemplatesResponseType> = (templateDate) => {
            const { data } = templateDate;
            dispatch(setTemplates(data));
            return new Promise(resoleve => resoleve(templateDate))
        };
        const error: RequestApiError = (errorData) => {
            const {data}=errorData;
            throw new Error(data.message.text);
        };
        const DeleteTemplate:DeleteTemplate = (templateId) => {
            const options:RequestApiOptions = { entity: configConstantsEntities.TEMPLATE, event: cofigConstantsEvents.DELETE, data: {url:templateId} };
            setIsDeleting(true);
            return requestApi(options, success, error).finally(() => setIsDeleting(false))
        }
    return [isDeleting, DeleteTemplate];
}