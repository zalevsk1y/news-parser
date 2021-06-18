import React from 'react';
import { Sidebar } from './Sidebar';
import {SidebarHeader} from '../components/SidebarHeader'

export class SidebarMain extends React.Component{
    constructor (props){
        super(props);
    }
    render(){
        return(
            <Sidebar>
                <SidebarHeader>
                    <span className='close-cross'>x</span>
                </SidebarHeader>
            </Sidebar>
        )
    }
}