import React from 'react';
import ToolbarItem from '../containers/ToolbarItem';

export class Toolbar extends React.Component{
    constructor(props){
        super(props);
        this.itemRender=this.itemRender.bind(this);
    }
    itemRender(){
        const pictures=[];
        this.props.pictures.forEach((item,key)=>{
            if (item.select){
                pictures.push (
                    <ToolbarItem id={item.id} key={key.toString()}/>
                    )
                }
        })
        
        
;        return pictures;
    }
    countSelected(){
        var count=0;
        this.props.pictures.forEach(item=>{
            item.select&&count++;
        })
        return count;
    }
    render(){
        return (
            <div className="media-frame-toolbar">
                <div className="media-toolbar">
                    <div className="media-toolbar-secondary">
                        <div className="media-selection">
                            <div className="selection-info">
                                <span className="count">{this.countSelected()} selected</span>
                                <button type="button" className="button-link clear-selection" onClick={this.props.deselectAll}>Clear</button>
                            </div>
                            <div className="selection-view">
                                <ul tabindex="-1" className="attachments" id="__attachments-view-35">
                                    <this.itemRender />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="media-toolbar-primary search-form">
                        <button type="button" className="button media-button button-primary button-large media-button-gallery" onClick={this.props.onClick}>Create a new gallery</button>
                    </div>
                </div>
        </div>
        )
    }
}

export default Toolbar;