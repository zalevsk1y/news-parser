import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { configConstantsEntities, cofigConstantsEvents } from '@news-parser/config/constants'
import { requestApi } from '@news-parser/helpers/api/requestApi';
import { Category } from 'types/sidebar';
import { pushCategory, selectCategory } from '../actions/category.actions';

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
  const [newCategoryName, setNewCategoryName] = useState<string>(addCategoryParams.name);
  const [newCategoryParent, setNewCategoryParent] = useState<number>(addCategoryParams.parent);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const dispatch = useDispatch();
  const options: requestApi.RequestApiOptions = { entity: configConstantsEntities.API_WP_CATEGORIES, event: cofigConstantsEvents.POST, data: {} };
  const success: requestApi.RequestApiSuccess<useCreateCategory.CreateCategoryResponseType> = (category) => {
      dispatch(selectCategory(category.id));
      dispatch(pushCategory({ name:category.name,id:category.id,parent:category.parent }));
      console.log(category)
      setNewCategoryName('');
      return new Promise(resolve=>resolve(category))
    };
  const error: requestApi.RequestApiError = (errorData) => {
    const { data } = errorData;
    console.error(errorData)
    throw new Error(data.message.text);
  };
  const newCategoryNameInputHandler:React.FormEventHandler<HTMLInputElement>= useCallback((event) => {
    const targetElement=event.target as HTMLInputElement;
    setNewCategoryName(targetElement.value );
  }, [setNewCategoryName]);

  const newCategoryParentSelectHandler:React.ChangeEventHandler<HTMLSelectElement> = useCallback((event) => {
    const targetElement=event.target as HTMLSelectElement;
    setNewCategoryParent(parseInt(targetElement.value));
  }, [setNewCategoryParent]);

  const addCategoryHandler:useCreateCategory.AddCategoryHandler = useCallback(() => {
    if (newCategoryName === '') throw new Error('Category name could not be an empty string.')
    options.data = { name: newCategoryName, parent: newCategoryParent };
    setIsMutating(true);
    return requestApi(options, success, error).finally(() => setIsMutating(false))
  }, [dispatch, newCategoryName,newCategoryParent]);
  const newCategoryParams=useMemo(()=>({name:newCategoryName,parent:newCategoryParent}),[newCategoryName,newCategoryParent])


  return [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategoryHandler, isMutating];
}
