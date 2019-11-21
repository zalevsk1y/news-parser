import React from 'react';
import Posts from '../Posts';
import {mockPostsData} from '../../reducers/tests/mockData';
import {create} from 'react-test-renderer';
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import reducers from '../../reducers';
import {receivePostsList} from '../../actions';
const store=createStore(reducers);
store.dispatch(receivePostsList('test.com/rss',mockPostsData)) 

describe('Posts',()=>{
    it('should match snapshot',()=>{
        const component=create(<Provider store={store}><Posts row='3' /></Provider>).toJSON();
        expect(component).toMatchSnapshot();
    })
})