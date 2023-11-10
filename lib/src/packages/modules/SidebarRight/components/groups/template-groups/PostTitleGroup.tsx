import React, { ChangeEventHandler } from "react";
import { SidebarItem } from '@news-parser/ui/sidebar';
import { useGetPostTitle } from '@news-parser/entities/sidebarTemplate/hooks';
import { COMPONENTS } from "@news-parser/config/i18n";

export type postTitleGroupProps = {
    newTitle: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

/**
 * Component representing a group for managing the post title in the sidebar.
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.newTitle - The new title value.
 * @param {ChangeEventHandler<HTMLInputElement>} props.onChange - The change event handler for the input element.
 * @returns {JSX.Element} The rendered PostTitleGroup component.
 */

export const PostTitleGroup: React.FC<postTitleGroupProps> = ({ newTitle, onChange }) => {
    const currentTitle = useGetPostTitle();
    return (
        <>
            <SidebarItem>
                <span>{currentTitle}</span>
            </SidebarItem>
            <SidebarItem>
                <input onChange={onChange} value={newTitle} type='text' className="form-control" aria-describedby='new-post-title-description' aria-label='New title input' name='postTitle' />
            </SidebarItem>
            <SidebarItem>
                <p className="howto" id='new-post-title-description'>
                    {COMPONENTS.SIDEBAR_RIGHT.POST_TITLE_GROUP.POST_TITLE_CAPTION}
                </p>
            </SidebarItem>
        </>
    )
}