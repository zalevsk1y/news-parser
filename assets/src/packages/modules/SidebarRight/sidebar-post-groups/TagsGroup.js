import React, { useEffect } from "react";
import  {TagInput}  from "@news-parser/ui/sidebar";
import { SidebarItem } from "@news-parser/ui/sidebar";
import { useGetTags,useFetchTags } from "@news-parser/entities/sidebar/hooks/";


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
