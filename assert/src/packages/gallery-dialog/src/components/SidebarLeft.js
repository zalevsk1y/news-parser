import React from 'react';

export class SidebarLeft extends React.Component{
    render(){
        return (
            <div className="media-frame-menu">
                <div className="media-menu">
                    <a href="#" className="media-menu-item active">Select Images</a>
                    <div className="separator"></div>
                </div>
            </div>
        )
    }
}

export default SidebarLeft;