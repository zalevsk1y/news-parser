import { TEMPLATE,CREATE } from '../constants'
export const CREATE_PARSING_TEMPLATE=`[${TEMPLATE}:${CREATE}]`;
export function createParsingTemplate(){
    return {
        type:CREATE_PARSING_TEMPLATE
    }
}