import React, { useCallback, useState } from "react";
import { InfoBox } from "../../visual-constructor/src/containers/InfoBox";
import { FeaturedMediaGroup } from "../sidebar-template-groups/FeaturedMediaGroup";
import { PostTitleGroup } from "../sidebar-template-groups/PostTitleGroup";
import { ExtraOptionsGroup } from "../sidebar-template-groups/ExtraOptionsGroup";

/**
 * Right side Main bar of visual constructor modal window.
 *
 * @since 2.0.0
 */

const SidebarRightTemplate = () => {
  
  return (

    <div className="inner-sidebar-container">
      <InfoBox title="Featured Image">
       <FeaturedMediaGroup />
      </InfoBox>
      <InfoBox title="Post title">
        <PostTitleGroup />
      </InfoBox>
      <InfoBox title="Extra options">
        <ExtraOptionsGroup />
      </InfoBox>
    </div>

  );
};

export default SidebarRightTemplate;


