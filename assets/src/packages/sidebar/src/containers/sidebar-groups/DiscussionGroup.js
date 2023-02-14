import React from 'react';

import { SidebarItemLabel } from '../../components/SidebarItemLabel';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarItemsGroup } from '../../components/SidebarItemsGroup';

import { useDispatch,useSelector } from 'react-redux';
import { allowCommentsSet,allowPinbacksSet } from '../../actions/descussion.actions';


export class DiscussionGroup1 extends React.Component{
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
//export default connect (mapStateToProps,mapDispatchToProps)(DiscussionGroup)

const DiscussionGroup = () => {
    const { allowComments, allowPinbacks } = useSelector(state => ({
    allowComments: state.parse.sidebar.allowComments,
    allowPinbacks: state.parse.sidebar.allowPinbacks,
    }))
    const dispatch = useDispatch()
    
    const onChange = event => {
    switch (event.target.name) {
    case 'allowComments':
    dispatch(allowCommentsSet(event.target.checked))
    break
    case 'allowPingbacks':
    dispatch(allowPinbacksSet(event.target.checked))
    break
    }
    }
    
    return (
    <>
    <SidebarItem>
    <input
           type="checkbox"
           className="sidebar-item-radio"
           name="allowComments"
           checked={allowComments}
           onChange={onChange}
         />
    <SidebarItemLabel>Allow comments</SidebarItemLabel>
    </SidebarItem>
    <SidebarItem>
    <input
           type="checkbox"
           className="sidebar-item-radio"
           name="allowPingbacks"
           checked={allowPinbacks}
           onChange={onChange}
         />
    <SidebarItemLabel>
    Allow pingbacks & trackbacks
    </SidebarItemLabel>
    </SidebarItem>
    </>
    )
    }
    
    export default DiscussionGroup