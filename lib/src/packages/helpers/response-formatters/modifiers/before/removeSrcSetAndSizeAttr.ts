import { ContentArrayModifier } from '../../types/modifier'

export const removeSrcSetAndSizeAttr: ContentArrayModifier = (elemntsArray) => {
    return elemntsArray.map(element => {
        if (element.tagName !== 'IMG' || element.content === undefined) return element;
        const newElement = { ...element, content: { ...element.content, srcSet: '', sizes: '' } }
        return newElement;
    })
}