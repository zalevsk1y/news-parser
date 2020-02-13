import React from 'react';
import SidebarRight from './SidebarRight';
import Frame from './Frame';
import {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {document} from 'globals';
import {connect} from 'react-redux';

import {closeDialog} from '../actions/app.actions';
import {createPostDraft} from '../actions/draft.actions';
import {createParsingTemplate} from '../actions/template.actions';

/**
 * Main visual constructor window element.
 * 
 * @since 1.0.0
 */
export class VisualConstructor extends React.Component{
 
    constructor(props){
        super(props);
        this.close=this.close.bind(this);
        this.buttonClickHandler=this.buttonClickHandler.bind(this);
        this.modalWindow=this.modalWindow.bind(this);
    }
    /**
     * Close model window.
     */
    close(){
        this.props.close();
    }
        /**
     * Prevent scrolling when modal window is open.
     * 
     * @param {bool} state 
     */
    scroll(state){
        switch(state){
            case (true):
                document.documentElement.style.overflowY='auto';
                document.body.style.overflowY='auto';
                break;
            case(false):
                document.documentElement.style.overflowY='hidden';
                document.body.style.overflowY='scroll';
                break;
        }
    }
    /**
     * Create post draft from parsed data.
     */
    buttonClickHandler(){
        if(!this.props.options.saveParsingTemplate){
            this.props.createPostDraft()
        }else{
            this.props.saveTemplate()
        }
        this.close();
    }
    loadingSpinner(){
        return (
            <div className="loading-spinner">
                <img src="../wp-content/plugins/news-parser/public/images/loading.gif"></img>
            </div>
        )
    }
    modalWindow(){
        return (
            <div className="media-modal-wrapper">
                <div className="modal-container">
                    <div className="modal-header"> 
                        <h1>Parsing Constructor</h1>
                        <button type="button" className="media-modal-close" onClick={this.close}>
                            <span className="media-modal-icon">
                                <span className="screen-reader-text">Close dialog</span>
                            </span>
                        </button>
                    </div>
                    {(!this.props.frameIsReady&&<this.loadingSpinner />)}
                    <div className="modal-main">
                        <div className="parsed-data-container">
                           <Frame />
                        </div>
                        <div className="modal-right-side-bar">
                            <SidebarRight />
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <div type="button" className="button button-large button-primary" onClick={this.buttonClickHandler}>{this.props.options.saveParsingTemplate?"Save Template":"Create Post Draft"}</div>
                    </div>
                </div>
                <div className="media-modal-backdrop"></div>
            </div>
        )
    }

    render(){
        this.props.open?this.scroll(true):this.scroll(false);
        return (  
            <Fragment>
                {(this.props.open&&<this.modalWindow />)}
            </Fragment>
        )
    }
}


function mapStateToProps(state){
    const {options}=state.parse.dialog.visualConstructor,
        {open,rawHTML,frameIsReady}=state.parse.dialog.visualConstructor.dialogData;
    return {
        frameIsReady,
        options,
        open,
        rawHTML  
    };
}
function mapDispatchToProps(dispatch){
    return {
        close:()=>{
            dispatch(closeDialog());
        },
        createPostDraft:()=>{
               dispatch(createPostDraft());
        },
        saveTemplate:()=>{
            dispatch(createParsingTemplate())
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(VisualConstructor); 



VisualConstructor.propTypes={
    /**
     * Post page url.
     */
    url:PropTypes.string.isRequired,
    /**
     * Inner posts array index.
     */
    postId:PropTypes.number.isRequired,
    /**
     * Parsed post data.
     */
    parsedData:PropTypes.object.isRequired,
    /**
     * HTML.
     */
    rawHTML:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    /**
     * Parsing options, structure: {addFeaturedMedia,addSource,saveParsingTemplate}
     * 
     * @see {@link visual-constructor/src/reducers/options.js|defaultOptionsState}
     */
    options:PropTypes.object.isRequired,
    /**
     * Close visual constructor modal window.
     * 
     * @see {@link parser-rss/src/actions/index.js|closeDialog}
     */
    close:PropTypes.func.isRequired,
    /**
     * Get page html from the server.
     * 
     * @param {string} url Page url.
     * @see {@link parser-rss/src/actions/index.js|getPageHTML}
     */
    getFrameData:PropTypes.func.isRequired,
    /**
     * Creates post draft using worpress REST API.
     * 
     * @param {function} dispatch Redux dispatch.
     * @param {string} id Inner posts array index.
     * @param {string} url Post url.
     * @param {object} parsedData Parsed post data.
     * @param {object} options Parsing options.
     * 
     * @see {@link visual-constructor/src/actions/index.js|createPostDraft}
     */
    createPostDraft:PropTypes.func.isRequired
}