import { newsParserSettings as settings, newsParserApiEndpoints as endpoints } from 'globals';
import { TEMPLATE } from './constants'
import { WP_POST, MEDIA,PAGE } from './constants';
import { API_WP_TAGS, API_WP_CATEGORIES, PARSER_RSS_LIST, PARSE, RAW_HTML } from './constants';
import { POST, GET, AJAX, REST, CREATE, LIST } from './constants';
const NEWS_PARSER_REST_PREFIX=endpoints.rootRestApi+'news-parser-plugin/v1/';

const config = {
    mode: 'development',
    restRootUrl: settings.root,
    pluginRoot: settings.pluginUrl,
    editPostLink: settings.editPostLink,
    api: {
        [PARSER_RSS_LIST]: {
            [PARSE]: {
                method: POST,
                type: AJAX,
                nonce: settings.ajaxApiNonce,
                url: endpoints[LIST]
            }
        },
        ///visual-constructor.html
        [RAW_HTML]: {
            [PARSE]: {
                method: POST,
                type: AJAX,
                nonce: settings.ajaxApiNonce,
                url: endpoints[RAW_HTML]
            }
        },
        [PAGE]: {
            [PARSE]: {
                method: POST,
                type: AJAX,
                nonce: settings.ajaxApiNonce,
                url: endpoints[PAGE]
            }
        },
        [MEDIA]: {
            [CREATE]: {
                method: POST,
                type: AJAX,
                nonce: settings.ajaxApiNonce,
                url: endpoints[MEDIA]
            }
        },
        //visual-constructor.template
        [TEMPLATE]: {
            [CREATE]: {
                method: POST,
                type: REST,
                nonce: settings.wpRestApiNonce,
                url: NEWS_PARSER_REST_PREFIX+'templates'
            },
            [GET]: {
                method: GET,
                type: REST,
                nonce: settings.wpRestApiNonce,
                url: NEWS_PARSER_REST_PREFIX+'templates'
            }
        },
        //visual-constructor.post-draft
        [WP_POST]: {
            [CREATE]: {
                method: POST,
                type: REST,
                nonce: settings.wpRestApiNonce,
                url: endpoints.rootRestApi + 'wp/v2/posts'
            }
        },
        [API_WP_CATEGORIES]: {
            [GET]: {
                method: GET,
                type: REST,
                nonce: null,
                url: endpoints.rootRestApi + 'wp/v2/categories&orderby=name&order=asc&_fields=id%2Cname%2Cparent&_locale=user',
                perPage: 100,
                orderBy: 'name',
                order: 'asc',
                _fields: 'id%2Cname%2Cparent',
                _locale: 'user'
            },
            [POST]: {
                method: POST,
                type: REST,
                nonce: settings.wpRestApiNonce,
                url: endpoints.rootRestApi + 'wp%2Fv2%2Fcategories&context=edit&_locale=user',
                _locale: 'user'
            }
        },
        [API_WP_TAGS]: {
            [GET]: {
                method: GET,
                type: REST,
                nonce: null,
                url: endpoints.rootRestApi + 'wp/v2/tags&orderby=count&order=desc&_fields=id%2Cname%2Ccount&_locale=user',
                perPage: 100,
                orderBy: 'count',
                order: 'desc',
                _fields: 'id%2Cname%2Ccount',
                _locale: 'user'
            },
            [POST]: {
                method: POST,
                type: REST,
                nonce: settings.wpRestApiNonce,
                url: endpoints.rootRestApi + 'wp/v2/tags&_locale=user',
                _locale: 'user'
            }
        }

    },
    errorReport: {
        url: 'https://github.com/zalevsk1y/news-parser/issues/new'
    },
    defaultImage: settings.pluginUrl + '/public/images/Grey-Gradient.png',
    spinnerImage: settings.pluginUrl + '/public/images/loading.gif',
    amedia: {
        phone: 782
    },
    lang: {
        class: 'wrap'
    }
}


export default config;