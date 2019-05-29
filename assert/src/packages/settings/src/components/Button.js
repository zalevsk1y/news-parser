import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component{

    mouseDownHandler(event){
      event.target.className+=' clicked';
     
    }
    mouseUpHandler(event){
      event.target.className=event.target.className.indexOf(' clicked')<0?event.target.className:event.target.className.replace(' clicked','')
    }
    render(){
      const name=this.props.className||'';
      return (
       
            <div className="submit">
              <div type="button"  className={"button button-large "+name} onClick={this.props.onClick} onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>{this.props.value}</div>
            </div>
  
      )
    }
  }
  export default Button;

  Button.propTypes={
    className:PropTypes.string,
    value:PropTypes.string.isRequired,
    onClick:PropTypes.func.isRequired
  }