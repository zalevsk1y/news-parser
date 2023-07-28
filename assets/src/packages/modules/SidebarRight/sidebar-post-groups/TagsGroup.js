import React, { useCallback, useEffect, useState } from "react";
import { TagInput } from "@news-parser/components/";
import { SidebarItem } from "@news-parser/ui/sidebar";
import { useSelectTag } from "@news-parser/entities/sidebar/hooks/";
import { useMemo } from "react";
import { TagItem } from "@news-parser/ui/TagItem";


const TagsGroup = () => {
  const [isMutating, selectTag,diselectTag] = useSelectTag();
  const [selectedTags, setSelectedTags] = useState([]);
  const createTagHandler = useCallback((tagName)=>{
    setSelectedTags(selectedTags.concat(tagName));
    selectTag(tagName);
  },[selectedTags]);
  const removeTagHandler = useCallback((tagName)=>{
    setSelectedTags(selectedTags.filter(tag => tag !== tagName));
    diselectTag(tagName);
  },[selectedTags,diselectTag]);
  const renderTags = useMemo(() => {
    if (selectedTags.length == 0) return [];
    return selectedTags.map((tagName, i) => {
      const removeHandler = () => {
        removeTagHandler(tagName);
      };
      return <TagItem tagName={tagName} key={'tag-'+tagName} removeTagHandler={removeHandler}/>;
    });
  }, [selectedTags,removeTagHandler])
  return (
    <SidebarItem>
      <TagInput
        id="tag-input"
        labelText="Add New Tag:"
        bottomCapture="Separate with commas or the Enter key."
        onCreate={createTagHandler}
      >
      {renderTags}
      </TagInput>
    </SidebarItem>
  );
};

export default TagsGroup;
