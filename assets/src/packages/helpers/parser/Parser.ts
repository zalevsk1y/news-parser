import { hash } from '@news-parser/helpers/index';
import { ImageContent, ParsedData } from 'types/sidebarTemplate';
import { ParserInterface } from './types';
/**
 * Get HTML element data.
 * 
 * @since 1.0.0
 */
export class Parser implements ParserInterface {
    protected document: Document | undefined;

    constructor(frameElement: HTMLIFrameElement) {
        this.document = frameElement.contentWindow?.document;
    }

    /**
     * Get HTMLElements data.
     * 
     * @param {object} el HTMLElement.
     * @return {object}
     */
    parseElementData(el: HTMLElement) {
        const element = el;
            const parsedData: ParsedData = {
                tagName: '',
                className: '',
                offsetTop: 0,
                parent: []
            };
        parsedData.tagName = element.tagName;
        parsedData.className = element.className.replace(' parser-select', '').replace(' mouse-over', '');
        switch (parsedData.tagName) {
            case 'IMG':
                parsedData.content = this.parseImageContent(element as HTMLImageElement);
                break;
            case 'UL':
                parsedData.content = this.parseListContent(element as HTMLUListElement);
                break;
            case 'VIDEO':
                parsedData.content = element.dataset.hash;
                parsedData.tagName = 'IFRAME';
                parsedData.className = element.className.replace('news-parser-youtube', '').replace(' parser-select', '').replace(' mouse-over', '');
                break;
            default:
                parsedData.content = element.innerText;
        }
        parsedData.offsetTop = this.getOffsetTop(element);
        parsedData.parent = this.getParentsArray(element);
        const elementHash = hash(Math.random().toString());
        return {
            hash: elementHash.toString(),
            content: parsedData
        }
    }

    /**
     * Get offset top of element.
     * 
     * @param {object} element HTMLElement
     * @returns {number}
     */
    getOffsetTop(el: HTMLElement) {
        const bodyScrollTop = this.document ? this.document.body.scrollTop : 0;
        return el.getBoundingClientRect().top + bodyScrollTop;
    }

    /**
     * Get <img> tag data.
     * 
     * @param {object} el HTMLElement.
     * @returns {object}
     */
    parseImageContent(el: HTMLImageElement): ImageContent {
        const sourceTag: HTMLCollectionOf<HTMLSourceElement> | [] = el.parentElement ? el.parentElement.getElementsByTagName('source') : [];
        if (sourceTag.length == 0) {
            return {
                src: el.src,
                srcSet: el.srcset,
                sizes: el.sizes,
                alt: el.alt
            }
        }
        return {
            src: sourceTag[0].src !== '' ? el.src : sourceTag[0].src,
            srcSet: sourceTag[0].srcset,
            sizes: sourceTag[0].sizes,
            alt: el.alt
        }

    }

    /**
     * Get <ul> tag data.
     * 
     * @param {object} el HTMLElement
     * @returns {array} of inner text of list item elements
     */
    parseListContent(el: HTMLUListElement): string[] {
        const liCollection: HTMLCollectionOf<HTMLLIElement> = el.getElementsByTagName('li');
        if (!liCollection.length) return [];
        return Array.from(liCollection).map((item) => item.innerText)
    }

    /**
     * Get array of element parents.
     * 
     * @param {object} el HTMLElement
     * @returns {array} of HTMLElemnts
     */
    getParentsArray(el: HTMLElement) {
        let {parentElement} = el;
            const parent = [];
        while (parentElement !== null) {
            if (parentElement.className) {
                parent.push({
                    className: parentElement.className,
                    tagName: parentElement.tagName
                })
            }
            if (parentElement.tagName === 'BODY') {
                break;
            }
            parentElement = parentElement.parentElement;
        }
        return parent;
    }
}