export const configConstantsEntities=Object.freeze({
  API_WP_TAGS:'API_WP_TAGS',
  API_WP_CATEGORIES:'WP_API_CATEGORIES',
  RAW_HTML:'rawHTML',
  TEMPLATE:'TEMPLATE',
  CRON:'CRON',
  PARSER_RSS_LIST:'parser-rss.list',
  PARSER_RSS_MEDIA:'parser-rss.media',
  PARSER_RSS_PAGE:'parser-rss.page',
  PARSER_RSS_URL:'parser-rss.url',
  PAGE:'page',
  MEDIA:'visual-constructor.media',
  LIST:'list',
  PARSER_RSS:'news-parser',
  WP_POST:'wp-post',
})
// API methods
export const configConstantsMethods=Object.freeze({  
  GET:'get',
  POST:'post',
  PUT:'put',
  DELETE:'delete',
  PATCH:'patch',
  UPDATE:'update',
  CREATE:'create',
  AJAX:'ajax',
})
  // Events
export const cofigConstantsEvents=Object.freeze({
  ...configConstantsMethods,
  PARSE:'parse',
  REST:'rest',
  API_SUCCESS:'API_SUCCESS',
})
