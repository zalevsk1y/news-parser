import React from 'react';
import PropTypes  from 'prop-types';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        };
        this.blurHandler=this.blurHandler.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange  (event)  {
        this.setState({value: event.target.value});
    }
    blurHandler  ()  {
        this.props.onBlur(this.state.value);  
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value === this.state.value && prevProps.value !== this.props.value) {
            this.setState({value: this.props.value})
        }
    }
    render() {

        return (
            <texterea {...this.props} onChange={this.handleChange} onBlur={this.blurHandler}>
                {this.state.value}
            </texterea>
                )
    }
}

export default Input

Input.propTypes={
    value:PropTypes.string,
    onBlur:PropTypes.func.isRequired
}