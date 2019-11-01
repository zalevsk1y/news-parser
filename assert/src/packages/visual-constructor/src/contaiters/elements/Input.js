import React from 'react';
import PropTypes  from 'prop-types';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        };
    
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange  (event)  {
        this.setState({value: event.target.value});
    }


    componentDidUpdate(prevProps, prevState) {
      
        if (prevState.value === this.state.value && prevProps.value !== this.props.value) {
            this.setState({value: this.props.value})
        }
    }
    render() {
        return (
            <textarea className={(this.props.className||'')+' post-title-input'} onChange={this.handleChange} rows='3'>
                {this.state.value}
            </textarea>
            )
    }
}

export default Input

Input.propTypes={
    value:PropTypes.string,
}