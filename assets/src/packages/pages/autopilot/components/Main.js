import React, { useMemo } from 'react';
import Message from '@news-parser/modules/Message';
import { PostCardRight } from '@news-parser/ui/post-card/PostCardRight';
import { MainOptionsBlock } from '../../../components/MainOptionsBlock';

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
      <div class="row mt-4">
        <div class="col-md-8">
          <MainOptionsBlock />
        </div>
        <div class="col-md-2 d-flex flex-column">
            <PostCardRight >
            <p class="mb-3 text-center">
              Did you enjoy using this plugin? Please leave a review!
              <div className='text-center'><a href="#"> ⭐⭐⭐⭐⭐</a> </div>
            </p>
            <p class="mb-3 text-center"><a href='https://www.buymeacoffee.com/4832232T'>Buy author a coffee ☕ <br />to show your support!</a></p>

            </PostCardRight>
        </div>
      </div>
    </div>
  );
}


export default Main;
