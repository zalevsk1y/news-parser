import React from 'react';


class List extends React.Component{

    listHoverSelect(event){
        const index=parseInt(event.target.dataset.index);
        this.props.listPosition!==index&&this.props.onListPositionChange(index);
      }
    clickHandler(event){
        this.props.onSelect&&this.props.onSelect(event.target.innerHTML);
      }
    renderList=(props)=>{
        const   context=this?props.context:this,
                listPosition=context.props.listPosition;
        return context.props.list.map((el,key) => {
                return (
                <li data-index={key} key={key.toString()} onClick={context.clickHandler.bind(context)}   onMouseEnter={context.listHoverSelect.bind(context)} style={key===listPosition?{backgroundColor: '#1998fc',color:'#fff'}:{}}>{el}</li> 
            );   
        });
    }
    render(){
        return(
            <ul className={this.props.className} style={{visibility:this.props.visibility}}>
                <this.renderList context={this}/>
            </ul>
        );
    }
}
export default List;