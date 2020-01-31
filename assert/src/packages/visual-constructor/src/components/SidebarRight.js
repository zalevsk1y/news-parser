import React from 'react';
import {InfoBox,InfoBody,InfoFooter} from '../containers/InfoBox';
import {Checkbox} from '../containers/elements/Checkbox'
import Input from '../containers/elements/Input'
import {connect} from 'react-redux';
import {toggleAddFeaturedMedia,toggleSaveParsingTemplate,toggleAddSource } from '../actions/option.actions';
import {selectTitle,selectFeaturedMedia} from '../actions/frame.actions';
import PropTypes from 'prop-types';

/**
 * Right side bar of visual constructor modal window.
 * 
 * @since 1.0.0
 */
export class  SidebarRight extends React.Component{
    constructor(props){
        super(props);
        this.state={}
        this.changeStateInputTitle=this.changeStateInputTitle.bind(this);
        this.selectTitle=this.selectTitle.bind(this);
        this.selectFeaturedMedia=this.selectFeaturedMedia.bind(this)
    }
    /**
     * Select post title.
     */
    selectTitle(){
        if(!this.state.title)return;
        this.props.selectTitle(this.state.title)
    }
    /**
     * Handles title input change
     * 
     * @param {string} value 
     */
    changeStateInputTitle(value){
        if(!value||value===this.state.title)return;
        this.setState({title:value})
    }
    /**
     * Change selected featured image. Take first selected image from parsed data.
     */
    selectFeaturedMedia(){
        const options=this.props.options||{},
                body=this.props.body||{};
        if(options.noFeaturedMedia) return;
        for(var item in body){
            if(body[item].tagName==='IMG'){
                body[item].content&&this.props.selectFeaturedMedia(body[item].content.src);
                break;
            }
        }
    }
    render(){
        const options=this.props.options||{};
        const noImage=!options.addFeaturedMedia?' no-featured-image':'';
        return (
            
                <div className="inner-sidebar-container" >
                <InfoBox title="Featured Image">
                    <InfoBody>
                        <p className="hide-if-no-js">
                                <img width="266" height="150" src={this.props.image} className={"featured-image-thumbnail"+noImage} alt="Featured image thumbnail"  />
                            <p className="howto">
                                If you want to change featured image, select image you would like to choose in the constructor and click "Change image" button.
                            </p>
                            <Checkbox value={!options.addFeaturedMedia} onClick={this.props.toggleAddFeaturedMedia} />
                            <p className="howto inline-bl">
                                No featured image.                            
                            </p>

                        </p>
                    </InfoBody>
                    <InfoFooter>
                        <button type="button" className="button button-primary button-large" onClick={this.selectFeaturedMedia}>Change image</button>
                    </InfoFooter>
                </InfoBox>
                <InfoBox title="Post title">
                    <InfoBody>
                        <span>{this.props.title}</span>
                        <p className="hide-if-no-js">
                            <Input  onChange={this.changeStateInputTitle}/>
                            <p className="howto">
                                If you want to change title, type the new title and press "Change title" button.
                            </p>
                        </p>
                    </InfoBody>
                    <InfoFooter>
                        <button type="button" className="button button-primary button-large" onClick={this.selectTitle}>Change title</button>
                    </InfoFooter>
                </InfoBox>
                <InfoBox title="Extra options">
                    <InfoBody>
                        <div className="info-box-container">
                            <Checkbox value={options.addSource} onClick={this.props.toggleAddSource} />
                            <p className="howto inline-bl">
                                Add source link to the post.                            
                            </p>
                        </div>
                        <div className="info-box-container">
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
            toggleAddFeaturedMedia:function(){
                dispatch(toggleAddFeaturedMedia())
            },
            selectTitle:function(newTitle){
                dispatch(selectTitle(newTitle))
            },
            selectFeaturedMedia:function(url){
                dispatch(selectFeaturedMedia(url))
            },
            toggleSaveParsingTemplate:function(){
                dispatch(toggleSaveParsingTemplate());
            },
            toggleAddSource:function(){
                dispatch(toggleAddSource());
            }
        }
    }


    export default connect(mapStateToProps,mapDispatchToProps)(SidebarRight);

    SidebarRight.propTypes={
        /**
         * Post title.
         */
        title:PropTypes.string,
        /**
         * Post featured image.
         */
        image:PropTypes.string,
        /**
         * Post content associative array{hash:elementData}
         */
        body:PropTypes.object,
        /**
        * Parsing options, structure: {addFeaturedMedia,addSource,saveParsingTemplate}
        * 
        * @see {@link visual-constructor/src/reducers/options.js|defaultOptionsState}
         */
        options:PropTypes.object.isRequired,
        /**
         * Toggle featured image checkbox.
         *  
         */
        toggleAddFeaturedMedia:PropTypes.func.isRequired,
        /**
         * Toggle save parsing template checkbox.
         */
        toggleSaveParsingTemplate:PropTypes.func.isRequired,
        /**
         * Select custom post title.
         * 
         * @param {string} title New post title.
         */
        selectTitle:PropTypes.func.isRequired,
        /**
         * Select new post image.
         * 
         * @param {string} url New Post image url.
         */
        selectFeaturedMedia:PropTypes.func.isRequired,
        /**
         * Toggle add source checkbox.
         */
        toggleAddSource:PropTypes.func.isRequired

    }