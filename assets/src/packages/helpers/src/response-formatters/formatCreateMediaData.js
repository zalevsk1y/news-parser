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

export const formatCreateMediaData=(url,alt,post_id)=>{
    return {url,
        options:{
            alt,
            post_id
        }
    }
}