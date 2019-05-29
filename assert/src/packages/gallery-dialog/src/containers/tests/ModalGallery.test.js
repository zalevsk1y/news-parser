import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {create} from 'react-test-renderer';
import {ModalGallery} from '../ModalGallery'


describe('ModalGallery',()=>{
    it('Should match snapshot',()=>{
        const component=create(<ModalGallery />);
        expect(component).toMatchSnapshot();
    })
}
)