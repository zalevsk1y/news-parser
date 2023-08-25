import React from 'react';
import { SidebarItemLabel,SidebarItem } from '@news-parser/ui/sidebar/';
import { useGetStatusVisibility, useStatusVisibility } from '@news-parser/entities/sidebar/hooks';
import { Select } from '@news-parser/components/Select';
import { PopUpTimeDate } from '@news-parser/components/sidebar/PopUpTimeDate';
// import '@news-parser/styles/sidebar/_status-visibility-group.scss'

/**
 * React functional component for rendering a group of status visibility options.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function StatusVisibilityGroup() {
    const [status, publish, postFormat] = useGetStatusVisibility()
    const [postStatusChangeHandler, postFormatChangeHandler, publishDateChangeHandler] = useStatusVisibility();

    return (
        <>
            <SidebarItem>
                <SidebarItemLabel>Status:</SidebarItemLabel>
                <Select onChange={postStatusChangeHandler} value={status}>
                    <option value="publish">Public</option>
                    <option value="private">Private</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="future">Future</option>
                </Select>
            </SidebarItem>
            <SidebarItem>
                <SidebarItemLabel>Post format:</SidebarItemLabel>
                <Select onChange={postFormatChangeHandler} value={postFormat}>
                    <option value="aside" label='Aside' />
                    <option value="audio" label='Audio' />
                    <option value="chat" label='Chat' />
                    <option value="gallery" label='Gallery' />
                    <option value="imagey" label='Imagey' />
                    <option value="link" label='Link' />
                    <option value="quote" label='Quote' />
                    <option value="standard" label='Standard' />
                    <option value="status" label='Status' />
                    <option value="video" label='Video' />
                </Select>
            </SidebarItem>
        </>
    )

}

export default StatusVisibilityGroup