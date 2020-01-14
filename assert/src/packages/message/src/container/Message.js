import React from 'react';
import PropTypes from 'prop-types';

export class Message extends React.Component{
    constructor(props){
        super(props);
        this.state={open:props.open,top:false};
        this.close=this.close.bind(this);
       
    }
    close(){
        this.setState({open:false})
    }
    
    componentDidUpdate(prevProps, prevState){
        if(this.props!==prevProps){
            if(this.state.open&&this.props.open){
                this.close();
                window.setTimeout(()=>{
                    this.setState({open:this.props.open})
                },400)
            }else{
                this.setState({open:this.props.open})
            }
        }

    }

    render(){
  
        return (
            <div className="message-wrapper">
                <div className={"message container "+(this.state.open?"":"closed")} >
    
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




Message.propTypes={
    open:PropTypes.bool.isRequired,
    type:PropTypes.string,
    text:PropTypes.string,
    time:PropTypes.string
}

export default Message;