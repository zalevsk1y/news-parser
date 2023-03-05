import React from 'react';
import SidebarRight from './SidebarRight';
import Frame from './Frame';
import {Fragment} from 'react';
import {PropTypes} from 'prop-types';
import {document} from 'globals';
import {connect} from 'react-redux';
import config from '@news-parser/config/';
import {closeDialog} from '../actions/dialogData.actions';
import {createWpPost} from '../actions/post.actions';
import {createParsingTemplate} from '../actions/template.actions';
import '@news-parser/styles/_resize-bar.scss'

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
        this.setFrameReady=this.setFrameReady.bind(this)
        this.modalWindow=this.modalWindow.bind(this);
        this.state={
            frameIsReady:false
        }
    }
    /**
     * Close model window.
     */
    close(){
        this.setState({frameIsReady:false})
        this.props.close();
    }
    setFrameReady(){
        this.setState({
            frameIsReady:true
        })
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
        if(!this.props.saveParsingTemplate){
            this.props.createWpPost()
        }else{
            this.props.saveTemplate()
        }
        this.setState({
            frameIsReady:false
        })
        //this.close();
    }
    /**
     * Loading spinner element.
     */
    loadingSpinner(){
        return (
            <div className="loading-spinner">
                <img src={config.spinnerImage}></img>
            </div>
        )
    }
    /**
     * Visual-Constructor modal window.
     */
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
                    {(!this.state.frameIsReady&&<this.loadingSpinner />)}
                    <div className="modal-main">
                        <div className="parsed-data-container">
                           {
                           //<Frame injectHTML={htmlData} injectCSS={} onReady={this.frameIsReady}/>
                           }
                           <Frame onReady={this.setFrameReady}/>
                        </div>
                        <div className='resize-drag-bar'></div>
                        
                            <SidebarRight />
                        
                    </div>
                    <div className='visual-container-modal-footer d-flex flex-row justify-content-end align-items-center'>
                        <button type="button" className="button button-large button-primary" onClick={this.buttonClickHandler}>{this.props.saveParsingTemplate?"Save Template":"Create Post"}</button>
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
    const {saveParsingTemplate}=state.parse.dialog.visualConstructor.options,
        {isOpen,frameIsReady}=state.parse.dialog.visualConstructor.dialogData;
    return {
        frameIsReady,
        saveParsingTemplate,
        open:isOpen
    };
}
function mapDispatchToProps(dispatch){
    return {
        close:()=>{
            dispatch(closeDialog());
        },
        createWpPost:()=>{
               dispatch(createWpPost());
        },
        saveTemplate:()=>{
            dispatch(createParsingTemplate())
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(VisualConstructor); 



VisualConstructor.propTypes={
    /**
     * Is Frame is loaded and ready to render. 
     * 
     * @see {@link visual-constructor/src/reducers/index.js|defaultState.dialogData}
     */
    frameIsReady:PropTypes.bool.isRequired,
    /**
     * If true this page would not be parsed.Parsing template would be created and saved instead.
     * 
     * @see {@link visual-constructor/src/reducers/index.js|defaultState.options}
     */
    saveParsingTemplate:PropTypes.bool.isRequired,
    /**
     * If visual constructor is open.
     * 
     * @see {@link visual-constructor/src/reducers/index.js|defaultState.dialogData}
     */
    open:PropTypes.bool.isRequired,
    
    /**
     * Close visual constructor modal window.
     * 
     * @see {@link parser-rss/src/actions/index.js|closeDialog}
     */
    close:PropTypes.func.isRequired,
    /**
     * Creates post draft using worpress REST API.
     * 
     * 
     * @see {@link visual-constructor/src/actions/draft.actions.js|createWpPost}
     */
    createWpPost:PropTypes.func.isRequired,
    /**
     * Save parsing rules for selected domain. .
     * 
     * 
     * @see {@link visual-constructor/src/actions/template.actions.js|createParsingTemplate}
     */
    saveTemplate:PropTypes.func.isRequired
}