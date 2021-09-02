import React from 'react';

import { SidebarItemLabel } from '../../components/SidebarItemLabel';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarItemsGroup } from '../../components/SidebarItemsGroup';

import { connect } from 'react-redux';
import { allowCommentsSet,allowPinbacksSet } from '../../actions/descussion.actions';


export class DiscussionGroup extends React.Component{
    constructor (props){
        super(props);
        this.onChange=this.onChange.bind(this)
    }
    onChange(event){
        console.log(event)
        switch(event.target.name){
            case 'allowComments':
                this.props.allowCommentsSet(event.target.checked);
                break;
            case 'allowPingbacks':
                this.props.allowPinbacksSet(event.target.checked);
                break;
        }
    }
    render(){
        return (
            <SidebarItemsGroup header='Discussion' border={'bottom'}>
                    <SidebarItem>
                        <input type='checkbox' className='sidebar-item-radio' name='allowComments'checked={this.props.allowComments} onChange={this.onChange}></input>
                        <SidebarItemLabel>
                            Allow comments
                        </SidebarItemLabel>
                    </SidebarItem>    
                    <SidebarItem>
                        <input type='checkbox' className='sidebar-item-radio' name='allowPingbacks'  checked={this.props.allowPinbacks} onChange={this.onChange}></input>
                        <SidebarItemLabel>
                            Allow pingbacks & trackbacks
                        </SidebarItemLabel>
                    </SidebarItem>
                </SidebarItemsGroup>
        )
    }
}

function mapStateToProps(state) {
    return {
        allowComments:state.parse.sidebar.allowComments,
        allowPinbacks:state.parse.sidebar.allowPinbacks
    }
}
function mapDispatchToProps(dispatch) {
    return {
        allowCommentsSet:checked=>{
            dispatch(allowCommentsSet(checked))
        },
        allowPinbacksSet:checked=>{
            dispatch(allowPinbacksSet(checked))
        }
    }
}
export default connect (mapStateToProps,mapDispatchToProps)(DiscussionGroup)