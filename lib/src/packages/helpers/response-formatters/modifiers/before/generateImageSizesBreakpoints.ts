import { ContentArrayModifier } from '../../types/modifier'

export const generateImageSizesBreakpoints: ContentArrayModifier = (elemntsArray) => {
    const brackPointsArray = [480, 768, 1024, 1280, 1440, 1900];
    return elemntsArray.map(element => {
        if (element.tagName !== 'IMG' || element.content === undefined) return element;
        const { srcSet } = element.content;
        const srcSetArray = srcSet.split(',');
        const sizes = srcSetArray.map(imageSrc => {
            const imageWidth = parseInt(imageSrc.trim().split(' ')[1])
            for (let breakPoint of brackPointsArray) {
                if (imageWidth < breakPoint) {
                    return `(max-width: ${breakPoint}px) ${imageWidth}w`
                }
            }
            return `${imageWidth}w`
        })
        return {...element,content:{...element.content,sizes:sizes.join(',')}};
    })

}