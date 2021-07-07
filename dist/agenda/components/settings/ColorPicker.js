"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactColor = require("react-color");

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _agenda = require("../../agenda.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ColorPicker = props => {
  const {
    color,
    setColor
  } = props;
  const {
    colors
  } = (0, _react.useContext)(_StateContext.default);
  const [displayPicker, setDisplayPicker] = (0, _react.useState)(false);

  const handleColorChange = color => {
    setColor(color.hex);
    setDisplayPicker(false);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_agenda.ColorButton, {
    backcolor: color,
    onClick: () => setDisplayPicker(value => !value),
    fluid: true
  }, color), displayPicker ? /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'absolute',
      zIndex: '2'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactColor.TwitterPicker, {
    color: color,
    colors: colors,
    onChange: handleColorChange
  })) : '');
};

var _default = ColorPicker;
exports.default = _default;