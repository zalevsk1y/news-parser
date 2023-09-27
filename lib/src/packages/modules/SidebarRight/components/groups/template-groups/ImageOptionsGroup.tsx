import React from 'react';
import { SidebarItemLabel, SidebarItem } from '@news-parser/ui/sidebar';
import { Checkbox } from "@news-parser/ui/sidebar";
import { useToggleGroupImageRow, useGetGroupImageRow } from "@news-parser/entities/sidebarTemplate/hooks/"
import { useToggleAddSrcSetAndSizes, useGetAddSrcSetAndSizes } from "@news-parser/entities/sidebarTemplate/hooks/"


/**
 * React functional component for rendering a image parsing options.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

export const ImageOptionsGroup: React.FC = () => {
  const toggleGroupImageRowHandler = useToggleGroupImageRow();
  const groupImageRow = useGetGroupImageRow();
  const toggleAddSrcSetAndSizesHandler = useToggleAddSrcSetAndSizes();
  const addSrcSetAndSizes = useGetAddSrcSetAndSizes();
  if (groupImageRow === undefined) return null;
  return (
    <>
      <SidebarItem >
        <Checkbox
          checked={groupImageRow}
          onChange={toggleGroupImageRowHandler}
          id='group-images-in-row-checkbox'
        />
        <SidebarItemLabel className='howto inline-bl' htmlFor='group-images-in-row-checkbox'>Groups images in two in the row.</SidebarItemLabel>
      </SidebarItem>
      <SidebarItem >
        <Checkbox
          checked={addSrcSetAndSizes}
          onChange={toggleAddSrcSetAndSizesHandler}
          id='add-images-srcset-and-sizes-checkbox'
        />
        <SidebarItemLabel className='howto inline-bl' htmlFor='add-images-srcset-and-sizes-checkbox'>Add srcset and sizes attribures to the parsed images.</SidebarItemLabel>
      </SidebarItem>
    </>
  )
}