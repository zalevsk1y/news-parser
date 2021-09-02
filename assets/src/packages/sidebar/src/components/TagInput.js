import React from 'react';
import '@news-parser/styles/sidebar/_tag-input.scss';

export class TagInput extends React.Component{
    constructor (props){
        super (props);
        this.inputKeyPressHandler=this.inputKeyPressHandler.bind(this);
        this.removeTag=this.removeTag.bind(this);

    }
    renderTags(){
        const tags=this.props.tags||[];
        return tags.map((item,i)=>{
         const clickCallback=(event)=>{
             this.removeTag(item)
         }
         return (
             <span className='tag-item-token' key={'tag-item-'+i.toString()}>
                 <span className='tag-item-name'>{item.name}</span>
                 <button className='close-tag-cross' onClick={clickCallback}>x</button>
             </span>
         )   
        })
    }
    removeTag(tag){
        this.props.onChange(tag)
    }
    addTag(tag){
        this.props.onChange({name:this.sanitizeTag(tag)})
    }
    sanitizeTag(tag){
        return tag.replace(',','');
    }
    inputKeyPressHandler(event){
        if (event.key==='Enter'||event.key===','){
            const tag=event.target.value;
            event.target.value='';
            tag!==''&&this.addTag(tag)
        }
    }
    render(){
        const inputId=`tag-input${this.props.idSufix?'-'+this.props.idSufix:''}`;
        return (
            <div className='tag-item-container'>
                <label htmlFor={inputId}>{this.props.labelText}</label>
                <div className='tag-input-container input-container'>
                    {this.renderTags()}
                    <input type='text' onKeyPress={this.inputKeyPressHandler} id={inputId}></input>
                </div>
                <p>{this.props.bottomCapture}</p>
            </div>
        )
    }
}