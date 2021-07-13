import React from 'react';
import { PopUp } from './PopUp';

export class PopUpTimeDate extends React.Component{
    constructor (props){
        super(props);
        this.defaltState={date:false,time:"12:00",output:'Immediatly',popUp:false};
        this.state=this.defaltState;
        this.openPopUp=this.openPopUp.bind(this);
        this.closePopUp=this.closePopUp.bind(this);
        this.timeChangeHandle=this.timeChangeHandle.bind(this);
        this.dateChangeHandle=this.dateChangeHandle.bind(this);
        this.resetState=this.resetState.bind(this);
        this.handleBlur=this.handleBlur.bind(this)
    }
    openPopUp(){
        console.log(this.state)
        this.setState({popUp:!this.state.popUp})
    }
    closePopUp(){
        this.setState({popUp:false});
    }
    timeChangeHandle(value){
        this.setState({time:value.target.value})
    }
    dateChangeHandle(value){
        console.log(value)
        this.setState({date:value.target.value})
    }
    resetState(){
        this.setState(this.defaltState);
        this.closePopUp()
    }
    handleBlur(e){
        const currentTarget=e.currentTarget,
            $this=this; 
        window.setTimeout(()=>{
            if (currentTarget!==document.activeElement.parentElement){
                $this.closePopUp();
            }
        },0)
    }
    render(){
        return (
        <div className='sidebar-publish-time-containar' >
            <span className='sidebar-publish-time-input' onClick={this.openPopUp}>{this.state.date===false?this.state.output:this.state.date.toString() + ' ' + this.state.time} </span>
            <PopUp open={this.state.popUp}>
                <form onBlur={this.handleBlur} >
                    <input type='date' onChange={this.dateChangeHandle} autoFocus={true}></input>
                    <input type='time' value={this.state.time} onChange={this.timeChangeHandle}></input>
                    <br></br>
                    <input type='button' className="pop-up-link" onClick={this.closePopUp} value='Reset'></input>
                    <input type='button' className="pop-up-link" onClick={this.closePopUp} value='Submit'></input>
                </form>
            </PopUp>
        </div>
        )
    }
}