import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_WP_CATEGORIES, POST } from '@news-parser/config/constants'
import { requestApi } from "@news-parser/helpers/api/requestApi";
import { pushCategory, selectCategory } from '../actions/category.actions';

export const useCreateCategory = (addCategoryParams) => {
  const [newCategoryParams, setNewCategoryParams] = useState(addCategoryParams);
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const options = { entity: API_WP_CATEGORIES, event: POST, data: {} };
  const success = (entity, event, { id, name, parent }) => {
    dispatch(pushCategory({ id, name, parent }));
    dispatch(selectCategory(id));
    setNewCategoryParams({...newCategoryParams, name:''})
    setIsFetching(false)
  };
  const error = (entity, event, errorData) => {
    const { msg } = errorData;
    console.error(msg.text);
    setIsFetching(false)
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
    setIsFetching(true);
    return requestApi(options, success, error)
  }, [dispatch, newCategoryParams]);


  return [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategoryHandler];
}
