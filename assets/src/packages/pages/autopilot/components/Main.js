import React, { useMemo } from 'react';
import Message from '@news-parser/modules/Message';
import { Tabs } from '../../../components/Tabs';
import { CreateTab } from '@news-parser/modules/AutopilotTabs/CreateTab';
import { SelectTab } from '@news-parser/modules/AutopilotTabs/SelectTab';
import { PostCardRiht } from '@news-parser/ui/post-card/PostCardRight';

/**
 * Main application element.
 * 
 * @since 2.0.0
 */


const Main = () => {
  const tabsNames=useMemo(()=>['Create','Select'],[])
  return (
    <div class="container">
      <div class="parsing-title">
        <h1>News-Parser <b className='main-page-header'>Autopilot</b></h1>
      </div>
      <Message />
      <div class="row">
        <div class="col-md-8">
          <Tabs tabs={tabsNames} >
            <CreateTab />
            <SelectTab />
          </Tabs>
        </div>
        <div class="col-md-2 d-flex flex-column">
            <PostCardRiht >
            <p class="mb-3 text-center">
              Did you enjoy using this plugin? Please leave a review!
              <div className='text-center'><a href="#"> ⭐⭐⭐⭐⭐</a> </div>
            </p>
            <p class="mb-3 text-center"><a href='https://www.buymeacoffee.com/4832232T'>Buy author a coffee ☕ <br />to show your support!</a></p>

            </PostCardRiht>
        </div>
      </div>
    </div>
  );
}


export default Main;
