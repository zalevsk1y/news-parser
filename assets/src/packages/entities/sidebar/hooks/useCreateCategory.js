import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_WP_CATEGORIES, POST } from '@news-parser/config/constants'
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { pushCategory, selectCategory } from '../actions/category.actions';
import { useFetchCategories } from './useFetchCategories';

export const useCreateCategory = (addCategoryParams) => {
  const [newCategoryParams, setNewCategoryParams] = useState(addCategoryParams);
  const [isMutating, setIsMutating] = useState(false);
  const dispatch = useDispatch();
  const [isFetching,startFetching]=useFetchCategories()
  const options = { entity: API_WP_CATEGORIES, event: POST, data: {} };
  const success = (entity, event, { id, name, parent }) => {
    return startFetching().then(()=>{
      dispatch(selectCategory(id));
      setNewCategoryParams({...newCategoryParams, name:''});
      setIsMutating(false);
      return { id, name, parent };
    })
  };
  const error = (entity, event, errorData) => {
    const { msg } = errorData;
    console.error(msg.text);
    setIsMutating(false)
    return msg;
  };
  const newCategoryNameInputHandler = useCallback((event) => {
    setNewCategoryParams({ ...newCategoryParams, name: event.target.value });
  }, [newCategoryParams]);

  const newCategoryParentSelectHandler = useCallback((event) => {
    setNewCategoryParams({ ...newCategoryParams, parent: event.target.value });
  }, [newCategoryParams]);

  const addCategoryHandler = useCallback(() => {
    if (newCategoryParams.name === "") return null;
    options.data = { name: newCategoryParams.name, parent: newCategoryParams.parent };
    setIsMutating(true);
    return requestApi(options, success, error)
  }, [dispatch, newCategoryParams]);


  return [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategoryHandler,isMutating];
}
