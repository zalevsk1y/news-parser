import React from 'react';
import './style.scss'

export class SettingsExpandableItem extends React.Component{
    constructor(props){
        super (props);
    }
    render (){
        return (
            <tr>
                <td rowSpan={this.props.rowspan} className='settings-row-expandable'>
                    <div className='exp-setting-container'>
                        <div className='exp-setting-header'></div>
                        {this.props.title&&<span className='exp-settings-title'>{this.props.title}</span>}
                        <label htmlFor='exp-setting-switch' data-toggle='collapse' data-target='exp-settings-collapse'>
                            <i className='fo fo-down-arrow'>x</i>
                        </label>
                        <input type='checkbox' id='exp-setting-switch'></input>
                        <div className='exp-setting-main'>
                            {this.props.children}
                        </div>
                    </div>
                    
                </td>
            </tr>
        )
    }
}

SettingsExpandableItem.defaultProps={
    rowspan:'2'
}