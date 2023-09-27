import { hash } from '@news-parser/helpers/index';
import { ImageContent, ParsedData } from 'types/sidebarTemplate';
import { ParsedElementData, ParserInterface } from './types';
/**
 * Get HTML element data.
 * 
 * @since 1.0.0
 */
export class Parser implements ParserInterface {
    protected document: Document | undefined;
    protected iframe: HTMLIFrameElement;
    constructor(frameElement: HTMLIFrameElement) {
        this.iframe=frameElement;
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
        let tagName = element.tagName;
        let className = element.className.replace(' parser-select', '').replace(' mouse-over', '');
        let content;
        switch (tagName) {
            case 'IMG':
                content = this.parseImageContent(element as HTMLImageElement);
                break;
            case 'UL':
                content = this.parseListContent(element as HTMLUListElement);
                break;
            case 'VIDEO':
                content = element.dataset.hash;
                tagName = 'IFRAME';
                className = element.className.replace('news-parser-youtube', '').replace(' parser-select', '').replace(' mouse-over', '');
                break;
            default:
                content = element.innerText;
        }
        let offsetTop = this.getOffsetTop(element);
        let parent = this.getParentsArray(element);
        const elementHash = hash(Math.random().toString());
        return {
            hash: elementHash.toString(),
            content: {
                content,
                tagName,
                className,
                offsetTop,
                parent
            }
        } as ParsedElementData
    }

    /**
     * Get offset top of element.
     * 
     * @param {object} element HTMLElement
     * @returns {number}
     */
    getOffsetTop(el: HTMLElement) {
        const bodyScrollTop = this.iframe.contentWindow ? this.iframe.contentWindow.scrollY : 0;
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
            let src=el.srcset?this.getSrcFromSrcSet(el.srcset):el.src;
            return {
                src,
                srcSet: el.srcset,
                sizes: el.sizes,
                alt: el.alt
            }
        }
        let src=sourceTag[0].srcset?this.getSrcFromSrcSet(sourceTag[0].srcset):sourceTag[0].src !== '' ? el.src : sourceTag[0].src
        return {
            src,
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
    /**
     * Get src from srcset
     * 
     * @param {string} srcSet
     * @param {number} index
     */
    protected getSrcFromSrcSet(srcSet: string, index: number = -2): string {
        const srcSetArr: Array<string> = srcSet.split(',');
        if (srcSetArr.length <= Math.abs(index)) throw new Error('Given index in greater then number of srcset breakpoints');
        const srcMediaElement = srcSetArr.at(index)
        if (srcMediaElement !== undefined) return srcMediaElement.trim().replace(/\s.*w/, '');
        return '';
    }
}