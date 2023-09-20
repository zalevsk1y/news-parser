import React from 'react';
import { InfoBody, Checkbox } from "@news-parser/ui/sidebar";
import { useToggleAddSource, useGetAddSource } from "@news-parser/entities/sidebarTemplate/hooks/"


/**
 * React functional component for rendering a image parsing options.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

export const ImageOptionsGroupSingle: React.FC = () => {
  const toggleAddSourceHandler = useToggleAddSource();
  const addSource = useGetAddSource();
  return (
    <InfoBody>
      <div className="info-box-container">
        <Checkbox
          checked={addSource}
          onChange={toggleAddSourceHandler}
        />
        <p className="howto inline-bl">Add source link to the post.</p>
      </div>
    </InfoBody>
  )
}