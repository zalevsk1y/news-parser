import React from 'react';
import {InputForm} from '../InputForm';
import Adapter from 'enzyme-adapter-react-16';
import {configure,shallow} from 'enzyme';


configure({adapter:new Adapter()})
describe('InputForm',()=>{
    it('should send submit rss parse with value from input field and action=list',()=>{
        const parseEventHandlers={
            parsePage:jest.fn(),
            parseList:jest.fn()
        }
        const component=shallow(<InputForm value={'test.com/rss'} {...parseEventHandlers}/>);
        const input = component.find('.search-textbox');
        const testInput='test'
        input.simulate('change',{target:{value:testInput}});
        // if event handler called by .simulate changes state, component does not update itself .
        // https://github.com/airbnb/enzyme/issues/1229 
        expect(component.state().inputValue).toEqual(testInput);
    })
})