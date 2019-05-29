import React from 'react';
import List from './List';

class DataList extends React.Component{
    constructor(props){
      super(props);
      this.state={listVisibility:'hidden',search:'',current:props.value,value:props.value||'',listPosition:undefined,listLength:props.list.legth}
    }


    clickHandler(event){
      const visibility=this.state.listVisibility==='hidden'?'visible':this.state.listVisibility,
            eventTagName=event.target.nodeName,
            position=eventTagName!=="SPAN"?undefined:this.clickArrowHandler(event);
      this.setState({listVisibility:visibility,listPosition:position})
    }
    clickArrowHandler(event){
        const input=event.target.previousElementSibling;
        this.state.listVisibility==='hidden'?input.focus():input.blur();
        return  0;
      }
    blurHandler(event){
      const fn=()=>{
        this.setState({listVisibility:'hidden'})
        if(this.state.value!==this.props.value){
          this.setState({value:this.props.value,search:this.props.value})
      }
      }
      setTimeout(fn,200);
    }
    increaseListPosition(){
      const listLength=this.getFilteredList().length-1,
            oldPosition=this.state.listPosition;
      return oldPosition!==undefined?oldPosition+1<=listLength?oldPosition+1:0:0;
    }
    getFilteredList(){
      const searchValue=this.state.search;
      return this.props.list.filter(el=>el.indexOf(searchValue)>=0);
    }
    selectList(propName){
      this.props.onSelect(propName);
     
    }
    changeHandler(event){
      const value=event.target.value;
      this.setState({search:value,value:value})
    }
    keyPressHandler(event){
      switch(event.which){
        case 13:
          //Enter key
          const currentList=this.getFilteredList(),
                currentPosition=this.state.listPosition;
          this.setState({listVisibility:'hidden'});
          this.state.listPosition===undefined?this.props.onAdd(event.target.value):this.selectList(currentList[currentPosition]);
          event.target.blur();
          
          break;  
        case 9:
          //TAB key
          this.setState({listVisibility:'hidden'});
          event.target.blur();
          break;
        case 40:
            if(this.state.listVisibility==='hidden'){
                this.setState({listVisibility:'visible'})
            }else if(this.state.listVisibility==='visible')
                this.listPositionChange();
          break;
        default:
        //make linter happy.
      }

  
    }
    listPositionChange(index){
      index!==undefined?this.setState({listPosition:parseInt(index)}):this.setState({listPosition:this.increaseListPosition()});
    }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.value === this.state.value && prevProps.value !== this.props.value) {
          this.setState({value: this.props.value})
      }
  }
    render (){
    return (
            <div className="input-list-container data-list " onClick={this.clickHandler.bind(this)}>
                <input className="url-input" onChange={this.changeHandler.bind(this)} onKeyDown={this.keyPressHandler.bind(this)} value={this.state.value} onBlur={this.blurHandler.bind(this)} />
                <span className='fo fo-down-arrow'></span>
                <List  className="site-urls-list" list={this.getFilteredList()} onSelect={this.selectList.bind(this)} onListPositionChange={this.listPositionChange.bind(this)} visibility={this.state.listVisibility}  listPosition={this.state.listPosition}/>
             
            </div>
            )
    }
  }

  export default DataList;