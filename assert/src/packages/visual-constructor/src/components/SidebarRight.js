import React from 'react';
import {InfoBox,InfoBody,InfoFooter} from '../contaiters/InfoBox';
import Input from '../contaiters/elements/Input'
import {connect} from 'react-redux';

export class  SidebarRight extends React.Component{
    render(){
      
        return (
            
                <div className="inner-sidebar-container" >
                <InfoBox title="Featured Image">
                    <InfoBody>
                        <p class="hide-if-no-js">
                            <a href="" id="set-post-thumbnail" aria-describedby="set-post-thumbnail-desc" class="thickbox" >
                                <img width="266" height="150" src={this.props.image} class="attachment-266x266 size-266x266" alt=""  />
                            </a>
                            <p class="howto">
                                If you want to change featured image, select image you would like to choose in the constructor and click "Change image" button.
                            </p>
                        </p>
                    </InfoBody>
                    <InfoFooter>
                        <button type="button" class="button button-primary button-large">Change image</button>
                    </InfoFooter>
                </InfoBox>
                <InfoBox title="Post title">
                    <InfoBody>
                        <span>{this.props.title}</span>
                        <p class="hide-if-no-js">
                            <Input  />
                            <p class="howto">
                                If you want to change title, type the new title and press "Change title" button.
                            </p>
                        </p>
                    </InfoBody>
                    <InfoFooter>
                        <button type="button" class="button button-primary button-large">Change title</button>
                    </InfoFooter>
                </InfoBox>
                </div>
            
        );
    }
}

    function mapStateToProps(state){
        
        const title=state.parse.dialog.hasOwnProperty('parsedData')?state.parse.dialog.parsedData.title:undefined,
              image=state.parse.dialog.hasOwnProperty('parsedData')?state.parse.dialog.parsedData.image:undefined;
        return {
            title,
            image
        }
    }


    export default connect(mapStateToProps)(SidebarRight);