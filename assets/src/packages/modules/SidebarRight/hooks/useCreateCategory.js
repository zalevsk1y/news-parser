import {useState} from 'react';
import {useSelectCategorie} from './useSelectCategorie';


export const useCreateCategory=()=>{
  const [isMutating, setIsMutating] = useState(false);
  const [selectCategory]=useSelectCategorie()
  const [isFetching,startCategoriesFetching]=useFetchCategories();
  const options = { entity: API_WP_CATEGORIES, event: POST, data: {} };
  const success = (entity, event, { id, name, parent }) => {
    startCategoriesFetching()).then(()=>{
      selectCategory(id);
      setNewCategoryParams({...newCategoryParams, name:''})
      setIsMutating(false);
    })
  };
  const error = (entity, event, errorData) => {
    const { msg } = errorData;
    console.error(msg.text);
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


  return [newCategoryParams, newCategoryNameInputHandler, newCategoryParentSelectHandler, addCategoryHandler,isMutate];
}