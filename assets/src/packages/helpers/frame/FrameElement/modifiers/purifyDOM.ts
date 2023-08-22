import DOMPurify from "dompurify";
/**
 * Function modifier facade for DOMPurify module.
 * Remove unsafe tags and attributes.
 *
 * @since 1.0.3
 * @see https://github.com/cure53/DOMPurify
 *
 * @param {string} html string that needs to be purified
 * @returns {string} html that was cleared from unsafe tags and attributes
 */
export default function purifyDOM(html:string):string {
  return DOMPurify.sanitize(html, {
    ADD_TAGS: ["link", "meta"],
    ADD_ATTR: ["property", "content"],
    WHOLE_DOCUMENT: true,
    ALLOW_UNKNOWN_PROTOCOLS: true,
  });
}
