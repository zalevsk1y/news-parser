import React from 'react';
import './switch.scss';


export function Switch (props){
    const switchStateClassName=props.state;
    return (
            <div className='switch d-flex flex-column justify-content-center' onClick={props.onClick}>
                <div className="switch-line"></div>
                <div className={`switch-bubble ${props.state===true?'switch-on':'switch-off'}`}></div>
            </div>
    )
}
export default React.memo((props)=><Switch {...props} />)