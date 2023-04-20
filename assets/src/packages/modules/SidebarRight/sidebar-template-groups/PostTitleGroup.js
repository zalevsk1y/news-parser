import {  InfoBody, InfoFooter } from "@news-parser/ui/sidebar/";
import {useGetPostTitle,useSetPostTitle} from '@news-parser/entities/sidebarTemplate/hooks';
import { useCallback } from "react";


export const PostTitleGroup=()=>{
    const [newTitle,setNewTitle]=useState('');
    const changeStateInputTitle=useCallback(value=>setNewTitle(value),[setNewTitle]);
    const selectTitle=useSetPostTitle()
    const title=useGetPostTitle();
    const selectTitleHandler = useCallback(() => {
        selectTitle(newTitle);
        setNewTitle('');
      }, [newTitle]);
    return (
        <>
        <InfoBody>
          <span>{title}</span>
          <Input onChange={changeStateInputTitle} value={newTitle} />
          <p className="howto">
            If you want to change title, type the new title and press "Change
            title" button.
          </p>
        </InfoBody>
        <InfoFooter>
          <button
            type="button"
            className="button button-primary button-large"
            onClick={selectTitleHandler}
          >
            Change title
          </button>
        </InfoFooter>
     
        </>
    )
}