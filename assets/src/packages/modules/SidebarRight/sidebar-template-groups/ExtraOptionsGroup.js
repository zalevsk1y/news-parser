import { useToggleSaveParsingTemplate,useToggleAddSource,useGetAddSource,useGetAddfeaturedMedia } from "../../../entities/sidebarTemplate/hooks/useToggleSaveTemplate"

export const ExtraOptionsGroup=()=>{
    const toggleSaveParsingTemplateHandler=useToggleSaveParsingTemplate();
    const toggleAddSourceHandler=useToggleAddSource();
    const addSource=useGetAddSource();
    const addFeaturedMedia=useGetAddfeaturedMedia();
    return (
        <InfoBody>
          <div className="info-box-container">
            <Checkbox
              value={addSource}
              onClick={toggleAddSourceHandler}
            />
            <p className="howto inline-bl">Add source link to the post.</p>
          </div>
          <div className="info-box-container">
            <Checkbox
              value={saveParsingTemplate}
              onClick={toggleSaveParsingTemplateHandler}
            />
            <p className="howto inline-bl">
              Save parsing template that you can use in automatic parsing from
              this source.
            </p>
          </div>
        </InfoBody>
    )
}