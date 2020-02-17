'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Translate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localize = require('./localize');

var _utils = require('./utils');

var _LocalizeContext = require('./LocalizeContext');

var _withLocalize = require('./withLocalize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WrappedTranslate = function (_React$Component) {
  _inherits(WrappedTranslate, _React$Component);

  function WrappedTranslate() {
    _classCallCheck(this, WrappedTranslate);

    return _possibleConstructorReturn(this, (WrappedTranslate.__proto__ || Object.getPrototypeOf(WrappedTranslate)).apply(this, arguments));
  }

  _createClass(WrappedTranslate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addDefaultTranslation();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var idChanged = this.props.id && prevProps.id !== this.props.id;

      var noDefaultLanguage = !(0, _utils.get)(prevProps, 'context.defaultLanguage') && !(0, _utils.get)(prevProps, 'options.language');
      var incomingLanguage = (0, _utils.get)(this.props, 'context.defaultLanguage') || (0, _utils.get)(this.props, 'options.language');

      var defaultLanguageSet = noDefaultLanguage && incomingLanguage;

      if (idChanged || defaultLanguageSet) {
        this.addDefaultTranslation();
      }
    }
  }, {
    key: 'addDefaultTranslation',
    value: function addDefaultTranslation() {
      var _props = this.props,
          context = _props.context,
          id = _props.id,
          children = _props.children,
          _props$options = _props.options,
          options = _props$options === undefined ? {} : _props$options;

      var defaultLanguage = options.language || context.defaultLanguage;
      var fallbackRenderToStaticMarkup = function fallbackRenderToStaticMarkup(value) {
        return value;
      };
      var renderToStaticMarkup = context.renderToStaticMarkup || fallbackRenderToStaticMarkup;
      var hasId = id !== undefined;
      var hasDefaultLanguage = defaultLanguage !== undefined;
      var hasChildren = children !== undefined;
      var hasFunctionAsChild = typeof children === 'function';

      var ignoreTranslateChildren = options.ignoreTranslateChildren !== undefined ? options.ignoreTranslateChildren : context.ignoreTranslateChildren;

      var isValidDefaultTranslation = hasChildren && hasId && hasDefaultLanguage;

      var shouldAddDefaultTranslation = isValidDefaultTranslation && !hasFunctionAsChild && !ignoreTranslateChildren;

      if (shouldAddDefaultTranslation) {
        var translation = renderToStaticMarkup(children);
        context.addTranslationForLanguage && context.addTranslationForLanguage(_defineProperty({}, id, translation), defaultLanguage);
      }
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _props2 = this.props,
          context = _props2.context,
          _props2$id = _props2.id,
          id = _props2$id === undefined ? '' : _props2$id,
          options = _props2.options,
          data = _props2.data;


      return typeof this.props.children === 'function' ? this.props.children(context) : context.translate && context.translate(id, data, options);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderChildren();
    }
  }]);

  return WrappedTranslate;
}(React.Component);

var Translate = exports.Translate = function Translate(props) {
  return React.createElement(
    _LocalizeContext.LocalizeContext.Consumer,
    null,
    function (context) {
      return React.createElement(WrappedTranslate, _extends({}, props, { context: context }));
    }
  );
};