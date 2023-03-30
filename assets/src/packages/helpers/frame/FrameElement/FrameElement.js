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
    this.frame = frame;
    this.url = url;
    this.waitForRun = [];
    this.isReady = true;
  }
  /**
   * Add array of modify functions. Facade method for forEach() method.
   * Modifiers should accept reference to HTMLElement frame as first argument and url of original page
   * as a second.
   *
   * @param {array} arrayOfModifiers
   * @returns {object} this for chaining.
   */
  runMiddleware(arrayOfMiddleware) {
    const run = () => {
      arrayOfMiddleware.forEach((middleware) => middleware(this.frame));
    };
    this.runMethodWhenReady(run);
    return this;
  }
  /**
   * Writes string HTML into frame element.
   *
   * @param {sting} html
   * @returns {object} this for chaining.
   */
  injectHTML(html, modifiers) {
    const document = this.frame.contentWindow.document,
      modifiedHTML = this.addModifiers(html, modifiers);
    document.open();
    document.write(modifiedHTML);
    document.close();
    this.waitForDOMContentLoaded();
    return this;
  }
  /**
   * Inject css into frame element DOM.
   *
   * @param {object} options
   * @returns {object} this for chaining.
   */
  injectCSS(options) {
    const document = this.frame.contentWindow.document,
      run = () => {
        var cssLink;
        switch (options.tag) {
          case "link":
            cssLink = document.createElement("link");
            cssLink.href = options.href;
            cssLink.rel = "stylesheet";
            cssLink.type = "text/css";
        }
        document.querySelector(options.parent).appendChild(cssLink);
      };
    this.runMethodWhenReady(run);
    return this;
  }
  /**
   * Add events to frame document.
   *
   * @param {array} arrayOfEvents
   */
  bindEvents(arrayOfEvents) {
    const document = this.frame.contentWindow.document;
    this.arrayOfEvents = arrayOfEvents;
    arrayOfEvents.forEach((event) => {
      document.addEventListener(event[0], event[1]);
    });
    return this;
  }
  /**
   * Remove events from frame document.
   */
  unbindEvents() {
    const document = this.frame.contentWindow.document;
    if (this.arrayOfEvents !== undefined && Array.isArray(this.arrayOfEvents)) {
      this.arrayOfEvents.forEach((event) => {
        document.removeEventListener(event[0], event[1]);
      });
    }
  }
  /**
   * Add array of modify functions. Facade method for reduce() method.
   * Modifiers should accept html string as argument and return modified string.
   *
   * @param {string} html
   * @param {array} arrayOfModifiers
   * @returns {object} this for chaining.
   */
  addModifiers(html, arrayOfModifiers) {
    const modifiedHtml = arrayOfModifiers.reduce(
      (modifiedData, modifier) => modifier.call(this, modifiedData),
      html
    );
    return modifiedHtml;
  }
  /**
   * Run methods that wait for DOMContent is load.
   */
  runMethodsThatWaits() {
    this.waitForRun.forEach((fn) => {
      fn.call(this);
    });
    this.waitForRun = [];
  }
  /**
   * If DOMContent is loaded runs callback immediately,
   * if DOM is loading add method to queue(waitForRun).
   *
   *
   * @param {function} callback
   */
  runMethodWhenReady(callback) {
    if (this.isReady) {
      callback.call(this);
    } else {
      this.waitForRun.push(callback);
    }
  }
  /**
   * Set DOMContentLoaded event listener that will run all callbacks that wait for it.
   */
  waitForDOMContentLoaded() {
    const callback = () => {
      this.isReady = true;
      this.runMethodsThatWaits();
      this.frame.contentWindow.document.removeEventListener(
        "DOMContentLoaded",
        callback
      );
    };
    this.frame.contentWindow.document.addEventListener(
      "DOMContentLoaded",
      callback
    );
  }
  /**
   * Run methods before remove frame.
   *
   * @param {array} runBeforeShutDown
   */
  shutDown(runBeforeShutDown) {
    this.unbindEvents();
  }
}

export const frameElement = (frameElementRef, url) =>
  new FrameElement(frameElementRef, url);
