import config from "@news-parser/config/index";

export const escURLRaw=(url:string):string=>url.replace(/[^-A-Za-z0-9+&@#/%?=~_|!.:/]/g,encodeURIComponent("$&"))
/**
 * Get search params from url string.
 * 
 * @return {ursSearchParams} instance
 */
export const urlSearchParamsFactory=():URLSearchParams=>{
    const currentUrl=window.location.search;
    return new URLSearchParams(currentUrl);
}
/**
 * Assign new url search params to url.
 */
export const setUrlSearchParams=(obj:Record<string,any>):void=>{
    const searchParams=urlSearchParamsFactory();
    for (const key in obj){
        searchParams.set(key,obj[key]);
    }
    const url=`${window.location.origin+window.location.pathname}?${searchParams.toString()}`;
    location.assign(url);
}


/**
 * Get coded hash for string.
 * 
 * @param {string} str 
 * @returns {number}
 */
export function hash(str:string):number{
    let hash = 0;
    let char;
    if (str.length == 0) return hash;
    for (let i = 0,end=str.length; i <end ; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash &= hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}
/**
 * Get wordpress edit post link.
 * 
 * @param {string|int} id
 * @returns {string}
 */
export function getPostEditLink(id:string):string{
    const linkTemplate=config.editPostLink;
    return linkTemplate.replace('$postId',id);
}
/**
 * Validate url input value
 * 
 * @param {string} url 
 * @returns {boolean}
 */
export const validateIntupUrl = (url:string):boolean => url.search(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
    ) !== -1;
/**
 * Decode HTML entities.
 * 
 * @param {string} text 
 * @returns {string}
 */
export function decodeHTMLEntities(text:string):string {
    const entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#039', '\''],
        ['#047', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"']
    ];

    for (let i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp(`&${entities[i][0]};`, 'g'), entities[i][1]);

    return text;
}
/**
 * Escape HTML entities.
 * 
 * @param {string} html 
 * @returns {string}
 */
export function escHTML(html:string):string{
    const tempDiv=document.createElement('div');
    tempDiv.textContent=html;
    return tempDiv.innerText;
}
/**
 * Get current pludin folder Url.
 */
export function getPluginDirUrl():string{
    return config.pluginRoot;
}

export function sprintf(format:string,...args:string[]):string{
    let index = 0;
    return format.replace(/%[a-zA-Z]/g, (match) => {
      const type = match.slice(1);
      const value = args[index++];
  
      switch (type) {
        case 's':
          return String(value);
        case 'd':
          return parseInt(value, 10).toString();
        case 'f':
          return parseFloat(value).toString();
        default:
          return match;
      }
    });
  }
  