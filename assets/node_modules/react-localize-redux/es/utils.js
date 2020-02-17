function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from 'react';
import { defaultTranslateOptions } from './localize';


export var getLocalizedElement = function getLocalizedElement(options) {
  var translation = options.translation,
      data = options.data,
      renderInnerHtml = options.renderInnerHtml;


  var translatedValueOrArray = templater(translation, data);

  // if result of templater is string, do the usual stuff
  if (typeof translatedValueOrArray === 'string') {
    return renderInnerHtml === true && hasHtmlTags(translatedValueOrArray) ? React.createElement('span', {
      dangerouslySetInnerHTML: { __html: translatedValueOrArray }
    }) : translatedValueOrArray;
  }

  // at this point we know we have react components;
  // check if there are HTMLTags in the translation (not allowed)
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = translatedValueOrArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var portion = _step.value;

      if (typeof portion === 'string' && hasHtmlTags(portion)) {
        warning('HTML tags in the translation string are not supported when passing React components as arguments to the translation.');
        return '';
      }
    }

    // return as Element
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return React.createElement.apply(React, ['span', null].concat(_toConsumableArray(translatedValueOrArray)));
};

export var hasHtmlTags = function hasHtmlTags(value) {
  var pattern = /(&[^\s]*;|<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>)/;
  return value.search(pattern) >= 0;
};

/**
 * @func templater
 * @desc A poor mans template parser
 * @param {string} strings The template string
 * @param {object} data The data that should be inserted in template
 * @return {string} The template string with the data merged in
 */
export var templater = function templater(strings) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!strings) return '';

  // ${**}
  // brackets to include it in the result of .split()
  var genericPlaceholderPattern = '(\\${\\s*[^\\s}]+\\s*})';

  // split: from 'Hey ${name}' -> ['Hey', '${name}']
  // filter: clean empty strings
  // map: replace ${prop} with data[prop]
  var splitStrings = strings.split(new RegExp(genericPlaceholderPattern, 'gmi')).filter(function (str) {
    return !!str;
  }).map(function (templatePortion) {
    var matched = void 0;
    for (var prop in data) {
      if (matched) break;
      var pattern = '\\${\\s*' + prop + '\\s*}';
      var regex = new RegExp(pattern, 'gmi');
      if (regex.test(templatePortion)) matched = data[prop];
    }
    if (typeof matched === 'undefined') return templatePortion;
    return matched;
  });

  // if there is a React element, return as array
  if (splitStrings.some(function (portion) {
    return React.isValidElement(portion);
  })) {
    return splitStrings;
  }

  // otherwise concatenate all portions into the translated value
  return splitStrings.reduce(function (translated, portion) {
    return translated + ('' + portion);
  }, '');
};

export var getIndexForLanguageCode = function getIndexForLanguageCode(code, languages) {
  return languages.map(function (language) {
    return language.code;
  }).indexOf(code);
};

export var objectValuesToString = function objectValuesToString(data) {
  return !Object.values ? Object.keys(data).map(function (key) {
    return data[key].toString();
  }).toString() : Object.values(data).toString();
};

export var validateOptions = function validateOptions(options) {
  if (options.onMissingTranslation !== undefined && typeof options.onMissingTranslation !== 'function') {
    throw new Error('react-localize-redux: an invalid onMissingTranslation function was provided.');
  }

  if (options.renderToStaticMarkup !== false && typeof options.renderToStaticMarkup !== 'function') {
    throw new Error('\n      react-localize-redux: initialize option renderToStaticMarkup is invalid.\n      Please see https://ryandrewjohnson.github.io/react-localize-redux-docs/#initialize.\n    ');
  }

  return options;
};

export var getTranslationsForLanguage = function getTranslationsForLanguage(language, languages, translations) {
  // no language! return no translations
  if (!language) {
    return {};
  }

  var languageCode = language.code;

  var languageIndex = getIndexForLanguageCode(languageCode, languages);
  var keys = Object.keys(translations);
  var totalKeys = keys.length;
  var translationsForLanguage = {};

  for (var i = 0; i < totalKeys; i++) {
    var key = keys[i];
    translationsForLanguage[key] = translations[key][languageIndex];
  }

  return translationsForLanguage;
};

export var storeDidChange = function storeDidChange(store, onChange) {
  var currentState = void 0;

  function handleChange() {
    var nextState = store.getState();
    if (nextState !== currentState) {
      onChange(currentState);
      currentState = nextState;
    }
  }

  var unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};

export var getSingleToMultilanguageTranslation = function getSingleToMultilanguageTranslation(language, languageCodes, flattenedTranslations, existingTranslations) {
  var languageIndex = languageCodes.indexOf(language);
  var translations = languageIndex >= 0 ? flattenedTranslations : {};
  var keys = Object.keys(translations);
  var totalKeys = keys.length;
  var singleLanguageTranslations = {};

  var _loop = function _loop(i) {
    var key = keys[i];
    // loop through each language, and for languages that don't match languageIndex
    // keep existing translation data, and for languageIndex store new translation data
    var translationValues = languageCodes.map(function (code, index) {
      var existingValues = existingTranslations[key] || [];

      return index === languageIndex ? flattenedTranslations[key] : existingValues[index];
    });

    singleLanguageTranslations[key] = translationValues;
  };

  for (var i = 0; i < totalKeys; i++) {
    _loop(i);
  }

  return singleLanguageTranslations;
};

export var get = function get(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var pathArr = path.split('.').filter(Boolean);
  return pathArr.reduce(function (ret, key) {
    return ret && ret[key] ? ret[key] : defaultValue;
  }, obj);
};

// Thanks react-redux for utility function
// https://github.com/reactjs/react-redux/blob/master/src/utils/warning.js
export var warning = function warning(message) {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }

  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {}
};