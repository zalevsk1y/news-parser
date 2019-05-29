import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

import Input from '../Input';
configure({adapter:new Adapter ()})
describe('Input',()=>{
    const onBlur=jest.fn();
    const component=shallow(<Input onBlur={onBlur} />)
    const input=component.find('input');
    it('should update state onChange event',()=>{
        
        input.simulate('change',{target:{value:'test'}});
        expect(component.state().value).toBe('test');
    })
    it('should update state on props change',()=>{
        component.setProps({value:'test1'});
        expect(component.state().value).toBe('test1');
    })
    it('should call onBlur function on blur event',()=>{
        input.simulate('change',{target:{value:'test2'}});
        component.simulate('blur');
        expect(onBlur.mock.calls.length).toBe(1);
        expect(onBlur.mock.calls[0][0]).toBe('test2')
    })
})