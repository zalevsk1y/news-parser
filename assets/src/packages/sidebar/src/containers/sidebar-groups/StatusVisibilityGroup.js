import React from 'react';
import { Select } from '../../components/Select';
import { SidebarItemLabel } from '../../components/SidebarItemLabel';
import { SidebarItem } from '../../components/SidebarItem';
import { SidebarItemsGroup } from '../../components/SidebarItemsGroup';
import { PopUpTimeDate } from '../../components/PopUpTimeDate';
import { publishDateSet,publishIntervalSet,postFormatSet,postStatusSet } from '../../actions/status.visability.actions';
import { useDispatch, useSelector } from 'react-redux';
import '@news-parser/styles/sidebar/_status-visibility-group.scss'


const StatusVisibilityGroup=()=>{
    const dispatch = useDispatch();
    const { status,publish,postFormat } = useSelector((state) => state.parse.sidebar);
  
    const postStatusChangeHandler=(event)=>{
      dispatch(postStatusSet(event.target.value))
    }
    const postFormatChangeHandler=(event)=>{
      dispatch(postFormatSet(event.target.value))
    }
    const publishDateChangeHandler=(publishDateState)=>{
      dispatch(publishDateSet(publishDateState.date,publishDateState.time))
    }
    return (
      
        <>            <SidebarItem>
                          <SidebarItemLabel>Status:</SidebarItemLabel>
                          <Select onChange={postStatusChangeHandler} value={status}>
                              <option value={'publish'}>Public</option>
                              <option value={'private'}>Private</option>
                              <option value={'draft'}>Draft</option>
                              <option value={'pending'}>Pending</option>
                              <option value={'future'}>Future</option>
                          </Select>
                      </SidebarItem>
                      <SidebarItem> 
                          <SidebarItemLabel>Publish:</SidebarItemLabel>
                          <PopUpTimeDate onChange={publishDateChangeHandler} value={publish}></PopUpTimeDate>
                      </SidebarItem>
                      <SidebarItem>
                          <SidebarItemLabel>Post format:</SidebarItemLabel>
                          <Select onChange={postFormatChangeHandler} value={postFormat}>
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
                      </>
    )
     
}

export default StatusVisibilityGroup