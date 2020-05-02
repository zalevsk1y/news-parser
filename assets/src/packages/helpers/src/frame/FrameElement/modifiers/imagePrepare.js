import { imageParser } from "../../../parser/ImageParser";
/**
 * Facade function for ImageParser.replaceImageSrc().
 * Replace src path of <img> tags to srcset maximum width path.
 *
 * @since 1.0.3
 * @param {object} frame frame HTML element reference.
 */
export default function imagePrepare(frame) {
  const document = frame.contentWindow.document;
  imageParser(document).replaceImageSrc(true);
}
