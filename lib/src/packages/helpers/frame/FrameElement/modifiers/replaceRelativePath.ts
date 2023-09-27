/**
 * Class replace relative path in tags attributes to absolute.
 *
 * @since 1.0.3
 */
export class ReplaceRelativePath {
  /**
   * Init function
   *
   * @param {object} document DOM document
   * @param {string} url url of the page
   */
  constructor(protected document:Document, protected url:string) {
   
  }

  /**
   *
   * @param {array} tagNamesArray
   */
  replace(tagNamesArray:Array<string>) {
    const publicPathPrefix = this.getDomainFromUrl(this.url);
    if (!publicPathPrefix) return;
    tagNamesArray.forEach((tagName) => {
      const tagsList = Array.from(this.document.getElementsByTagName(tagName));
      for (const el of tagsList) {  
        let attributeName;
        switch (tagName) {
          case "link":
            attributeName = "href";
            break;
          case "img":
            attributeName = ["src", "srcset"];
        }
        if(attributeName!==undefined) this.replacePath(el, attributeName, publicPathPrefix);
      }
    });
  }

  /**
   *
   * @param {object} el HTML element
   * @param {string|array} attr attribute names
   * @param {string} publicPathPrefix  public path absolute prefix
   */
  replacePath(el:Element, attr:string|Array<string>, publicPathPrefix:string) {
    const replaceAttr = (elementAttibuteName:string) => {
      if (!el.hasAttribute(elementAttibuteName)) return;
      const attrValue = el.getAttribute(elementAttibuteName);
      const modifiedAttrValue = attrValue!==null&&
        attrValue.split(",").map((value) =>
            value.search(/^(http|https|www)/i) === 0
              ? value
              : value.search(/^\//) !== 0
              ? `${publicPathPrefix  }/${  value}`
              : publicPathPrefix + value
          )
          .join(",");

          if(modifiedAttrValue) el.setAttribute(elementAttibuteName, modifiedAttrValue);
    };
    if (Array.isArray(attr)) {
      attr.forEach((attrName) => replaceAttr(attrName));
    } else {
      replaceAttr(attr);
    }
  }

  /**
   * Gets public path prefix.
   *
   * @param {string} url
   */
  getDomainFromUrl(url:string):string|false {
    const pattern = /(^(http:\/\/|https\:\/\/).*?\/)/i;
      const matches = url.match(pattern);
    return matches !== null ? matches[1].slice(0, -1) : false;
  }
}
/**
 * Facade function for ImageParser.replaceImageSrc().
 * Replace src path of <img> tags to srcset maximum width path.
 *
 * @since 1.0.3
 * @param {object} frame frame HTML element reference.
 */
export default function replaceRelativePath(frame:HTMLIFrameElement, url:string) {
  const document = frame.contentWindow?.document;
  if(document!==undefined)  (new ReplaceRelativePath(document, url)).replace(["link", "img"]);
}
