import React from "react";
import { getPluginDirUrl } from "@news-parser/helpers";
import { Parser } from "@news-parser/helpers/parser/Parser";
import { postTitleParser } from "@news-parser/helpers/parser/PostTitleParser";
import { featuredImageParser } from "@news-parser/helpers/parser/FeaturedImageParser";
// modifiers 
import purifyDOM from "@news-parser/helpers/frame/FrameElement/modifiers/purifyDOM";


import { frameElement } from "@news-parser/helpers/frame/FrameElement/FrameElement";
//actions
import {
  selectTitle,
  selectFeaturedMedia,
  selectContent,
  removeContent,
} from "../actions/parsedData.actions";
import { frameIsReady } from "../actions/dialogData.actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

/**
 * Frame element of visual constructor modal window. Allow choose parsing content manually.
 *
 * @since 1.0.0
 */
export class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.frameRef = React.createRef();
    this.clickHandler = this.clickHandler.bind(this);
    this.getTitle=this.getTitle.bind(this);
    this.getFeaturedMedia=this.getFeaturedMedia.bind(this)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data && this.props.data) {
      this.frame !== undefined && this.frame.shutDown();
      this.initFrame();
    }
  }
  componentDidMount() {
    this.props.data && this.initFrame();
  }
  /**
   * Write sanitized page html into iframe.
   */
  initFrame() {
    this.frame = frameElement(this.frameRef.current, this.props.url)
      .injectHTML(this.props.data, [purifyDOM])
      .injectCSS({
        parent: "head",
        tag: "link",
        href: getPluginDirUrl() + "/public/css/frame-style.css",
      })
      .bindEvents([
        ["mouseover", this.mouseOver],
        ["mouseout", this.mouseOut],
        ["click", this.clickHandler],
      ])
      .runMiddleware([
        this.getTitle,
        this.getFeaturedMedia,
        this.props.onReady,
      ]);
    this.parser = new Parser(this.frameRef);
  }

  /**
   * Get post title.
   *
   *  @extends postTitleParser.findTitle()
   *  @param {object} frameRef
   *
   */
  getTitle(frameRef) {
    const doc=frameRef.contentWindow.document,
      title = postTitleParser(doc).findTitle() || "No title";
    this.props.selectTitle(title);
  }
  /**
   * Get post featured.
   *
   * @extends FeaturedImageParser.findFeaturedImage()
   * @param {string} dom
   */
  getFeaturedMedia(frameRef) {
    const doc=frameRef.contentWindow.document,
      image = featuredImageParser(doc).findFeaturedImage();
    image !== false && this.props.selectFeaturedMedia(image);
  }

  /**
   * Event listener callback to highlight html elements when mouse is over them.
   *
   * @param {object} event
   */
  mouseOver(event) {
    const className = event.target.className;
    event.target.className = className + " mouse-over";
  }
  /**
   * Event listener callback to stop highlight html elements when mouse is left them.
   *
   * @param {object} event
   */
  mouseOut(event) {
    const className = event.target.className;
    event.target.className = className.replace(" mouse-over", "");
  }
  /**
   * Parse data from HTML element.
   *
   * @param {object} element HTMLElement.
   */
  parseElementData(element) {
    let { elementHash, parsedData } = this.parser.parseElementData(element);
    element.id = elementHash;
    this.props.selectContent(elementHash, parsedData);
  }
  /**
   * Remove parsed element data.
   *
   * @param {object} element HTMLElement.
   */
  removeSelectedElement(element) {
    const hash = element.id;
    hash && this.props.removeContent(hash);
  }
  /**
   * Select element on click.
   *
   * @param {object} event Event object
   */
  clickHandler(event) {
    event.preventDefault();
    const className = event.target.className,
      element = event.target;
    if (className.search(" parser-select") === -1) {
      element.className = className + " parser-select";
      this.parseElementData(element);
    } else {
      element.className = className.replace(" parser-select", "");
      this.removeSelectedElement(element);
    }
  }
  render() {
    return (
      <iframe id="visual-constructor" frameBorder="0" ref={this.frameRef}>
        {" "}
      </iframe>
    );
  }
}

function mapStateToProps(state) {
  const { rawHTML, url } = state.parse.dialog.visualConstructor.dialogData;
  return {
    data: rawHTML,
    url,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectTitle: function (title) {
      dispatch(selectTitle(title));
    },
    selectFeaturedMedia: function (url) {
      dispatch(selectFeaturedMedia(url));
    },
    selectContent: function (hash, content) {
      dispatch(selectContent(hash, content));
    },
    removeContent: function (hash) {
      dispatch(removeContent(hash));
    },
    frameIsReady: function () {
      dispatch(frameIsReady());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Frame);

Frame.propTypes = {
  /**
   * HTML data that should be write to the iFrame.
   */
  data: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  /**
   * Url of requested site.
   */
  url: PropTypes.string.isRequired,
  /**
   * Select title action.Set post title.
   *
   * @param {string} title Post title.
   */
  selectTitle: PropTypes.func.isRequired,
  /**
   * Select post featured image action.
   *
   * @param {string} url Image url.
   */
  selectFeaturedMedia: PropTypes.func.isRequired,
  /**
   * Select post content action.
   *
   * @param {string} hash Element hash used as key in data storage.
   * @param {string} content Element content.
   */
  selectContent: PropTypes.func.isRequired,
  /**
   * Remove selected content action.
   *
   * @param {string} hash Content key.
   */
  removeContent: PropTypes.func.isRequired,
  /**
   * Set Frame status as ready.
   */
  frameIsReady: PropTypes.func.isRequired,
};
