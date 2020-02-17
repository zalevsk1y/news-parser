import React from 'react';
import createReactContext from 'create-react-context';
import { createSelector } from 'reselect';
import { defaultTranslateOptions } from './localize';
import { localizeReducer, getTranslate, initialize, addTranslation, addTranslationForLanguage, setActiveLanguage, getLanguages, getActiveLanguage, getOptions } from './localize';

var dispatchInitialize = function dispatchInitialize(dispatch) {
  return function (payload) {
    return dispatch(initialize(payload));
  };
};

var dispatchAddTranslation = function dispatchAddTranslation(dispatch) {
  return function (translation) {
    return dispatch(addTranslation(translation));
  };
};

var dispatchAddTranslationForLanguage = function dispatchAddTranslationForLanguage(dispatch) {
  return function (translation, language) {
    return dispatch(addTranslationForLanguage(translation, language));
  };
};

var dispatchSetActiveLanguage = function dispatchSetActiveLanguage(dispatch) {
  return function (languageCode) {
    return dispatch(setActiveLanguage(languageCode));
  };
};

export var getContextPropsFromState = function getContextPropsFromState(dispatch) {
  return createSelector(getTranslate, getLanguages, getActiveLanguage, getOptions, function (translate, languages, activeLanguage, options) {
    var defaultLanguage = options.defaultLanguage || languages[0] && languages[0].code;
    var renderToStaticMarkup = options.renderToStaticMarkup;
    var ignoreTranslateChildren = options.ignoreTranslateChildren !== undefined ? options.ignoreTranslateChildren : defaultTranslateOptions.ignoreTranslateChildren;

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

var defaultLocalizeState = localizeReducer(undefined, {});
var defaultContext = getContextPropsFromState(function () {})(defaultLocalizeState);

export var LocalizeContext = createReactContext(defaultContext);