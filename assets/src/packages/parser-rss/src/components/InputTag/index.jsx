import React, { isValidElement } from 'react';
import {Tag} from '../Tag';
import './input-tag.scss';

export class InputTag extends React.Component{
    constructor (props){
        super(props);
        this.inputRef=React.createRef();
        this.tagCloseHandler=this.tagCloseHandler.bind(this);
        this.inputChangeHandler=this.inputChangeHandler.bind(this);
        this.inputBlurHandler=this.inputBlurHandler.bind(this);
        this.setFocus=this.setFocus.bind(this);
        this.removeFocus=this.removeFocus.bind(this);
        this.resetTags=this.resetTags.bind(this)
        this.state={tags:(new Set()),focus:false};
    }
    tagCloseHandler(filterName){
        this.removeTag(filterName);
    }
    setFocus(){
        this.inputRef.current.focus();
        this.setState({focus:true})
    }
    removeFocus(){
        this.setState({focus:false})
    }
    clearInput(){
        this.inputRef.current.value='';
    }
    inputChangeHandler(event){
        const inputValue=event.target.value;
        inputValue.charAt(inputValue.length-1)===','&&this.addTag(inputValue.slice(0,inputValue.length-1));
    }
    inputBlurHandler(event){
        const inputValue=event.target.value;
        inputValue!==''&&this.addTag(inputValue);
        this.removeFocus();
    }
    resetTags(){
        this.setState({tags:(new Set())});
        this.props.onChange({type:'reset'})
    }
    addTag(tagName){
        const event={
            type:'add',
            name:tagName
        };
        this.clearInput();
        const newTags=this.state.tags.add(tagName)
        this.setState({tags:newTags})
        this.props.onChange(event)
    }
    removeTag(tagName){
        const event={
            type:'remove',
            name:tagName
        };
        if (this.state.tags.length==0||!this.state.tags.has(tagName)) return;
        const newTag=this.state.tags;
        newTag.delete(tagName);
        this.setState({tags:newTag});
        this.props.onChange(event)
    }
    render(){
        return (
            <>
            <ul className={`filters-input flex-grow-1 ${this.state.focus?'focused':''}`} onClick={this.setFocus}>
                        {Array.from(this.state.tags).map((tagName,index)=><Tag key={index.toString()}  closeTag={this.tagCloseHandler}>{tagName}</Tag>)}
                    <li className="filter-tag-new">
                        <input className='post-filter-input' name='postFilters' type='text' ref={this.inputRef} onChange={this.inputChangeHandler} onBlur={this.inputBlurHandler} onFocus={this.setFocus}>
                        </input> 
                    </li>
            </ul>  
            {this.props.resetButton!==undefined&&<this.props.resetButton onClick={this.resetTags}/>}
            </>
        )
    }
}

