import {newsParserSettings as settings,newsParserApiEndpoints as endpoints} from 'globals';

const config={
    mode:'development',
    root:'?page='+endpoints.rssPageName,
    restRoot:settings.root,
    emulateJSON:false,

    parsingApi:{
        list:endpoints.list,
        single:endpoints.single,
        multi:endpoints.multi
    },
    optionsApi:{
        create:endpoints.options
    },
    mediaApi:{
        create:endpoints.media
    },
    errorReport:{
        url:'https://github.com/zalevsk1y/news-parser/issues/new'
    },
    defaultImage:'/images/Grey-Gradient.png',
    nonce:{
        rest:settings.restApiNonce,
        ajax:settings.ajaxApiNonce
    },
    amedia:{
        phone:782
    },
    lang:{
        class:'wrap'
    }
} 


export default config;