import React from 'react';
import { InfoBody, Checkbox } from "@news-parser/ui/sidebar";
import { useToggleAddSource, useGetAddSource } from "@news-parser/entities/sidebarTemplate/hooks/"
import '../styles/ExtraOptionsGroup';

/**
 * React functional component for rendering a single extra option.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */

export const ExtraOptionsGroupSingle: React.FC = () => {
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