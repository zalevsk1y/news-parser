import { ContentArrayModifier } from '../../types/modifier'
import { escURLRaw } from '../../../index';
import { InlineElement, ParsedData } from 'types/sidebarTemplate';

export type AddSourceLink=(link:string)=>ContentArrayModifier;
/**
* Add link to the source page.
*  
* @param {string} link 
* @returns {string}
*/

export const addSourceLink:AddSourceLink =(link) => (elemntsArray)=> {
    const sourceLink:InlineElement={
        tagName:'P',
        content:`<a href='${escURLRaw(link)}'>Source</a>`,
        offsetTop:Number.MAX_SAFE_INTEGER,
        parent:[{
            className:'',
            tagName:'body'
    }]
    }
    return [...elemntsArray,sourceLink]
}
