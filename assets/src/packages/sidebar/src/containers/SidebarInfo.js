import React from 'react';
import { Sidebar } from './Sidebar';
import { SidebarItem } from '../components/SidebarItem';



export const SidebarInfo=React.memo(function(props){
    return (
        <Sidebar sidebarHeader={'Info'}>
            <SidebarItem>
                {props.info}
            </SidebarItem>
        </Sidebar>
    )
},function(prevProps,nextProps){
    return Object.is(prevProps,nextProps);
})