import React from 'react';
import {shallow,configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GalleryPage} from '../GalleryPage';
import {defaultState} from '../../reducers/defaultState'
import {GALLERY_FIELD_NAME} from '../../actions'

configure({adapter:new Adapter()});
describe('Gallery Page',()=>{
    it('should render correctly',()=>{
        const dispatchToProps={ 
                    addGallery:jest.fn(),
                    shortCode:jest.fn(),
                    parameterName:jest.fn()
            }
        const component=shallow(<GalleryPage settings={defaultState.settings[GALLERY_FIELD_NAME]} {...dispatchToProps}/>)
        expect(component).toMatchSnapshot();
    })
})