import config from "@news-parser/config";


export const escURLRaw=(url)=>{
    return url.replace(/[^-A-Za-z0-9+&@#/%?=~_|!.:/]/g,encodeURIComponent("$&"))
}
/**
 * Get search params from url string.
 * 
 * @return {ursSearchParams} instance
 */
export const urlSearchParamsFactory=()=>{
    const currentUrl=window.location.search;
    return new URLSearchParams(currentUrl);
}
/**
 * Assign new url search params to url.
 */
export const setUrlSearchParams=(obj)=>{
    const searchParams=getUrlSearchParams();
    for (const key in obj){
        console.log(key,obj[key])
        searchParams.set(key,obj[key]);
    }
    const url=window.location.origin+window.location.pathname+'?'+searchParams.toString();
    console.log(url)
    location.assign(url);
}
/**
 * Get current url search params
 * 
 */
export const getUrlSearchParams=()=>{
    return urlSearchParamsFactory();
}
export function getLanguage(){
    const className=config.lang.class;
    return document.querySelector('.'+className).dataset['lang'].substring(0,2);
}

/**
 * Get coded hash for string.
 * 
 * @param {string} str 
 */
export function hash(str){
    var hash = 0,
    char;
    if (str.length == 0) return hash;
    for (var i = 0,end=str.length; i <end ; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}
/**
 * Get wordpress edit post link.
 * 
 * @param {string|int} id 
 */
export function getPostEditLink(id){
    let linkTemplate=config.editPostLink;
    return linkTemplate.replace('$postId',id);
}
/**
 * Add search params to URL string.
 * 
 * @param {string} params 
 */
export function encodeUrlWithParams(params){
    const url=window.location.pathname+window.location.search;
    let search='';
    Object.keys(params).forEach(key => {
        search+='&'+key+'='+encodeURIComponent(params[key]);
    });
    return url+search;
}
/**
 * Decode HTML entities.
 * 
 * @param {string} text 
 */
export function decodeHTMLEntities(text) {
    var entities = [
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

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    return text;
}
/**
 * Escape HTML entities.
 * 
 * @param {string} html 
 */
export function escHTML(html){
    const tempDiv=document.createElement('div');
    tempDiv.textContent=html;
    return tempDiv.innerText;
}
/**
 * Get current pludin folder Url.
 */
export function getPluginDirUrl(){
    return config.pluginRoot;
}





