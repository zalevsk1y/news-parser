import {connect} from 'react-redux';
import {galleryPage} from '../actions/index.js';
import React from 'react';
import Switch from '../components/Switch';
import Input from '../components/Input';
import {GALLERY_FIELD_NAME} from '../actions/index';
import PropTypes from 'prop-types';

export const GalleryPage=({settings,addGallery,shortCode,parameterName})=>(
            <div>
              <table className="settings-content">
                  <tbody>
                      <tr>
                          <th>
                              Add Gallery to post.
                          </th>
                          <td>
                              <Switch className="settings-switch add-gallery"  active={settings.addGallery}  onClick={addGallery} fieldName='addGallery'/>
                          </td>
                      </tr>
                      
                      </tbody>
              </table>         
                    <table className={"sub-settings-content "+(settings.addGallery?"visible":"hidden")}>
                        <tbody> 
                            <tr>
                                <th>
                                    Shortcode for gallery
                                </th>
                                <td>
                                    <Input className="settings-shortcode" onBlur={shortCode} fieldName='shortCode' value={settings.shortCode}/>
                                    <p className="description">
                                        You can add short code for additional gallery plugin.More <a href="#">info</a>. 
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Parameter name for gallery
                                </th>
                                <td>
                                    <Input className="settings-parameter-name" onBlur={parameterName} fieldName='parameterName' value={settings.parameterName}/>
                                    <p className="description">
                                        You can specify name of parameter for pictures IDs.More <a href="#">info</a>. 
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
            </div>  
      );
    
const mapStateToProps = (state, ownProps) => {
        return {
            settings: state.settings[GALLERY_FIELD_NAME]
        }
    },

    mapDispatchToProps = (dispatch) => {
        return {
            addGallery: () => {
                dispatch(galleryPage.addGallery());
            },
            shortCode: (text) => {
                dispatch(galleryPage.shortCode(text));
            },
            parameterName: (text) => {
                dispatch(galleryPage.parameterName(text));
            }
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)

    GalleryPage.propTypes={
        settings:PropTypes.shape({
            addGallery:PropTypes.bool,
            shortCode:PropTypes.string,
            parameterName:PropTypes.string
        }).isRequired,
        addGallery:PropTypes.func.isRequired,
        shortCode:PropTypes.func.isRequired,
        parameterName:PropTypes.func.isRequired
    }