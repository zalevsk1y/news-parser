import { newsParserSettings as settings, newsParserApiEndpoints as endpoints } from 'globals';
import { configConstantsEntities,configConstantsMethods,cofigConstantsEvents } from './constants';

const NEWS_PARSER_REST_PREFIX = `${endpoints.rootRestApi  }news-parser-plugin/v1/`;


export interface Config {
    mode: string;
    rootUrl: string;
    restRootUrl: string;
    pluginRoot: string;
    editPostLink: string;
    api: {
      [key: string]: {
        [key: string]: {
          method: string;
          type: string;
          nonce: string | null;
          url: string;
          perPage?: number;
          orderBy?: string;
          order?: string;
          _fields?: string;
          _locale?: string;
        };
      };
    };
    errorReport: {
      url: string;
    };
    defaultImage: string;
    spinnerImage: string;
    amedia: {
      phone: number;
    };
    lang: {
      class: string;
    };
  }
  

const config:Config = {
    mode: 'development',
    rootUrl: endpoints.root,
    restRootUrl: settings.restRoot,
    pluginRoot: settings.pluginUrl,
    editPostLink: settings.editPostLink,
    api: {
        [configConstantsEntities.PARSER_RSS_LIST]: {
            [cofigConstantsEvents.PARSE]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.AJAX,
                nonce: settings.ajaxApiNonce,
                url: endpoints[configConstantsEntities.LIST]
            }
        },
        /// visual-constructor.html
        [configConstantsEntities.RAW_HTML]: {
            [cofigConstantsEvents.PARSE]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.AJAX,
                nonce: settings.ajaxApiNonce,
                url: endpoints[configConstantsEntities.RAW_HTML]
            }
        },
        [configConstantsEntities.PAGE]: {
            [cofigConstantsEvents.PARSE]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.AJAX,
                nonce: settings.ajaxApiNonce,
                url: endpoints[configConstantsEntities.PARSER_RSS_PAGE]
            }
        },
        [configConstantsEntities.MEDIA]: {
            [cofigConstantsEvents.CREATE]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.AJAX,
                nonce: settings.ajaxApiNonce,
                url: endpoints[configConstantsEntities.MEDIA]
            }
        },
        [configConstantsEntities.TEMPLATE]: {
            [cofigConstantsEvents.CREATE]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${NEWS_PARSER_REST_PREFIX  }templates`
            },
            [cofigConstantsEvents.GET]: {
                method: configConstantsMethods.GET,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${NEWS_PARSER_REST_PREFIX  }templates`
            },
            [cofigConstantsEvents.DELETE]: {
                method: configConstantsMethods.DELETE,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${NEWS_PARSER_REST_PREFIX  }templates`
            }
        },
        [configConstantsEntities.CRON]: {
            [cofigConstantsEvents.UPDATE]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${NEWS_PARSER_REST_PREFIX  }cron`
            },
            [cofigConstantsEvents.GET]: {
                method: configConstantsMethods.GET,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${NEWS_PARSER_REST_PREFIX  }cron`
            },
            [cofigConstantsEvents.DELETE]: {
                method: configConstantsMethods.DELETE,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${NEWS_PARSER_REST_PREFIX  }cron`
            }
        },
        // visual-constructor.post-draft
        [configConstantsEntities.WP_POST]: {
            [cofigConstantsEvents.CREATE]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${endpoints.rootRestApi  }wp/v2/posts`
            }
        },
        [configConstantsEntities.API_WP_CATEGORIES]: {
            [cofigConstantsEvents.GET]: {
                method: configConstantsMethods.GET,
                type: cofigConstantsEvents.REST,
                nonce: null,
                url: `${endpoints.rootRestApi  }wp/v2/categories&orderby=name&order=asc&_fields=id%2Cname%2Cparent&_locale=user`,
                perPage: 100,
                orderBy: 'name',
                order: 'asc',
                _fields: 'id%2Cname%2Cparent',
                _locale: 'user'
            },
            [cofigConstantsEvents.POST]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${endpoints.rootRestApi  }wp%2Fv2%2Fcategories&context=edit&_locale=user`,
                _locale: 'user'
            }
        },
        [configConstantsEntities.API_WP_TAGS]: {
            [cofigConstantsEvents.GET]: {
                method: configConstantsMethods.GET,
                type: cofigConstantsEvents.REST,
                nonce: null,
                url: `${endpoints.rootRestApi  }wp/v2/tags&orderby=count&order=desc&_fields=id%2Cname%2Ccount&_locale=user`,
                perPage: 100,
                orderBy: 'count',
                order: 'desc',
                _fields: 'id%2Cname%2Ccount',
                _locale: 'user'
            },
            [cofigConstantsEvents.POST]: {
                method: configConstantsMethods.POST,
                type: cofigConstantsEvents.REST,
                nonce: settings.wpRestApiNonce,
                url: `${endpoints.rootRestApi  }wp/v2/tags&_locale=user`,
                _locale: 'user'
            }
        }

    },
    errorReport: {
        url: 'https://github.com/zalevsk1y/news-parser/issues/new'
    },
    defaultImage: `${settings.pluginUrl  }/public/images/Grey-Gradient.png`,
    spinnerImage: `${settings.pluginUrl  }/public/images/loading.gif`,
    amedia: {
        phone: 782
    },
    lang: {
        class: 'wrap'
    }
}


export default config;