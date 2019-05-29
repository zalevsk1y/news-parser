import React from 'react';
import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Main} from '../Main';
import {defaultState} from '../../reducers/defaultState'


configure({adapter:new Adapter()});
describe('Main',()=>{
    it('should render correctly',()=>{
        const dispatchToProps={
            getSettings:jest.fn(),
            resetToDefault:jest.fn(),
            saveSettings:jest.fn()
        };
        const component=shallow( <Main
            settings={defaultState.settings}
            tabs={[{   
            className:'general',
            status:true,
            name:'General'
        },
        {   
            className:'post',
            status:false,
            name:'Post'
        }]}  {...dispatchToProps}/>)
        expect(component).toMatchSnapshot();
    });
    
})