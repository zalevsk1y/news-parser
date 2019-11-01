import React from 'react';
import SidebarRight from './SidebarRight';
import Frame from './Frame';
import {PropTypes} from 'prop-types'

export class VisualConstructor extends React.Component{
    /**
     * Init function.
     * 
     * @param {object} props 
     */
    constructor(props){
        super(props);
        this.close=this.close.bind(this);
    }
    close(){
        this.props.onStateChange(false);
        this.props.close();
    }
    componentDidMount(){
        this.props.onStateChange(true);
        this.props.getFrameData(this.props.url);
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
                            {(this.props.frameData&&<Frame />)}
                        </div>
                        <div className="modal-right-side-bar">
                        {(this.props.frameData&&<SidebarRight />)}
                        </div>
                        
                    </div>
                    <div className='modal-footer'>
                        <div type="button" className="button button-large button-primary">Parse Page</div>
                    </div>
                </div>
                <div className="media-modal-backdrop"></div>
            </div>
        )
    }
}

