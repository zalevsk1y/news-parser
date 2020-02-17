'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalizeProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _localize = require('./localize');

var _LocalizeContext = require('./LocalizeContext');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalizeProvider = exports.LocalizeProvider = function (_Component) {
  _inherits(LocalizeProvider, _Component);

  function LocalizeProvider(props) {
    _classCallCheck(this, LocalizeProvider);

    var _this = _possibleConstructorReturn(this, (LocalizeProvider.__proto__ || Object.getPrototypeOf(LocalizeProvider)).call(this, props));

    var dispatch = _this.props.store ? _this.props.store.dispatch : _this.dispatch.bind(_this);

    _this.getContextPropsSelector = (0, _LocalizeContext.getContextPropsFromState)(dispatch);

    var initialState = _this.props.initialize !== undefined ? (0, _localize.localizeReducer)(undefined, {
      type: _localize.INITIALIZE,
      payload: _this.props.initialize
    }) : (0, _localize.localizeReducer)(undefined, {});

    _this.state = {
      localize: initialState
    };
    return _this;
  }

  _createClass(LocalizeProvider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initExternalStore();
      this.subscribeToExternalStore();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribeFromStore && this.unsubscribeFromStore();
    }
  }, {
    key: 'initExternalStore',
    value: function initExternalStore() {
      var _props = this.props,
          store = _props.store,
          initialize = _props.initialize;

      if (store && initialize) {
        store.dispatch((0, _localize.initialize)(initialize));
      }
    }
  }, {
    key: 'subscribeToExternalStore',
    value: function subscribeToExternalStore() {
      var store = this.props.store;

      if (store) {
        this.unsubscribeFromStore = (0, _utils.storeDidChange)(store, this.onStateDidChange.bind(this));
      }
    }
  }, {
    key: 'onStateDidChange',
    value: function onStateDidChange(prevState) {
      if (!this.props.store) {
        return;
      }
      var getState = this.props.getState || function (state) {
        return state.localize;
      };

      var prevLocalizeState = prevState && getState(prevState);
      var curLocalizeState = getState(this.props.store.getState());

      var prevActiveLanguage = prevState && (0, _localize.getActiveLanguage)(prevLocalizeState);
      var curActiveLanguage = (0, _localize.getActiveLanguage)(curLocalizeState);

      var prevOptions = prevState && (0, _localize.getOptions)(prevLocalizeState);
      var curOptions = (0, _localize.getOptions)(curLocalizeState);

      var prevTranslations = prevState && (0, _localize.getTranslationsForActiveLanguage)(prevLocalizeState);
      var curTranslations = (0, _localize.getTranslationsForActiveLanguage)(curLocalizeState);

      var hasActiveLangaugeChanged = (prevActiveLanguage && prevActiveLanguage.code) !== (curActiveLanguage && curActiveLanguage.code);
      var hasOptionsChanged = prevOptions !== curOptions;
      var hasTranslationsChanged = prevTranslations !== curTranslations;

      if (hasActiveLangaugeChanged || hasOptionsChanged || hasTranslationsChanged) {
        this.setState({ localize: curLocalizeState });
      }
    }
  }, {
    key: 'dispatch',
    value: function dispatch(action) {
      this.setState(function (prevState) {
        return {
          localize: (0, _localize.localizeReducer)(prevState.localize, action)
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      this.contextProps = this.getContextPropsSelector(this.state.localize);

      return _react2.default.createElement(
        _LocalizeContext.LocalizeContext.Provider,
        { value: this.contextProps },
        this.props.children
      );
    }
  }]);

  return LocalizeProvider;
}(_react.Component);