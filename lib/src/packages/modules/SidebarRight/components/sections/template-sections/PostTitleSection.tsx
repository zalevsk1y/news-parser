import React, { useState, useCallback, FormEvent } from "react";
import { InfoBox, InfoBody, InfoFooter } from "@news-parser/ui/sidebar/";
import { useSetPostTitle } from '@news-parser/entities/sidebarTemplate/hooks';
import { PostTitleGroup } from "../../groups/template-groups/PostTitleGroup";

/**
 * Component representing the section for changing the post title in the sidebar.
 * @returns {JSX.Element} The rendered PostTitleSection component.
 */

export function PostTitleSection() {
  const [newTitle, setNewTitle] = useState('');
  const selectTitle = useSetPostTitle();
  const inputChangeHandler = useCallback((e: FormEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    setNewTitle(inputElement.value);
  }, [setNewTitle])
  const selectTitleHandler = useCallback(() => {
    selectTitle(newTitle);
    setNewTitle('');
  }, [newTitle]);
  return (
    <InfoBox title='Post title'>
      <InfoBody>
        <PostTitleGroup newTitle={newTitle} onChange={inputChangeHandler} />
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
    </InfoBox>
  )
}