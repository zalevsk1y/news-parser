import React from 'react';
import {create} from 'react-test-renderer';
import {Message} from '../Message';

import {mockMessageData} from './mockData/mockMessageData';

const props={
    open:Boolean(mockMessageData.msg),
    type:mockMessageData.msg?mockMessageData.msg.type:undefined,
    text:mockMessageData.msg?mockMessageData.msg.text:undefined,
  
}
describe('Message',()=>{
    it('should render message that match snapshot',()=>{
        const component =create(<Message {...props} />).toJSON();
        expect(component).toMatchSnapshot();
    })
    
})
