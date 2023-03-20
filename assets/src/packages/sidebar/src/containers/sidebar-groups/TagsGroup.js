import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  TagInput  from "../../components/TagInput";
import { createTag, diselectTag, selectTag } from "../../actions/tag.actions";
import { SidebarItem } from "../../components/SidebarItem";
import { useGetTags } from "../../hooks/useGetTags";
import {useCreateTag} from "../../hooks/useCreateTag"


const TagsGroup = () => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.parse.sidebar.tags);
  const selected = useSelector((state) => state.parse.sidebar.selectedTags);
  const [isTagsFetching,startTagsFetching] = useGetTags();
  const [isTagSelected,selectTag]=useCreateTag(tags);
  useEffect(()=>{
    startTagsFetching();
  },[])
  return (
    <SidebarItem>
      <TagInput
        disabled={isTagsFetching}
        id="tag-input"
        labelText="Add New Tag:"
        bottomCapture="Separate with commas or the Enter key."
        onChange={selectTag}
        tags={tags.filter((tag) => selected.includes(tag.id))}
      />
    </SidebarItem>
  );
};

export default TagsGroup;
