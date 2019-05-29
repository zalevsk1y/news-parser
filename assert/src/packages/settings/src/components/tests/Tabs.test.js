import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

import Tab from '../Tab';
configure({adapter:new Adapter ()})

describe('Tab',()=>{
    const clickFn=jest.fn();
    const component=shallow(<Tab active={true} className='tab1' selectHandler={clickFn} id={1} name='testTab'/>);
    it('should render correctly ',()=>{
       
        expect(component).toMatchSnapshot()
    } )
    it('should call function passed to props selectHandler',()=>{
        component.find('h2').simulate('click',1);
        expect(clickFn).toHaveBeenCalledWith(1);
    })
})