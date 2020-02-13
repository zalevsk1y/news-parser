import {newsParserSettings as settings,newsParserApiEndpoints as endpoints} from 'globals';
import {POST,AJAX,REST,PARSE,CREATE} from '@news-parser/parser-rss/constants/';
import {HTML,TEMPLATE,POST_DRAFT,MEDIA} from '@news-parser/visual-constructor/constants/';
import {LIST,PAGE} from '@news-parser/parser-rss/constants/'
const config={
    mode:'development',
    rootUrl:settings.root,
    api:{
        [LIST]:{
            [PARSE]:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints[LIST]
            }
        },
        ///visual-constructor.html
        [HTML]:{
            [PARSE]:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints[HTML]
            }
        },
        [PAGE]:{
            [PARSE]:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints[PAGE]
            }
        },
        [MEDIA]:{
            [CREATE]:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints[MEDIA]
            }
        },
        //visual-constructor.template
        [TEMPLATE]:{
            [CREATE]:{
                method:POST,
                type:AJAX,
                nonce:settings.ajaxApiNonce,
                url:endpoints[TEMPLATE]
            }
        },
        //visual-constructor.post-draft
        [POST_DRAFT]:{
            [CREATE]:{
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