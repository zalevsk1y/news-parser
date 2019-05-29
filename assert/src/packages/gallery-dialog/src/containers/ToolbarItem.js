import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectPicture, focusPicture, deselectPicture} from '../actions';

export class ToolbarItem extends React.Component{
    constructor(props){
        super(props);
        this.onClick=this.onClick.bind(this)
    }
    onClick(){
        this.props.focus||this.props.focusItem(this.props.id);
    }
    render(){
        const details=this.props.select?' details':'';
        return (
            <li tabindex="0" role="checkbox" aria-label="image" aria-checked="true" onClick={this.onClick} className={"attachment selection selected save-ready"+details}>
                <div className="attachment-preview js--select-attachment type-image subtype-jpeg landscape">
                    <div className="thumbnail">
                        <div className="centered">
                            <img src={this.props.url} draggable="false" alt=""/>
                        </div>
                    </div>
                </div>
            </li>
            )
    }
}
function mapStateToProps(state,props){
    const item=state.parse.dialog.data[props.id];
    return {...item}
}
function mapDispatchToProps(dispatch){
    return {
        selectItem:(id)=>{
            dispatch(selectPicture(id))
        },
        focusItem:(id)=>{
            dispatch(focusPicture(id));
        },
        deselectItem:(id)=>{
            dispatch(deselectPicture(id));
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ToolbarItem)