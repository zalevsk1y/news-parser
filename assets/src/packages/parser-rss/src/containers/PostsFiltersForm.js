import React from 'react';
import {connect} from 'react-redux';
import {FilterTag} from '../components/FilterTag'

export default class PostsFiltersForm extends React.Component{
    constructor(props){
        super(props);
        this.inputRef=React.createRef();
    }
    tagCloseHandler(filterName){
        this.props.removeFilterTag(filterName)
    }
    clearInput(){
        this.inputRef.current.value='';
    }
    inputChangeHandler(event){
        const inputValue=event.target.value;
        inputValue.charAt(inputValue.length-1)===','&&this.addNewTag(inputValue);
    }
    inputBlurHandler(event){
        const inputValue=event.target.value;
        inputValue!==''&&this.addNewTag(inputValue);
    }
    addNewTag(tagName){
        this.clearInput();
        this.props.addNewFilterTag(tagName);
    }
    render(){
        return (
                <ul className="filters-input">
                    {this.props.postFilters.map((filterName,index)=><FilterTag key={index.toString()} filterName={filterName} closeTag={this.tagCloseHandler}/>)}
                    <li className="filter-tag-new">
                        <input className="post-filters-input" type="text" id="filter-input" ref={this.inputRef} onChange={this.inputChangeHandler} onBlur={this.inputBlurHandler}></input>
                    </li>
                </ul>    
        )
    }
}

PostsFiltersForm.defaultProps={
    postFilters:[]
}