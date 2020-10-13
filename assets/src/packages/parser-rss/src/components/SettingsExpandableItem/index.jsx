import React from 'react';
import './style.scss'

export class SettingsExpandableItem extends React.Component{
    constructor(props){
        super (props);
        this.state={open:false};
        this.toggleItemState=this.toggleItemState.bind(this)
    }
    toggleItemState(){
        console.log(this.state.open)
        this.setState({open:!this.state.open});
    }
    render (){
        return (
           
                    <div className='exp-setting-container settings-item'>
                        {this.props.title&&<span className='exp-settings-title'>{this.props.title}</span>}
                            <i className='fo fo-down-arrow' onClick={this.toggleItemState}>x</i>
                        <div className={this.state.open?'hide':'show'}>
                            {this.props.children}
                        </div>
                    </div>
        )
    }
}

SettingsExpandableItem.defaultProps={
    rowspan:'2'
}