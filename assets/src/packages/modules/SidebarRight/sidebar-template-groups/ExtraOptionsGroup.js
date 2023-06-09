import React,{ useCallback } from 'react';
import { InfoBody,Checkbox } from "@news-parser/ui/sidebar";
import { useToggleSaveParsingTemplate,useToggleAddSource,useGetAddSource,useGetSaveParsingTemplate } from "@news-parser/entities/sidebarTemplate/hooks/"

export const ExtraOptionsGroup=()=>{
    const toggleSaveParsingTemplateHandler=useToggleSaveParsingTemplate();
    const toggleAddSourceHandler=useToggleAddSource();
    const addSource=useGetAddSource();
    const saveParsingTemplate=useGetSaveParsingTemplate();
return (
        <InfoBody>
          <div className="info-box-container">
            <Checkbox
              checked={addSource}
              onChange={toggleAddSourceHandler}
            />
            <p className="howto inline-bl">Add source link to the post.</p>
          </div>
          <div className="info-box-container">
            <Checkbox
              checked={saveParsingTemplate}
              onChange={toggleSaveParsingTemplateHandler}
            />
            <p className="howto inline-bl">
              Save parsing template that you can use in automatic parsing from
              this source.
            </p>
          </div>
        </InfoBody>
    )
}