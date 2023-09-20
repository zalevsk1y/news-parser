import React, { useCallback, useState , useMemo } from 'react';
import { TagInput } from '@news-parser/components/sidebar/TagInput';
import { SidebarItem } from '@news-parser/ui/sidebar';
import { useSelectTag } from '@news-parser/entities/sidebar/hooks/';
import { TagItem } from '@news-parser/ui/TagItem';

/**
 * React functional component for rendering a group of status visibility options.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

function TagsGroup() {
  const [, selectTag, diselectTag] = useSelectTag();
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const createTagHandler = useCallback((tagName: string) => {
    setSelectedTags(selectedTags.concat(tagName));
    selectTag(tagName);
  }, [selectedTags]);
  const removeTagHandler = useCallback((tagName: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagName));
    diselectTag(tagName);
  }, [selectedTags, diselectTag]);
  const renderTags = useMemo(() => {
    if (selectedTags.length == 0) return [];
    return selectedTags.map((tagName) => {
      const removeHandler = () => {
        removeTagHandler(tagName);
      };
      return <TagItem tagName={tagName} key={`tag-${  tagName}`} removeTagHandler={removeHandler} />;
    });
  }, [selectedTags, removeTagHandler])
  return (
    <SidebarItem>
      <TagInput
        id='tag-input'
        labelText='Add New Tag:'
        bottomCapture='Separate with commas or the Enter key.'
        onCreate={createTagHandler}
      >
        {renderTags}
      </TagInput>
    </SidebarItem>
  );
}

export default TagsGroup;
