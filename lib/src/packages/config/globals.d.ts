
 export interface newsParserApiEndpointsInterace{
    root:string,
    rssPageName:string,
    singlePageName:string,
    list:string,
    rawHTML:string,
    rootRestApi:string,
    templateGetRestApi:string,
    rootAjaxApi:string,
    'visual-constructor.media':string,
    'parser-rss.page':string,
    'visual-constructor.template':string,
}
export interface newsParserSettingsInterace{
    restRoot:string,
    pluginUrl:string,
    restApiNonce:string,
    ajaxApiNonce:string,
    wpRestApiNonce:string,
    editPostLink:string
}

export declare const newsParserApiEndpoints:newsParserApiEndpointsInterace;
export declare const newsParserSettings:newsParserSettingsInterace
export declare const document:Document; 
export declare const window:Window;

export declare namespace wp {
   export namespace i18n {
      function __ (text: string, domain?: string): string;
      function _x (text: string, context: string, domain?: string): string;
      function _n (
        single: string,
        plural: string,
        number: number,
        domain?: string
      ): string;
    }
  }
  