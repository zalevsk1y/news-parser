/**
 * Class provide methods to modify html as a string.
 *
 * @since 1.0.3
 */
export default class HtmlAsString {
  /**
   * Constructor function.
   *
   * @param {string} html
   */
  constructor(html) {
    if (html === undefined)
      throw Error("HTML  string argument could not be undefined.");
    this.html=html;
  
  }
  /**
   * Add array of modify functions. Facade method for reduce() method.
   * Modifiers should accept html string as argument and return modified string.
   *
   * @param {array} arrayOfModifiers
   * @returns {object} this for chaining.
   */
  addModifiers(arrayOfModifiers) {
    this.html = arrayOfModifiers.reduce(
      (modifiedData, modifier) => modifier.call(this, modifiedData),
      this.html
    );
    return this;
  }
}

export const htmlAsString = (html) =>  new HtmlAsString(html);
