import React, { useState } from 'react';
import Message from '@news-parser/modules/Message';
import SidebarRight, { SidebarRightTemplate, SidebarRightPost } from '@news-parser/modules/SidebarRight';
import { VisualConstructor, VisualConstructorFooterRss as VisualConstructorFooter } from '@news-parser/widgets/visual-constructor/';
import { getUrlSearchParams } from '@news-parser/helpers/';
import { useFetchPostsList } from '@news-parser/entities/post/hooks/'
import { useFetchTemplate } from '@news-parser/entities/template/hooks/'
import { InputFormSection } from './InputFormSection';
import { PostsSection } from './PostsSection';

/**
 * Main application element.
 * 
 * @since 2.0.0
 */


const Main = () => {
  
  return (
    <div class="container my-5">
      <div class="row">
        <div class="col-md-8 mb-3 mb-md-0 me-3 bg-white p-3">
          <h2 class="mb-3">Schedule Options</h2>
          <div class="input-group">
            <select class="form-select" aria-label="Select schedule option">
              <option selected>Option 1</option>
              <option value="1">Option 2</option>
              <option value="2">Option 3</option>
            </select>
            <button class="btn btn-primary" type="button">Select</button>
          </div>
        </div>
        <div class="col-md-3 d-flex flex-column">
          <div class="bg-white p-3 mb-2">
            <p class="mb-3">
              Did you enjoy using this plugin? Please leave a review!
            </p>
            <p class="mb-3">Buy author a coffee to show your support!</p>
          </div>
          <div class="">
            <button class="pl-2 pr-2 btn btn-lg btn-success" type="button">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Main;
