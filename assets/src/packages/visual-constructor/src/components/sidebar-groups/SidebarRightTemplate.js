import React, { useCallback, useState } from "react";
import { InfoBox, InfoBody, InfoFooter } from "../../containers/InfoBox";
import { Checkbox } from "../../containers/elements/Checkbox";
import Input from "../../containers/elements/Input";
import { Image } from "@news-parser/image/";
import { useSelector } from "react-redux";
import config from "@news-parser/config";
import { useSidebarRightTemplateEvents } from "../../hooks/sidebar/useSidebarRightTemplateEvents";

/**
 * Right side Main bar of visual constructor modal window.
 *
 * @since 2.0.0
 */

const SidebarRightTemplate = () => {
  const [newTitle, setNewTitle] = useState(""),
    { image, options, body, title } = useSelector((state) => ({
      ...state.parse.dialog.visualConstructor.parsedData,
      options: state.parse.dialog.visualConstructor.options,
    })),
    [selectTitle, selectFeaturedMediaHandler, toggleSaveParsingTemplateHandler, toggleAddSourceHandler, toggleAddFeaturedMediaHandler] = useSidebarRightTemplateEvents(options, body, newTitle),
    selectTitleHandler=useCallback(()=>{
      selectTitle(newTitle);
      setNewTitle('');
    },[newTitle]),
    changeStateInputTitle = (value) => {
      if (!value || value === title) return;
      setNewTitle(value);
    },
    featuredImageClassName = !options?.addFeaturedMedia
      ? "featured-image-thumbnail no-featured-image"
      : "featured-image-thumbnail";

  return (

    <div className="inner-sidebar-container">
      <InfoBox title="Featured Image">
        <InfoBody>
          <Image
            src={image}
            className={featuredImageClassName}
            alt="Featured image thumbnail"
            defaultImage={config.defaultImage}
          />
          <p className="howto">
            If you want to change featured image, select image you would like
            to choose in the constructor and click "Change image" button.
          </p>
          <Checkbox
            value={!options?.addFeaturedMedia}
            onClick={toggleAddFeaturedMediaHandler}
          />
          <p className="howto inline-bl">No featured image.</p>
        </InfoBody>
        <InfoFooter>
          <button
            type="button"
            className="button button-primary button-large"
            onClick={selectFeaturedMediaHandler}
          >
            Change image
          </button>
        </InfoFooter>
      </InfoBox>
      <InfoBox title="Post title">
        <InfoBody>
          <span>{title}</span>
          <Input onChange={changeStateInputTitle} value={newTitle}/>
          <p className="howto">
            If you want to change title, type the new title and press "Change
            title" button.
          </p>
        </InfoBody>
        <InfoFooter>
          <button
            type="button"
            className="button button-primary button-large"
            onClick={selectTitleHandler}
          >
            Change title
          </button>
        </InfoFooter>
      </InfoBox>
      <InfoBox title="Extra options">
        <InfoBody>
          <div className="info-box-container">
            <Checkbox
              value={options?.addSource}
              onClick={toggleAddSourceHandler}
            />
            <p className="howto inline-bl">Add source link to the post.</p>
          </div>
          <div className="info-box-container">
            <Checkbox
              value={options?.saveParsingTemplate}
              onClick={toggleSaveParsingTemplateHandler}
            />
            <p className="howto inline-bl">
              Save parsing template that you can use in automatic parsing from
              this source.
            </p>
          </div>
        </InfoBody>
      </InfoBox>
    </div>

  );
};

export default SidebarRightTemplate;


