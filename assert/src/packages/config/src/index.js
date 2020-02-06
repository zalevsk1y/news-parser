import {newsParserSettings as settings,newsParserApiEndpoints as endpoints} from 'globals';
import {GET,POST,AJAX,REST} from '@news-parser/parser-rss/constants/';
const config={
    mode:'development',
    emulateJSON:false,
    api:{
        list:{
            parse:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints.list
            }
        },
        html:{
            parse:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints.html
            }
        },
        page:{
            parse:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints.page
            }
        },
        media:{
            create:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints.media
            }
        },
        options:{
            create:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints.options
            }
        },
        post:{
            create:{
                method:POST,
                type:REST,
                nonce:settings.restApiNonce,
                url:settings.root+'wp/v2/posts'
            }
        }

    },
    errorReport:{
        url:'https://github.com/zalevsk1y/news-parser/issues/new'
    },
    defaultImage:'/images/Grey-Gradient.png',

    amedia:{
        phone:782
    },
    lang:{
        class:'wrap'
    }
} 


export default config;