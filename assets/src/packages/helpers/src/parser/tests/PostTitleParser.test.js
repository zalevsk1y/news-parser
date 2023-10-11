import {postTitleParser} from '../PostTitleParser.js';

describe('Test PostTitleParser',()=>{
    it('Should parse title using Schema.org markup',()=>{
        document.body.innerHTML="<meta charset='utf8'>\
        <meta name='application-name' content='test-app'>\
        <meta property='og:title' content='test title'>";
        const titleParser=postTitleParser(document); 
        expect(titleParser.findUsingSchema()).toEqual('test title')
    })
    it('Should parse post title using h1 tag',()=>{
        document.body.innerHTML="<meta charset='utf8'>\
        <meta name='application-name' content='test-app'>\
        <h1>test title</h1>";
        const titleParser=postTitleParser(document); 
        expect(titleParser.findUsingHeaderTag()).toEqual('test title')
    })
    it('Should find post title using both Schema.org and h1 tag.',()=>{
        document.body.innerHTML="<meta charset='utf8'>\
        <meta name='application-name' content='test-app'>\
        <h1>test title</h1>";
        const titleParser=postTitleParser(document); 
        expect(titleParser.findTitle()).toEqual('test title')
    })
    it('Should not find post title and return false',()=>{
        document.body.innerHTML="<meta charset='utf8'>\
        <meta name='application-name' content='test-app'>";
        const titleParser=postTitleParser(document); 
        expect(titleParser.findTitle()).toEqual(false)
    })
})