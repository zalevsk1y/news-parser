var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { LocalizeContext } from './LocalizeContext';

export function withLocalize(WrappedComponent) {
  var LocalizedComponent = function (_Component) {
    _inherits(LocalizedComponent, _Component);

    function LocalizedComponent() {
      _classCallCheck(this, LocalizedComponent);

      return _possibleConstructorReturn(this, (LocalizedComponent.__proto__ || Object.getPrototypeOf(LocalizedComponent)).apply(this, arguments));
    }

    _createClass(LocalizedComponent, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return React.createElement(
          LocalizeContext.Consumer,
          null,
          function (context) {
            return React.createElement(WrappedComponent, _extends({}, context, _this2.props));
          }
        );
      }
    }]);

    return LocalizedComponent;
  }(Component);

  hoistNonReactStatic(LocalizedComponent, WrappedComponent);
  return LocalizedComponent;
}