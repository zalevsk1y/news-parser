import React from 'react';
import PropTypes  from 'prop-types';
/**
 * Input text area element.
 * 
 * @since 1.0.0
 */
export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ''
        };
    
        this.handleChange=this.handleChange.bind(this);
    }
    /**
     * Handle change of input state.
     * 
     * @param {object} event Event object. 
     */
    handleChange  (event)  {
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }
    componentDidUpdate(prevProps, prevState) {
      
        if (prevState.value === this.state.value && prevProps.value !== this.props.value) {
            this.setState({value: this.props.value})
        }
    }
    render() {
        return (
            <textarea className={(this.props.className||'')+' post-title-input'} onChange={this.handleChange} rows='3' value={this.state.value}>
                
            </textarea>
            )
    }
}

export default Input

Input.propTypes={
    /**
     * Init input value.
     */
    value:PropTypes.string,
    /**
     * Input change handler.
     * 
     * @param {string} value Current input value.
     */
    onChange:PropTypes.func.isRequired
}