import React from 'react';
import { Select,SidebarItemLabel,SidebarItem,PopUpTimeDate } from '@news-parser/ui/sidebar/';
import { useGetStatusVisibility, useStatusVisibility } from '@news-parser/entities/sidebar/hooks';
//import '@news-parser/styles/sidebar/_status-visibility-group.scss'


const StatusVisibilityGroup = () => {
    const [status, publish, postFormat] = useGetStatusVisibility()
    const [postStatusChangeHandler, postFormatChangeHandler, publishDateChangeHandler] = useStatusVisibility();

    return (

        <>
            <SidebarItem>
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
                    <option value={'standard'} label='Standard'></option>
                    <option value={'status'} label='Status'></option>
                    <option value={'video'} label='Video'></option>
                </Select>
            </SidebarItem>
        </>
    )

}

export default StatusVisibilityGroup