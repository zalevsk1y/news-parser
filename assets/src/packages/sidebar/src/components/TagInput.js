import React from 'react';
import '@news-parser/styles/sidebar/_tag-input.scss';

export class TagInput extends React.Component{
    constructor (props){
        super (props);
        this.state={tags:Array.isArray(props.tags)?props.tags:[]};
        this.inputKeyPressHandler=this.inputKeyPressHandler.bind(this);
        this.removeTag=this.removeTag.bind(this)
        this.tagItemAttrebuteName='data-tag-name'
    }
    renderTags(){
        return this.state.tags.map((item,i)=>{
         const clickCallback=(event)=>{
             this.removeTag(item)
         }
         return (
             <span className='tag-item-token' key={'tag-item-'+i.toString()}>
                 <span className='tag-item-name'>{item}</span>
                 <button className='close-tag-cross' onClick={clickCallback}>x</button>
             </span>
         )   
        })
    }
    removeTag(tagName){
        const tagsArr=this.state.tags,
        tagIndex=tagsArr.indexOf(tagName);
        if (tagIndex===-1) return null;
        let deletedTagName=tagsArr.splice(tagIndex,1);
        this.setState({tags:tagsArr})
        return deletedTagName[0];
    }
    addNewTag(tag){
        if (this.state.tags.indexOf(tag)==-1){
            let sanitizeTag=this.sanitizeTag(tag),
                tagsArray=this.state.tags;
            tagsArray.push(sanitizeTag);
            
            this.setState({tags:tagsArray})
        }
    }
    sanitizeTag(tag){
        return tag.replace(',','');
    }
    inputKeyPressHandler(event){
        if (event.key==='Enter'||event.key===','){
            const tag=event.target.value;
            event.target.value='';
            tag!==''&&this.addNewTag(tag)
        }
    }
    render(){
        const inputId=`tag-input${this.props.idSufix?'-'+this.props.idSufix:''}`;
        return (
            <div className='tag-item-container'>
                <label htmlFor={inputId}>{this.props.labelText}</label>
                <div className='tag-input-container'>
                    {this.renderTags()}
                    <input type='text' onKeyPress={this.inputKeyPressHandler} id={inputId}></input>
                </div>
                <p>{this.props.bottomCapture}</p>
            </div>
        )
    }
}