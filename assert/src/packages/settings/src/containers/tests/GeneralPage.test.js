import React from 'react';
import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GeneralPage} from '../GeneralPage';
import {defaultState} from '../../reducers/defaultState'
import {GENERAL_FIELD_NAME} from '../../actions'


configure({adapter:new Adapter()});

describe('General Page',()=>{
    it('should render correctly',()=>{
        const component=shallow(<GeneralPage settings={defaultState.settings[GENERAL_FIELD_NAME]} toggleAddSource={jest.fn()}/>);
        expect(component).toMatchSnapshot();
    })
})