import React from 'react';
import PropTypes from 'prop-types';

function Switch({className,active,onClick}){
    name=className||'';
  return (
  <div className={active?className+'  switch-on':className} onClick={onClick}></div>
)
  }
export default Switch;


Switch.propTypes={
  className:PropTypes.string,
  active:PropTypes.bool.isRequired,
  onClick:PropTypes.func.isRequired
}