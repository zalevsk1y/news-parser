import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import {configure,shallow} from 'enzyme';

import Button from '../Button'


configure({adapter:new Adapter()});
describe('Button ',()=>{
    const onclick=jest.fn();
    const component=shallow(<Button className='button-test' onClick={onclick} value='Test Button'/>)
    const button=component.find('.button');
    it('should add className "clicked"  to button  if mouseDown',()=>{
        const event={target:{className:'button-test'}} 
        button.simulate('mousedown',event);
        expect(event.target.className).toBe('button-test'+' clicked')
    })
    it('should remove className "clicked"  to button  if mouseup',()=>{
        const event={target:{className:'button-test clicked'}} 
        button.simulate('mouseup',event);
        expect(event.target.className).toBe('button-test')
    })
   it ('should run this.props.onClick function on click',()=>{
       button.simulate('click')
        expect(onclick.mock.calls.length).toBe(1)

   })
})