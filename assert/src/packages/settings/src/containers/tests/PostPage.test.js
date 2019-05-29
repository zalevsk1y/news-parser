import React from 'react';
import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PostPage} from '../PostPage';
import {defaultState} from '../../reducers/defaultState'
import {POST_FIELD_NAME} from '../../actions'

configure({adapter:new Adapter()});
describe('Post Page',()=>{
    it('should render correctly',()=>{
        const dispatchToProps={
            toggleAddThumbnail:jest.fn(),
            toggleParseOtherPictures:jest.fn(),
            toggleShowPicturesDialog:jest.fn(),
            changeMaxPictures:jest.fn()
        }
        const component=shallow(<PostPage settings={defaultState.settings[POST_FIELD_NAME]} {...dispatchToProps} />)
        expect(component).toMatchSnapshot()
    })
})