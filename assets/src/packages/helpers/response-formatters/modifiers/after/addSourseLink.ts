import { ContenStringModifier } from '../../types/modifier';
import { escURLRaw } from '../../../index';
/**
* Add link to the source page.
*  
* @param {string} link 
* @returns {string}
*/

export const addSourceLink = (link: string): ContenStringModifier => (contentString) => {
    return contentString + `<a href='${escURLRaw(link)}'>Source</a>`
}
