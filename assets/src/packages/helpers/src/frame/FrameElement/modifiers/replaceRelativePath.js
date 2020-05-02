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
  constructor(document, url) {
    this.document = document;
    this.url = url;
  }
  /**
   *
   * @param {array} tagNamesArray
   */
  replace(tagNamesArray) {
    const publicPathPrefix = this.getDomainFromUrl(this.url);
    if (!publicPathPrefix) return;
    tagNamesArray.forEach((tagName) => {
      const tagsList = this.document.getElementsByTagName(tagName);
      for (const el of tagsList) {
        var attrName;
        switch (tagName) {
          case "link":
            attrName = "href";
            break;
          case "img":
            attrName = ["src", "srcset"];
        }
        this.replacePath(el, attrName, publicPathPrefix);
      }
    });
  }
  /**
   *
   * @param {object} el HTML element
   * @param {string|array} attr attribute names
   * @param {string} publicPathPrefix  public path absolute prefix
   */
  replacePath(el, attr, publicPathPrefix) {
    const replaceAttr = (attr) => {
      if (!el.hasAttribute(attr)) return;
      const attrValue = el.getAttribute(attr).split(","),
        modifiedAttrValue = attrValue
          .map((value) =>
            value.search(/^(http|https|www)/i) === 0
              ? value
              : value.search(/^\//) !== 0
              ? publicPathPrefix + "/" + value
              : publicPathPrefix + value
          )
          .join(",");

      el.setAttribute(attr, modifiedAttrValue);
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
  getDomainFromUrl(url) {
    const pattern = /(^(http:\/\/|https\:\/\/).*?\/)/i,
      matches = url.match(pattern);
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
export default function replaceRelativePath(frame, url) {
  const document = frame.contentWindow.document;
  new ReplaceRelativePath(document, url).replace(["link", "img"]);
}
