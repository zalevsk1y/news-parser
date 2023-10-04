import React from 'react';
import { Checkbox } from '@news-parser/ui/sidebar';
import { useToggleSaveParsingTemplate, useToggleAddSource, useGetAddSource, useGetSaveParsingTemplate } from '@news-parser/entities/sidebarTemplate/hooks/'
import { SidebarItemLabel, SidebarItem } from '@news-parser/ui/sidebar';
/**
 * React functional component for rendering a group of extra options.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

export const ExtraOptionsGroup: React.FC = () => {
  const toggleSaveParsingTemplateHandler = useToggleSaveParsingTemplate();
  const toggleAddSourceHandler = useToggleAddSource();
  const addSource = useGetAddSource();
  const saveParsingTemplate = useGetSaveParsingTemplate();
  return (
    <>
      {addSource!==undefined&&
        <SidebarItem >
          <Checkbox
            checked={addSource}
            onChange={toggleAddSourceHandler}
            id='add-source-link-to-post-checkbox'
          />
          <SidebarItemLabel className='howto inline-bl' htmlFor='add-source-link-to-post-checkbox'>Add source link to the post</SidebarItemLabel>
        </SidebarItem>
      }
      {saveParsingTemplate!==undefined&&
          <SidebarItem >
            <Checkbox
              checked={saveParsingTemplate}
              onChange={toggleSaveParsingTemplateHandler}
              id='save-posts-parsing-template-checkbox'
            />
            <SidebarItemLabel className='howto inline-bl' htmlFor='save-posts-parsing-template-checkbox'>Save parsing template that you can use in automatic parsing from this source.</SidebarItemLabel>
          </SidebarItem>
      }
    </>
  )
}