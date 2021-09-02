import React from 'react';
import { Select } from '../../components/Select';
import { SidebarItemLabel } from '../../components/SidebarItemLabel';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarItemsGroup } from '../../components/SidebarItemsGroup';
import { PopUpTimeDate } from '../../components/PopUpTimeDate';
import { publishDateSet,publishIntervalSet,postFormatSet,postStatusSet } from '../../actions/status.visability.actions';
import { connect } from 'react-redux';
import '@news-parser/styles/sidebar/_status-visibility-group.scss'

export class StatusVisibilityGroup extends React.Component {
    constructor (props){
        super(props);
        this.publishDateChangeHandler=this.publishDateChangeHandler.bind(this);
        this.publishIntervalChangeHandler=this.publishIntervalChangeHandler.bind(this);
        this.postFormatChangeHandler=this.postFormatChangeHandler.bind(this);
        this.postStatusChangeHandler=this.postStatusChangeHandler.bind(this)
    }
    publishDateChangeHandler(publishDateState){
        this.props.publishDateSet(publishDateState.date,publishDateState.time);
    }
    publishIntervalChangeHandler(event){
        event.target.value<=24&&this.props.publishIntervalSet(event.target.value)
    }
    postFormatChangeHandler(event){
        const postFormat=event.target.value;
        this.props.postFormatSet(postFormat)
    }
    postStatusChangeHandler(event){
        this.props.postStatusSet(event.target.value)
    }
    render(){
        return (
            <SidebarItemsGroup header='Status & visibility' border={'bottom'}>
                    <SidebarItem>
                        <SidebarItemLabel>Status:</SidebarItemLabel>
                        <Select onChange={this.postStatusChangeHandler} value={this.props.status}>
                            <option value={'publish'}>Public</option>
                            <option value={'private'}>Private</option>
                            <option value={'draft'}>Draft</option>
                            <option value={'pending'}>Pending</option>
                            <option value={'future'}>Future</option>
                        </Select>
                    </SidebarItem>
                    <SidebarItem> 
                        <SidebarItemLabel>Publish:</SidebarItemLabel>
                        <PopUpTimeDate onChange={this.publishDateChangeHandler} value={this.props.publish}></PopUpTimeDate>
                    </SidebarItem>
                    <SidebarItem>
                        <SidebarItemLabel>Post format:</SidebarItemLabel>
                        <Select onChange={this.postFormatChangeHandler} value={this.props.postFormat}>
                            <option value={'aside'} label='Aside'></option>
                            <option value={'audio'} label='Audio'></option>
                            <option value={'chat'} label='Chat'></option>
                            <option value={'gallery'} label='Gallery'></option>
                            <option value={'imagey'} label='Imagey'></option>
                            <option value={'link'} label='Link'></option>
                            <option value={'quote'} label='Quote'></option>
                            <option value={'standart'} label='Standart'></option>
                            <option value={'status'} label='Status'></option>
                            <option value={'video'} label='Video'></option>
                        </Select>
                    </SidebarItem>
                </SidebarItemsGroup>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        status:state.parse.sidebar.status,
        publish:state.parse.sidebar.publish,
        postFormat:state.parse.sidebar.postFormat,
    }
}
function mapDispatchToProps(dispatch){
    return {
        publishDateSet:(date,time)=>{
            dispatch(publishDateSet(date,time))
        },
        publishIntervalSet:publishInterval=>{
            dispatch(publishIntervalSet(publishInterval))
        },
        postFormatSet:postFormat=>{
            dispatch(postFormatSet(postFormat))
        },
        postStatusSet:postStatus=>{
            dispatch(postStatusSet(postStatus))
        }


    }
}
export default connect(mapStateToProps,mapDispatchToProps) (StatusVisibilityGroup)