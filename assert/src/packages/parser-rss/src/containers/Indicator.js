import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import config from '@news-parser/config';
 /**
  * Indicator stripe.Loading process indicator.
  * 
  * @since 0.8.0
  * 
  */
export class Indicator extends React.Component{
    constructor(props){
        super(props);
        this.state={position:-90,top:false}
        this.tick=this.tick.bind(this);
        this.animation=this.animation.bind(this)
        this.handleScroll=this.handleScroll.bind(this);
    }
    /**
     * Calculates new position of indicator for the next tick. 
     */
    tick(){
        const oldPosition=this.state.position;
        return {position:oldPosition>100?-90:oldPosition+this.props.step};
        
    }
    /**
     * Change state of indicator. 
     */
    animation(){
        if(this.props.isAnimate){
            this.setState(this.tick())
        }else if(!this.props.isAnimate){
            this.setState({position:-90});
        }
    }
    /**
     * Handling Wordpress fixed header menu in mobile version. 
     */
    handleScroll(){
        const windowWidth=parseInt(window.innerWidth),
              yOffset=window.pageYOffset;
        if(config.amedia.phone<windowWidth){
            this.state.top!==false&&this.setState({top:false});
            return;
        }
        this.setState({top:(46-yOffset)>0?(46-yOffset):0});
    }
    /**
     * Get a new tick after state of indicator was update.
     * 
     * @param {object} props 
     */
    componentDidUpdate(){
            requestAnimationFrame(this.animation);
    }
    componentDidMount(){
        window.addEventListener('scroll',this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.handleScroll);
    }
    render(){
        const opacity=this.props.isAnimate?1:0,
              left=this.state.position+'%',
              top=this.state.top;
        return (
            <span className="download-indicator" style={{opacity,left,top}}></span>
        )
    }  
}
function mapStateToProps(state){
    return {
        isAnimate:state.parse.isFetching
    }
}

export default connect(mapStateToProps)(Indicator);

Indicator.propTypes={
    /**
     * Indicator animation status.
     */
    isAnimate:PropTypes.bool.isRequired
}