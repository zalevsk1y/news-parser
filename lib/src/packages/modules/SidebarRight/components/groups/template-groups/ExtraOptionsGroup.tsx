import React from 'react';
import { Checkbox } from '@news-parser/ui/sidebar';
import { useToggleSaveParsingTemplate, useToggleAddSource, useGetAddSource, useGetSaveParsingTemplate } from '@news-parser/entities/sidebarTemplate/hooks/'
import { SidebarItemLabel, SidebarItem } from '@news-parser/ui/sidebar';
import { COMPONENTS } from '@news-parser/config/i18n';
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
          <SidebarItemLabel className='howto inline-bl' htmlFor='add-source-link-to-post-checkbox'>{COMPONENTS.SIDEBAR_RIGHT.EXTRA_OPTIONS_GROUP.ADD_SOURCE_LINK_CAPTION}</SidebarItemLabel>
        </SidebarItem>
      }
      {saveParsingTemplate!==undefined&&
          <SidebarItem >
            <Checkbox
              checked={saveParsingTemplate}
              onChange={toggleSaveParsingTemplateHandler}
              id='save-posts-parsing-template-checkbox'
            />
            <SidebarItemLabel className='howto inline-bl' htmlFor='save-posts-parsing-template-checkbox'>{COMPONENTS.SIDEBAR_RIGHT.EXTRA_OPTIONS_GROUP.SAVE_PARSING_TEMPLATE}</SidebarItemLabel>
          </SidebarItem>
      }
    </>
  )
}