"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _agenda = require("../../agenda.style");

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _HeaderMenu = _interopRequireDefault(require("./HeaderMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CalendarHeader = () => {
  const {
    settings
  } = (0, _react.useContext)(_StateContext.default);
  const {
    title
  } = settings;
  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    celled: true,
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_agenda.StyledGridColumn, {
    width: 10
  }, /*#__PURE__*/_react.default.createElement(_agenda.StyledSegment, {
    basic: true,
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_agenda.StyledHeader, {
    as: "h1"
  }, title.hasLogo ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Image, {
    src: title.logoPath
  }) : '', " ", title.isImage ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Image, {
    src: title.value,
    size: "small"
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, title.value)))), /*#__PURE__*/_react.default.createElement(_agenda.StyledGridColumn, {
    width: 6
  }, /*#__PURE__*/_react.default.createElement(_agenda.StyledSegment, {
    basic: true,
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_HeaderMenu.default, null))));
};

var _default = CalendarHeader;
exports.default = _default;