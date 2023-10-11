
import { MediaData } from "types/post"
/**
 * Format media create request.
 * 
 * @since 1.0.0
 * 
 * @param {string} url 
 * @param {string} alt 
 * @param {number} postId 
 * @returns {object}
*/

export const formatCreateMediaData=(url:string,alt:string,post_id:number):MediaData=>({url,
        options:{
            alt,
            post_id
        }
    })