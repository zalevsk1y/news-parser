'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalizeContext = exports.getContextPropsFromState = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactContext = require('create-react-context');

var _createReactContext2 = _interopRequireDefault(_createReactContext);

var _reselect = require('reselect');

var _localize = require('./localize');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dispatchInitialize = function dispatchInitialize(dispatch) {
  return function (payload) {
    return dispatch((0, _localize.initialize)(payload));
  };
};


var dispatchAddTranslation = function dispatchAddTranslation(dispatch) {
  return function (translation) {
    return dispatch((0, _localize.addTranslation)(translation));
  };
};

var dispatchAddTranslationForLanguage = function dispatchAddTranslationForLanguage(dispatch) {
  return function (translation, language) {
    return dispatch((0, _localize.addTranslationForLanguage)(translation, language));
  };
};

var dispatchSetActiveLanguage = function dispatchSetActiveLanguage(dispatch) {
  return function (languageCode) {
    return dispatch((0, _localize.setActiveLanguage)(languageCode));
  };
};

var getContextPropsFromState = exports.getContextPropsFromState = function getContextPropsFromState(dispatch) {
  return (0, _reselect.createSelector)(_localize.getTranslate, _localize.getLanguages, _localize.getActiveLanguage, _localize.getOptions, function (translate, languages, activeLanguage, options) {
    var defaultLanguage = options.defaultLanguage || languages[0] && languages[0].code;
    var renderToStaticMarkup = options.renderToStaticMarkup;
    var ignoreTranslateChildren = options.ignoreTranslateChildren !== undefined ? options.ignoreTranslateChildren : _localize.defaultTranslateOptions.ignoreTranslateChildren;

    return {
      translate: translate,
      languages: languages,
      defaultLanguage: defaultLanguage,
      activeLanguage: activeLanguage,
      initialize: dispatchInitialize(dispatch),
      addTranslation: dispatchAddTranslation(dispatch),
      addTranslationForLanguage: dispatchAddTranslationForLanguage(dispatch),
      setActiveLanguage: dispatchSetActiveLanguage(dispatch),
      renderToStaticMarkup: renderToStaticMarkup,
      ignoreTranslateChildren: ignoreTranslateChildren
    };
  });
};

var defaultLocalizeState = (0, _localize.localizeReducer)(undefined, {});
var defaultContext = getContextPropsFromState(function () {})(defaultLocalizeState);

var LocalizeContext = exports.LocalizeContext = (0, _createReactContext2.default)(defaultContext);