import React from 'react';
import { PopUp } from './PopUp';
import '@news-parser/styles/sidebar/_popup-time-date.scss';

export class PopUpTimeDate extends React.Component{
    constructor (props){
        super(props);
        this.defaltState={date:props.date};
        this.state={...this.defaltState,popUp:false};
        this.modalWindow=React.createRef();
        this.openPopUp=this.openPopUp.bind(this);
        this.closePopUp=this.closePopUp.bind(this);
        this.timeChangeHandle=this.timeChangeHandle.bind(this);
        this.dateChangeHandle=this.dateChangeHandle.bind(this);
        this.resetState=this.resetState.bind(this);
        this.handleBlur=this.handleBlur.bind(this)
        this.buttonClickHandler=this.buttonClickHandler.bind(this)
    }
    openPopUp(){
        this.setState({popUp:true})
    }
    closePopUp(){
        
        this.setState({popUp:false},()=>this.props.onChange&&this.props.onChange(this.state));
    }
    buttonClickHandler(event){
        switch (event.target.value){
            case 'Reset':
                this.resetState();
                break;
        }
    }
    timeChangeHandle(value){
        this.setState({time:value.target.value})
    }
    dateChangeHandle(value){
        this.setState({date:value.target.value})
    }
    intervalChangeHandle(value){
        this.setState({interval:value.target.value})
    }
    resetState(){
        this.setState(this.defaltState);
    }
    handleBlur(e){
        const currentTarget=e.currentTarget,
            $this=this; 
        //setTimeout to prevent modal window open imidiatly after close on sidebar-publish-time-input click event
        window.setTimeout(()=>{
            if (!currentTarget.contains(document.activeElement)){
                $this.closePopUp();
            }
        },100)
    }
    componentDidUpdate(prevProps,prevState){
        //Get focus on form tag (on open) to be able close modal window on blur
        if(this.state.popUp===true&&prevState.popUp===false){
            this.modalWindow.current.focus()
        }
    }
    render(){
        return (
        <div className='sidebar-publish-time-containar' >
            <span className='sidebar-publish-time-input' onClick={this.openPopUp}>{this.state.date===false?'Immidiatly':(new Date(this.state.date)).toLocaleString() } </span>
            <PopUp open={this.state.popUp}>
                <form onBlur={this.handleBlur} tabIndex={1} ref={this.modalWindow}>
                    <input type='datetime-local' onChange={this.dateChangeHandle} value={this.state.date}></input>
                 
                   <div className='pop-up-buttons-block'>
                        <input type='button' className="pop-up-link" onClick={this.buttonClickHandler} value='Reset'></input>
                    </div>
                </form>
            </PopUp>
        </div>
        )
    }
}

PopUpTimeDate.defaultProps={
    date:false,
    popUp:false
}