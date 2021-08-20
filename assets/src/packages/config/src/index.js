import {newsParserSettings as settings,newsParserApiEndpoints as endpoints} from 'globals';
import {POST,GET,AJAX,REST,PARSE,CREATE} from '@news-parser/parser-rss/constants/';
import {HTML,TEMPLATE,POST_DRAFT,MEDIA} from '@news-parser/visual-constructor/constants/';
import {LIST,PAGE} from '@news-parser/parser-rss/constants/';
import {WP_API,CATEGORIES} from '@news-parser/parser-rss/constants/';

const config={
    mode:'development',
    restRootUrl:settings.root,
    pluginRoot:settings.pluginUrl,
    editPostLink:settings.editPostLink,
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
                url:endpoints.rootRestApi+'wp/v2/posts'
            }
        },
        [`${WP_API}_${CATEGORIES}`]:{
            [GET]:{
                method:GET,
                type:REST,
                nonce:null,
                url:endpoints.rootRestApi+'wp/v2/categories?per_page=100&orderby=name&order=asc&_fields=id%2Cname%2Cparent&_locale=user',
                perPage:100,
                orderBy:'name',
                order:'asc',
                _fields:'id%2Cname%2Cparent',
                _locale:'user'
            }   
            
        }

    },
    errorReport:{
        url:'https://github.com/zalevsk1y/news-parser/issues/new'
    },
    defaultImage:settings.pluginUrl+'/public/images/Grey-Gradient.png',
    spinnerImage:settings.pluginUrl+'/public/images/loading.gif',
    amedia:{
        phone:782
    },
    lang:{
        class:'wrap'
    }
} 


export default config;