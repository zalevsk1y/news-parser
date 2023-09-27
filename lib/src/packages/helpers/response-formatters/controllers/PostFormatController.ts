import { PostData, ParsedData, ImageContent, ImageElement } from 'types/sidebarTemplate';
import { TemplateOptions, TemplatePostOptions } from 'types/template';
import { escHTML, escURLRaw } from '../../index';
import { PostFormatControllerInterface } from '../types/postFromatController';
import { AdapterInterface } from '../types/adapter';
import { ContentArrayModifier, ContenStringModifier } from '../types/modifier';

/**
 * Format data for request to create wordpress post draft.
 * 
 * @since 1.0.0
 */
export class PostFormatController implements PostFormatControllerInterface {

    protected content: Array<ParsedData>;
    protected contentModifierBeforConvert: Array<ContentArrayModifier> = [];
    protected contentModifierAfterConvert: Array<ContenStringModifier> = [];
    constructor(protected postData: PostData, protected options: Partial<TemplatePostOptions> & TemplateOptions, protected url: string, protected adapter: AdapterInterface) {
        this.content = this.sortByOffset(this.postData.body);
    }

    /**
     * Format request to create post draft.
     * 
     * @param {object} postData 
     * @param {object} options 
     * @param {string} url 
     * @returns post data
     */
    public generateWpPostData() {
        const modifiedContentArray = this.applyContentModifiersBefor(this.content);
        const contentString = this.convertPostContentToString(modifiedContentArray);
        const modifiedContentString = this.applyContentModifiersAfter(contentString)
        return {
            title: this.postData.title,
            content: modifiedContentString,
            ...this.options
        }
    }
    public addContentModiersBeforConversion(modifiers: Array<ContentArrayModifier> | ContentArrayModifier) {
        this.contentModifierBeforConvert = this.contentModifierBeforConvert.concat(modifiers);
    }
    public addContentModiersAfterConversion(modifiers: Array<ContenStringModifier> | ContenStringModifier) {
        this.contentModifierAfterConvert = this.contentModifierAfterConvert.concat(modifiers);
    }
    protected applyContentModifiersBefor(content: Array<ParsedData>) {
        return this.contentModifierBeforConvert.reduce((contentArray, modifier) => modifier(contentArray), content)
    }
    protected applyContentModifiersAfter(content: string) {
        return this.contentModifierAfterConvert.reduce((contentString, modifier) => modifier(contentString), content)
    }
    /**
     * Format parsed data.
     * 
     * @param {object} content 
     * @return {string}
     */
    protected convertPostContentToString(postContentElementsArray: Array<ParsedData>): string {

        let contentOutput = '';
        postContentElementsArray.forEach(contentElement => {
            switch (contentElement.tagName) {
                case 'SPAN':
                    contentOutput += this.simpleText(contentElement.content);
                    break;
                case 'DIV':
                case 'P':
                    contentOutput += this.paragraph(contentElement.content);
                    break;
                case 'IMG':
                    contentOutput += this.image(contentElement.content);
                    break;
                case 'H1':
                case 'H2':
                case 'H3':
                    contentOutput += this.heading(contentElement.content, contentElement.tagName.toLowerCase());
                    break;
                case 'UL':
                    contentOutput += this.list(contentElement.content);
                    break;
                case 'IFRAME':
                    contentOutput += this.youtubeVideo(contentElement.content);
                    break;
                case 'IMGROW':
                    contentOutput += this.imageRow(contentElement.content);
            }
        })
        return contentOutput;
    }


    /**
     * Format text content.
     * 
     * @param {string} text 
     */
    protected simpleText(text: ParsedData['content']): string {
        const cleanContent = this.sanitize(text);
        return cleanContent;
    }

    /**
     * Format youtube video as video block.
     * 
     * @param {string} hash Youtube video hash
     * @returns {string}
     */
    protected youtubeVideo(hash: ParsedData['content']): string {
        if (typeof hash !== 'string') return ''
        const cleanHash = hash.replace(/[^0-9a-zA-Z\_]/g, '');
        return this.adapter.youtubeVideo(cleanHash);
    }

    /**
     * Format paragraph tag data to gutenberg paragraph block data.
     * 
     * @param {string} text 
     * @returns {string}
     */
    protected paragraph(text: ParsedData['content']): string {
        if (typeof text !== 'string') return ''
        return this.adapter.paragraph(this.sanitize(text));
    }

    /**
     * Format heading tag data to gutenberg heading block.
     * 
     * @param {string} text 
     * @param {string} type 
     * @returns {string}
     */
    protected heading(text: ParsedData['content'], type: string): string {
        if (typeof text !== 'string' || typeof 'type' !== 'string') return ''
        return this.adapter.heading(this.sanitize(text), this.sanitize(type));
    }
    protected imageRow(imageContent: Array<ImageElement>): string {
        if (imageContent === undefined) return '';
        const covertImage = this.image.bind(this);
        const imagesString = imageContent.map(imageElement => covertImage(imageElement['content'])) as [string, string]
        return this.adapter.groupRow(imagesString);
    }
    /**
     * Format image tag data to gutenberg image block. 
     * 
     * @param {ImageContent} imageContent 
     * @returns {string}
     */
    protected image(imageContent: ParsedData['content']): string {
        if (typeof imageContent === 'string' || Array.isArray(imageContent) || imageContent == undefined) return '';
        const { src, srcSet, alt, sizes } = imageContent;
        const cleanSrc = src ? this.sanitize(src) : this.sanitize(src);
        const cleanSrcSet = srcSet !== undefined ? this.sanitize(srcSet) : srcSet;
        const cleanAlt = this.sanitize(alt);
        return this.adapter.image({ src: cleanSrc, alt: cleanAlt, srcSet: cleanSrcSet, sizes })
    }

    /**
     * Format list tag data to gutenberg list block. 
     * 
     * @param {array} listArray 
     * @returns {string}
     */
    protected list(listArray: ParsedData['content']): string {
        if (!Array.isArray(listArray)) return '';
        const sinitize = this.sanitize;
        return this.adapter.list(listArray.map(item => sinitize(item)))
    }

    /**
     * Format quote tag data to gutenberg quote block.
     * 
     * @param {string} text
     * @returns {string}  
     */
    protected quote(text: string): string {
        if (typeof text !== 'string') return '';
        const cleanContent = this.sanitize(text);
        return this.adapter.quote(cleanContent);
    }

    /**
     * Sort elements data by offset of the top of page.
     * 
     * @param {object} objectOfContent 
     * @returns {array}
     */
    protected sortByOffset(postData: PostData['body']): Array<ParsedData> {
        const sortedContent: Array<ParsedData> = [];
        const postDataMap: Map<string, ParsedData> = new Map(Object.entries(postData));
        while (true) {
            if (postDataMap.size === 0) break;
            const topElement: {
                hash: string,
                offsetTop: number
            } = {
                hash: '',
                offsetTop: 10 ** 10
            }
            postDataMap.forEach((item: ParsedData, hash: string) => {
                if (item.offsetTop < topElement.offsetTop) {
                    topElement.offsetTop = item.offsetTop;
                    topElement.hash = hash;
                }
            })
            const postData = postDataMap.get(topElement.hash);
            if (postData !== undefined) sortedContent.push(postData);
            postDataMap.delete(topElement.hash)
        }
        return sortedContent;
    }

    /**
     * Sanitize data.
     * 
     * @param {string} content 
     * @returns {string}
     */
    protected sanitize(content: ParsedData['content'] | ParsedData): string {
        if (typeof content !== 'string') return ''
        return escHTML(content);
    }

    /**
     * Sanitize url to insert into the link or src attributes.
     * 
     * @param {string} url 
     * @returns {string}
     */
    protected sanitizeUrl(url: string): string {
        return escURLRaw(url);
    }

    


}