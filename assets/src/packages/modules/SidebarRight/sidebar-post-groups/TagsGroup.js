import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  TagInput  from "../../../sidebar/src/components/TagInput";
import { createTag, diselectTag, selectTag } from "../../actions/tag.actions";
import { SidebarItem } from "../../../sidebar/src/components/SidebarItem";
import { useGetTags } from "../../hooks/useGetTags";
import {useCreateTag} from "../../hooks/useCreateTag"


const TagsGroup = () => {
  const [isFetching,startTagsFetching]=useFetchTags();
  const [tags,selected]=useGetTags();
  const [isMutating,selectTag]=useSelectTag(tags);
  const selectedTags=useMemo(()=>tags.filter((tag) => selected.includes(tag.id)),[tags,selected])
  useEffect(()=>startTagsFetching())
  return (
    <SidebarItem>
      <TagInput
        disabled={isTagsFetching}
        id="tag-input"
        labelText="Add New Tag:"
        bottomCapture="Separate with commas or the Enter key."
        onChange={selectTag}
        tags={selectedTags}
      />
    </SidebarItem>
  );
};

export default TagsGroup;
