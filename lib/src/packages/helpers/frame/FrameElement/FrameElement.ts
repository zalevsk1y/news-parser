import { FrameModifier, FrameArrayOfEvents, FrameEventElement, FrameMiddleware, FrameElementInterface } from "./types";

/**
 * Class provide methods to modify elements in frame DOM.
 *
 * @since 1.0.3
 */
export default class FrameElement implements FrameElementInterface {
  protected waitForRun!: Array<() => void>;

  protected isReady: boolean = true;

  protected arrayOfEvents!: FrameArrayOfEvents

  /**
   * Constructor function.
   *
   * @param {object} frame
   * @param {sting} url
   */
  constructor(protected frame: HTMLIFrameElement, protected url: string) {
    if (frame === undefined)
      throw Error("Frame element  argument could not be undefined.");
  }

  /**
   * Add array of modify functions. Facade method for forEach() method.
   * Modifiers should accept reference to HTMLElement frame as first argument and url of original page
   * as a second.
   *
   * @param {array} arrayOfModifiers
   * @returns {FrameElement} this for chaining.
   */
  public runMiddleware(arrayOfMiddleware: Array<FrameMiddleware>) {
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
   * @param {sting} modifiers
   * @returns {FrameElement} this for chaining.
   */
  public injectHTML(html: string, modifiers: Array<FrameModifier>) {
    const document = this.frame.contentWindow?.document;
      const modifiedHTML = this.addModifiers(html, modifiers);
    if (document === undefined) return this
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
   * @returns {FrameElement} this for chaining.
   */
  public injectCSS(options: {
    tag: string,
    href: string,
    parent: string
  }) {
    const document = this.frame.contentWindow?.document;
    if (document === undefined) return this;
    const run = () => {
      let cssLink;
      switch (options.tag) {
        case "link":
          cssLink = document.createElement("link");
          cssLink.href = options.href;
          cssLink.rel = "stylesheet";
          cssLink.type = "text/css";
      }
      const parentElement = document.querySelector(options.parent)
      if (parentElement !== null && cssLink !== undefined) parentElement.appendChild(cssLink);
    };
    this.runMethodWhenReady(run);
    return this;
  }

  /**
   * Add events to frame document.
   *
   * @param {array} arrayOfEvents
   * @returns {FrameElement} this for chaining.
   */
  public bindEvents(arrayOfEvents: FrameArrayOfEvents) {
    const document = this.frame.contentWindow?.document;
    if (document === undefined) return this;
    this.arrayOfEvents = arrayOfEvents;
    arrayOfEvents.forEach((event: FrameEventElement) => {
      document.addEventListener(event[0], event[1]);
    });
    return this;
  }

  /**
   * Remove events from frame document.
   */
  protected unbindEvents() {
    const document = this.frame.contentWindow?.document;
    if (document === undefined) return this;
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
  public addModifiers(html: string, arrayOfModifiers: Array<FrameModifier>) {
    const modifiedHtml = arrayOfModifiers.reduce(
      (modifiedData, modifier) => modifier.call(this, modifiedData),
      html
    );
    return modifiedHtml;
  }

  /**
   * Run methods that wait for DOMContent is load.
   */
  protected runMethodsThatWaits() {
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
  public runMethodWhenReady(callback: () => void) {
    if (this.isReady) {
      callback.call(this);
    } else {
      this.waitForRun.push(callback);
    }
    return this;
  }

  /**
   * Set DOMContentLoaded event listener that will run all callbacks that wait for it.
   */
  protected waitForDOMContentLoaded() {
    const document = this.frame.contentWindow?.document;
    if (document === undefined) return;
    const callback = () => {
      this.isReady = true;
      this.runMethodsThatWaits();
      document.removeEventListener(
        "DOMContentLoaded",
        callback
      );
    };
    document.addEventListener(
      "DOMContentLoaded",
      callback
    );
  }

  /**
   * Run methods before remove frame.
   *
   * @param {array} runBeforeShutDown
   */
  public shutDown(runBeforeShutDown?: Array<FrameMiddleware>) {
    if (runBeforeShutDown !== undefined) runBeforeShutDown.forEach((callback) => callback.call(this, this.frame))
    this.unbindEvents();
    this.injectHTML('<html></html>',[]);
  }
}

export const frameElement = (frameElementRef: HTMLIFrameElement, url: string) => new FrameElement(frameElementRef, url);
