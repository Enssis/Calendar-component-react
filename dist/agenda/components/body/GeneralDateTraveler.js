"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//components
//context
const DateTraveler = props => {
  const {
    addType,
    daysMove,
    last,
    next,
    actual
  } = props;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default); //change the date displayed by adding the right amount of days / month

  const changeDate = nbDays => {
    return () => appDispatch({
      type: addType,
      nbDays: nbDays * daysMove
    });
  };

  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button.Group, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    icon: true,
    onClick: changeDate(-10)
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "angle double left"
  })), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    icon: true,
    onClick: changeDate(-5)
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "angle left"
  })), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    onClick: changeDate(-1)
  }, last), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, null, actual), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    onClick: changeDate(1)
  }, next), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    icon: true,
    onClick: changeDate(5)
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "angle right"
  })), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    icon: true,
    onClick: changeDate(10)
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "angle double right"
  })));
};

var _default = DateTraveler;
exports.default = _default;