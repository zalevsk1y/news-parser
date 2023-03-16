import React from "react";
import { InfoBox, InfoBody } from "../../containers/InfoBox";

import StatusVisibilityGroup from "@news-parser/sidebar/containers/sidebar-groups/StatusVisibilityGroup";
import CategoriesGroup from "@news-parser/sidebar/containers/sidebar-groups/CategoriesGroup";
import TagsGroup from "@news-parser/sidebar/containers/sidebar-groups/TagsGroup";
import DiscussionGroup from "@news-parser/sidebar/containers/sidebar-groups/DiscussionGroup";

/**
 * Right side Main bar of visual constructor modal window.
 *
 * @since 2.0.0
 */

const SidebarRightPost = () => {
  return (
    <div className="inner-sidebar-container">
      <InfoBox title="Satus&Visibility">
        <InfoBody>
          <StatusVisibilityGroup />
        </InfoBody>
      </InfoBox>
      <InfoBox title="Categories">
        <InfoBody>
          <CategoriesGroup />
        </InfoBody>
      </InfoBox>
      <InfoBox title="Tags">
        <InfoBody>
          <TagsGroup />
        </InfoBody>
      </InfoBox>
      <InfoBox title="Discussion">
        <InfoBody>
          <DiscussionGroup />
        </InfoBody>
      </InfoBox>
    </div>

  );
};

export default SidebarRightPost;