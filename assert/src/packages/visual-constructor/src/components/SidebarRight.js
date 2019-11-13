import React from 'react';
import {InfoBox,InfoBody,InfoFooter} from '../containers/InfoBox';
import {Checkbox} from '../containers/elements/Checkbox'
import Input from '../containers/elements/Input'
import {connect} from 'react-redux';
import { toggleNoFeaturedImage } from '../actions/option';
import {selectTitle,selectFeaturedImage} from '../actions/frame';

export class  SidebarRight extends React.Component{
    constructor(props){
        super(props);
        this.state={}
        this.changeStateInputTitle=this.changeStateInputTitle.bind(this);
        this.selectTitle=this.selectTitle.bind(this);
        this.selectFeaturedImage=this.selectFeaturedImage.bind(this)
    }
    selectTitle(){
        
        if(!this.state.title)return;
        this.props.selectTitle(this.state.title)
    }
    changeStateInputTitle(value){
        if(!value||value===this.state.title)return;
        this.setState({title:value})
    }
    selectFeaturedImage(){
        const options=this.props.options||{},
                body=this.props.body||{};
        if(options.noFeaturedImage) return;
        for(var item in body){
            if(body[item].tagName==='IMG'){
                body[item].content&&this.props.selectFeaturedImage(body[item].content);
                break;
            }
        }
    }
    render(){
        const options=this.props.options||{};
        const noImage=options.noFeaturedImage?' no-featured-image':'';
        return (
            
                <div className="inner-sidebar-container" >
                <InfoBox title="Featured Image">
                    <InfoBody>
                        <p className="hide-if-no-js">
                                <img width="266" height="150" src={this.props.image} className={"featured-image-thumbnail"+noImage} alt="Featured image thumbnail"  />
                            <p className="howto">
                                If you want to change featured image, select image you would like to choose in the constructor and click "Change image" button.
                            </p>
                            <Checkbox value={options.noFeaturedImage} onClick={this.props.toggleNoFeaturedImage} />
                            <p className="howto inline-bl">
                                No featured image.                            
                            </p>

                        </p>
                    </InfoBody>
                    <InfoFooter>
                        <button type="button" class="button button-primary button-large" onClick={this.selectFeaturedImage}>Change image</button>
                    </InfoFooter>
                </InfoBox>
                <InfoBox title="Post title">
                    <InfoBody>
                        <span>{this.props.title}</span>
                        <p class="hide-if-no-js">
                            <Input  onChange={this.changeStateInputTitle}/>
                            <p class="howto">
                                If you want to change title, type the new title and press "Change title" button.
                            </p>
                        </p>
                    </InfoBody>
                    <InfoFooter>
                        <button type="button" class="button button-primary button-large" onClick={this.selectTitle}>Change title</button>
                    </InfoFooter>
                </InfoBox>
                <InfoBox title="Extra options">
                    <InfoBody>
                        <div class="info-box-container">
                            <Checkbox value={options.downloadImages} onClick={this.props.toggleDownloadImages} />
                            <p className="howto inline-bl">
                                Download pictures.                            
                            </p>
                        </div>
                        <div class="info-box-container">
                            <Checkbox value={options.sourceLink} onClick={this.props.toggleSourceLink} />
                            <p className="howto inline-bl">
                                Add source link to the post.                            
                            </p>
                        </div>
                        <div class="info-box-container">
                            <Checkbox value={options.saveParsingTemplate} onClick={this.props.toggleSaveParsingTemplate} />
                            <p className="howto inline-bl">
                                Save parsing template that you can use in automatic parsing from this source.                            
                            </p>
                        </div>
                    </InfoBody>
                    
                </InfoBox>
                </div>
            
        );
    }
}

    function mapStateToProps(state){
    
        const title=state.parse.dialog.hasOwnProperty('parsedData')?state.parse.dialog.parsedData.title:undefined,
              image=state.parse.dialog.hasOwnProperty('parsedData')?state.parse.dialog.parsedData.image:undefined,
              options=state.parse.dialog.hasOwnProperty('parsedData')?state.parse.dialog.options:undefined,
              body=state.parse.dialog.hasOwnProperty('parsedData')?state.parse.dialog.parsedData.body:undefined;

        return {
            title,
            image,
            body,
            options
        }
    }
    function mapDispatchToProps(dispatch){
        return {
            toggleNoFeaturedImage:function(){
                dispatch(toggleNoFeaturedImage())
            },
            selectTitle:function(newTitle){
                dispatch(selectTitle(newTitle))
            },
            selectFeaturedImage:function(url){
                dispatch(selectFeaturedImage(url))
            }
        }
    }


    export default connect(mapStateToProps,mapDispatchToProps)(SidebarRight);