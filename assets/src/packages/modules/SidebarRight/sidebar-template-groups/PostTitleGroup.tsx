import React,{ useState , useCallback } from "react";
import {  InfoBody, InfoFooter } from "@news-parser/ui/sidebar/";
import {useGetPostTitle,useSetPostTitle} from '@news-parser/entities/sidebarTemplate/hooks';


export function PostTitleGroup() {
    const [newTitle,setNewTitle]=useState('');
    const changeStateInputTitle=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>setNewTitle(e.target.value),[setNewTitle]);
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
          <input onChange={changeStateInputTitle} value={newTitle} type='text'  className="form-control"/>
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