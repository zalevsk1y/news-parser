import React from 'react';
import {create} from 'react-test-renderer';
import {Post} from '../Post';
import {mockPostsData} from '../../reducers/tests/mockData';


const props={
    title:mockPostsData.data[0].title,
    image:mockPostsData.data[0].image,
    link:mockPostsData.data[0].link,
    description:mockPostsData.data[0].description,
    pubDate:mockPostsData.data[0].pubDate,
    status:'parsed'
}
describe('Post',()=>{
    it('should render post from props',()=>{
        const component=create(<Post {...props}/>).toJSON();
        expect(component).toMatchSnapshot();
    })
})