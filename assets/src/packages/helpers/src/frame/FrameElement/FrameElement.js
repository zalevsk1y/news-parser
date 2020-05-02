/**
 * Class provide methods to modify elements in frame DOM.
 *
 * @since 1.0.3
 */
export default class FrameElement {
  /**
   * Constructor function.
   *
   * @param {object} frame
   * @param {sting} url
   */
  constructor(frame, url) {
    if (frame === undefined)
      throw Error("Frame element  argument could not be undefined.");
    if (url === undefined) throw Error("url argument could not be undefined.");
    this.frame = frame;
    this.url=url
  }
  /**
   * Add array of modify functions. Facade method for forEach() method.
   * Modifiers should accept reference to HTMLElement frame as first argument and url of original page
   * as a second.
   *
   * @param {array} arrayOfModifiers
   * @returns {object} this for chaining.
   */
  addModifiers(arrayOfModifiers) {
    const runModifiers=()=>{
        arrayOfModifiers.forEach((modifier) =>
        modifier.call(this, this.frame, this.url)
      )
      this.frame.contentWindow.document.removeEventListener("DOMContentLoaded",runModifiers);
    }
   this.frame.contentWindow.document.addEventListener("DOMContentLoaded",runModifiers);

   
    return this;
  }
  /**
   * Writes string HTML into frame element.
   *  
   * @param {sting} html 
   * @returns {object} this for chaining.
   */
  injectHTML(html) {
    const document = this.frame.contentWindow.document;
    document.open();
    document.write(html);
    document.close();
    return this;
  }
  /**
   * Inject css into frame element DOM.
   * 
   * @param {object} options 
   * @returns {object} this for chaining.
   */
  injectCSS(options) {
    const document = this.frame.contentWindow.document;
    var cssLink;
    switch (options.tag) {
      case "link":
        cssLink = document.createElement("link");
        cssLink.href = options.href;
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
    }
    document.querySelector(options.parent).appendChild(cssLink);
    return this;
  }
}

export const frameElement=(frameElementRef,url)=>new FrameElement(frameElementRef,url)