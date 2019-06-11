import React from 'react';
import PropTypes from 'prop-types';
import Translate from '../containers/Translate'

class Tab extends React.Component {
    constructor(props){
      super(props);
      this.handleClick=this.handleClick.bind(this)
    }
    handleClick(){
      this.props.selectHandler(this.props.id)  
    }
    render(){
      const state=this.props.active,
            className="main-tabs "+this.props.className+(state?' active-tab':'');
      return (
        <h2 className={className} onClick={this.handleClick}><Translate>{this.props.name}</Translate></h2>
      );
    }
  }

Tab.propTypes={
  selectHandler:PropTypes.func.isRequired,
  className:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  id:PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])

}

export default Tab; 