import React from "react";
import { InfoBox, InfoBody } from "../../containers/InfoBox";

import StatusVisibilityGroup from "@news-parser/sidebar/containers/sidebar-groups/StatusVisibilityGroup";

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
         
          </InfoBody>
        </InfoBox>
        <InfoBox title="Tags">
          <InfoBody>
            
          </InfoBody>
        </InfoBox>
        <InfoBox title="Discussion">
          <InfoBody>
            
          </InfoBody>
        </InfoBox>
      </div>
   
  );
};

export default SidebarRightPost;