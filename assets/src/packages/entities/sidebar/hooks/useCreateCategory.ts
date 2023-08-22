import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants'
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { Category } from 'types/sidebar';
import { selectCategory } from '../actions/category.actions';
import { useFetchCategories } from './useFetchCategories';

namespace useCreateCategory {
  export type CreateCategoryResponseType = Required<Category>;
  export type NewCategoryParams=Category;
  export type NewCategoryNameInputHandler=React.FormEventHandler<HTMLInputElement>;
  export type NewCategoryParentSelectHandler=React.ChangeEventHandler<HTMLSelectElement>;
  export type AddCategoryHandler=()=>Promise<CreateCategoryResponseType>;
  export type IsMutating=boolean;
  export type UseCreateCategory=(addCategoryParams:Category)=>[NewCategoryParams,NewCategoryNameInputHandler,NewCategoryParentSelectHandler,AddCategoryHandler,IsMutating]
}

/**
 * Custom hook for creating a category.
 * @type {UseCreateCategory}
 * @param {Category} addCategoryParams - The initial category parameters.
 * @returns {Array} An array containing the new category parameters, event handlers, and the addCategoryHandler function, as well as the isMutating flag.
 */


export const useCreateCategory:useCreateCategory.UseCreateCategory = (addCategoryParams) => {
  const [newCategoryParams, setNewCategoryParams] = useState<useCreateCategory.NewCategoryParams>(addCategoryParams);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [isFetching, startFetching] = useFetchCategories()
  const options: requestApi.RequestApiOptions = { entity: configConstantsEntities.API_WP_CATEGORIES, event: cofigConstantsEvents.POST, data: {} };
  const success: requestApi.RequestApiSuccess<useCreateCategory.CreateCategoryResponseType> = (category) => startFetching().then(() => {
      dispatch(selectCategory(category.id));
      setNewCategoryParams({ ...newCategoryParams, name: '' });
      setIsMutating(false);
      return new Promise(resolve=>resolve(category))
    });
  const error: requestApi.RequestApiError = (errorData) => {
    const { msg } = errorData;
    throw new Error(msg)
  };
  const newCategoryNameInputHandler:React.FormEventHandler<HTMLInputElement>= useCallback((event) => {
    const targetElement=event.target as HTMLInputElement;
    setNewCategoryParams({ ...newCategoryParams, name: targetElement.value });
  }, [newCategoryParams]);

  const newCategoryParentSelectHandler:React.ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
    const targetElement=event.target as HTMLSelectElement;
    setNewCategoryParams({ ...newCategoryParams, parent: parseInt(targetElement.value) });
  }, [newCategoryParams]);

  const addCategoryHandler:useCreateCategory.AddCategoryHandler = useCallback(() => {
    if (newCategoryParams.name === '') throw new Error('Category name could not be an empty string.')
    options.data = { name: newCategoryParams.name, parent: newCategoryParams.parent };
    setIsMutating(true);
    return requestApi(options, success, error).finally(() => setIsMutating(false))
  }, [dispatch, newCategoryParams]);


  return [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategoryHandler, isMutating];
}
