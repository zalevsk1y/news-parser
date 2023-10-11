import { ParsedData } from 'types/sidebarTemplate';
import {ContentArrayModifier} from '../../types/modifier'

export const  groupImagesInRows:ContentArrayModifier=(elemntsArray)=>{
    const newContentArray:Array<ParsedData>=[];
    let previosElement:ParsedData|null=null;
    for (let element of elemntsArray){
        if(previosElement===null){
            previosElement=element;
            newContentArray.push(element);
            continue;
        }
        if(element.tagName==='IMG'&&previosElement?.tagName==='IMG'){
            newContentArray.pop();
            newContentArray.push({
                tagName:'IMGROW',
                content:[
                    element,
                    previosElement
                ],
                offsetTop:previosElement.offsetTop,
                parent:previosElement.parent
            })
        } else {
            newContentArray.push(element);
        }
        previosElement=newContentArray[newContentArray.length-1]
    }
    return newContentArray;
}