import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {decodeHTMLEntities} from '@news-parser/helpers/'
/**
 * Message window element.
 * 
 * @since 0.8.0
 */
export class Message extends React.Component{
    constructor(props){
        super(props);
        this.state={open:false};
        this.close=this.close.bind(this);
    }
    /**
     * Close message window.
     */
    close(){
        this.setState({open:false})
    }
    /**
     * If get mew message close current message and open new one in 400ms.
     * 
     * @param {object} prevProps 
     */
    componentDidUpdate(prevProps){
        if(this.props.timestamp!==prevProps.timestamp){
            if(this.state.open){
                    this.close();
                    window.setTimeout(()=>{
                        this.setState({open:true})
                    },400)
            }else{
                this.setState({open:true})
            }
        }
    }

    render(){
  
        return (
            <div className="message-wrapper">
                <div className={"message container   "+(this.state.open?"":"closed")} >
    
                <div className="message-content">
                    <div className="message-icon">
                        <div className="fo fo-info" style={this.props.type==="info"?{display: 'block'}:{display: 'none'}}></div>
                        <div className="fo fo-success" style={this.props.type==="success"?{display: 'block'}:{display: 'none'}}></div>
                        <div className="fo fo-error" style={this.props.type==="error"?{display: 'block'}:{display: 'none'}}></div>
                    </div>
                    <div className="message-text">
                        {this.props.text}
                        
                    </div>
                </div>
                <div className="message-close" onClick={this.close}>
                    <div className="fo fo-close"></div>
                </div>
                </div>
            </div>
        )
    }
}






function mapStateToProps(state){

    const {type,text,timestamp}=state.parse.message;
       
    return {
        type,
        text:text?decodeHTMLEntities(text):'',
        timestamp
    }
}
;




Message.propTypes={
    /**
     * Message type [error,info,success]
     */
    type:PropTypes.string,
    /**
     * Message text.
     */
    text:PropTypes.string,
    /**
     * Timestamp of the message.
     */
    timestamp:PropTypes.number
}

export default connect(mapStateToProps)(Message)