import React from 'react';
import SidebarRight from './SidebarRight';
import Frame from './Frame';
import {PropTypes} from 'prop-types'
/**
 * Main visual constructor window element.
 * 
 * @since 1.0.0
 */
export class VisualConstructor extends React.Component{
 
    constructor(props){
        super(props);
        this.close=this.close.bind(this);
        this.createPostDraft=this.createPostDraft.bind(this)
    }
    /**
     * Close model window.
     */
    close(){
        this.props.onStateChange(false);
        this.props.close();
    }
    /**
     * Get data from sever when window is opened.
     */
    componentDidMount(){
        this.props.onStateChange(true);
        this.props.getFrameData(this.props.url);
    }
    /**
     * Create post draft from parsed data.
     */
    createPostDraft(){
        this.props.createPostDraft(this.props.postId,this.props.url,this.props.parsedData,this.props.options)
    }
    render(){
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
                    <div className="modal-main">
                        <div className="parsed-data-container">
                            {(this.props.rawHTML&&<Frame />)}
                        </div>
                        <div className="modal-right-side-bar">
                        {(this.props.rawHTML&&<SidebarRight />)}
                        </div>
                        
                    </div>
                    <div className='modal-footer'>
                        <div type="button" className="button button-large button-primary" onClick={this.createPostDraft}>Parse Page</div>
                    </div>
                </div>
                <div className="media-modal-backdrop"></div>
            </div>
        )
    }
}

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