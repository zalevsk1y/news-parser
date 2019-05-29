import React from 'react';

export function SidebarRight(props){
        return (
            <div className="media-sidebar">
                <div tabindex="0" data-id="1468" className="attachment-details save-ready">
                    <h2>Attachment Details</h2>
                    <div className="attachment-info">
                        <div className="thumbnail thumbnail-image">                   
                            <img src={props.focus.url} draggable="false" alt=""/>
                        </div>
                        <div className="details">
                            <div className="filename">{props.focus.info.name}</div>
                            <div className="dimensions">{props.focus.info.width} by {props.focus.info.height} pixels</div>
                        </div>
                    </div>
	            </div>
            </div>
        );
    }

    export default SidebarRight;