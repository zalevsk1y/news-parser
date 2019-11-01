import React from 'react';
import Content from '../components/Content';
import SidebarRight from '../components/SidebarRight';  
import SidebarLeft from '../components/SidebarLeft'; 
import Toolbar from '../components/Toolbar'; 
import config from "@news-parser/config";

export class ModalGallery extends React.Component{
    constructor(props){
        super(props);
        this.state=({status:this.status});
        this.onStateChange=this.onStateChange.bind(this);
        this.close=this.close.bind(this);
        this.renderContent=this.renderContent.bind(this);
        this.sendGalleryData=this.sendGalleryData.bind(this);
        this.deselectAll=this.deselectAll.bind(this);
    }
    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
                this.setState({status:this.props.status})
        }
        this.onStateChange();
    }
    onStateChange(){
        this.props.onStateChange(this.state.status)
    }
    close(){
        this.setState({status:false});
        this.props.closeGalleryDialog();
    }
    sendGalleryData(){
        const url=this.props.postURL,
              id=this.props.postID;
        this.props.sendGalleryData(url,id,{gallery:this.getSelectedPicturesArray()});
        this.close();
    }
    getSelectedPicturesArray(){
        const picArray=[];
        this.props.data.forEach(item => {
            item.select&&picArray.push(item.url);
        });
        return picArray;
    }
    deselectAll(){
     
        this.props.data.forEach(item=>{
            this.props.deselectItem(item.id);
        })
    }
    renderContent(){
        const picturesData=this.props.data||[];
        var focusedPicture=picturesData.length?picturesData.filter((item)=>{
                if(item.focus){
                    return item;
                }
            }):[];
        focusedPicture=focusedPicture[0]||{
            url:config.defaultImage,
            info:{ 
                name:"",
                width:'',
                height:''
            }
        }
        return (
            <div  className="media-modal wp-core-ui">
                    <button type="button" className="media-modal-close" onClick={this.close}>
                        <span className="media-modal-icon">
                            <span className="screen-reader-text">Close media panel</span>
                        </span>
                    </button>
                    <div className="media-modal-content">
                        <div className="media-frame mode-select wp-core-ui" id="__wp-uploader-id-0">
                            <SidebarLeft />
                            <div className="media-frame-title">
                                <h1>Select Images<span className="dashicons dashicons-arrow-down"></span></h1>
                            </div>
                            <div className="media-frame-content">
                                <div className="attachments-browser">
                                    <Content pictures={picturesData} />
                                    <SidebarRight focus={focusedPicture}/>
                                </div>
                            </div>
                            <Toolbar  pictures={picturesData} onClick={this.sendGalleryData} deselectAll={this.deselectAll}/>
                        </div>
                    </div>
                </div>
        )
    }
    render(){
      
        const modalVisibility=this.state.status?"":" hidden";
        
        return (
            <div className={'media-modal-wrapper'+modalVisibility}>
                {this.state.status&&this.renderContent()}
                <div class="media-modal-backdrop"></div>
            </div>
        );
    }
}

export default ModalGallery;