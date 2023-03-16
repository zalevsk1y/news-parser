import { useCallback,useState } from 'react';
import {useDispatch} from 'react-redux';


export const useNewCategory=(addCategoryParams)=> {
    const [newCategoryParams, setNewCategoryParams] = useState(addCategoryParams);
  
    const dispatch = useDispatch();
  
    const newCategoryNameInputHandler = useCallback((event) => {
      setNewCategoryParams({ ...newCategoryParams, name: event.target.value });
    }, [newCategoryParams]);
  
    const newCategoryParentSelectHandler = useCallback((event) => {
      setNewCategoryParams({ ...newCategoryParams, parent: event.target.value });
    }, [newCategoryParams]);
  
    const addCategoryHandler = useCallback(() => {
      if (newCategoryParams.name === "") return null;
      dispatch(createCategory(newCategoryParams.name, newCategoryParams.parent));
    }, [dispatch, newCategoryParams]);
  
    return [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategoryHandler];
  }
  