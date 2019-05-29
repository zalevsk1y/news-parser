import React from 'react';
import Input from './Input'

class InputField extends React.Component {
    
    render() {
        return (<Input
            {...this.props}
            onEnterPress={this.props.onPressEnter}
            onBlur={this.props.onBlur}
                />)
    }
}
export default InputField;