import React from 'react';
import Picture from '../containers/Picture';


export class Content extends React.Component{
	constructor(props){
		super(props);
		this.renderElements=this.renderElements.bind(this);
	}
	renderElements(){
		const pictureData=this.props.pictures;
		if(pictureData.length===0){
			return pictureData;
		}
		return pictureData.map((item,key)=>{
			return (
			<Picture id={item.id} key={key.toString()}/>
			) 
		})
	}	
    render(){
        return (
            <ul className="attachments ui-sortable ui-sortable-disabled" >
                       <this.renderElements />
    		</ul>
        );
    }
}

export default Content;