import { getPluginDirUrl } from "@news-parser/helpers";
/**
 * Find and replace YouTube frames? replacing with video tag that contains data-hash attr with youtube hash data.
 *
 * @param {string} html
 * @returns {string} modified html
 */
export default function replaceYouTubeFrames(html) {
  const hashPattern = /\<iframe.*?src\=[\"\'].*?youtube\.com\/embed\/(.*?)[?\"\'].*?<\/iframe>/g,
    publicPathToYoutubePoster =
      getPluginDirUrl() + "/public/images/youtube-video.jpeg";
  return html.replace(
    hashPattern,
    `<video class="news-parser-youtube" poster=${publicPathToYoutubePoster} data-hash="$1"`
  );
}
