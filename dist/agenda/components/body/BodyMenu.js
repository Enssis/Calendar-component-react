"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../constants");

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _DayTraveler = _interopRequireDefault(require("./DayTraveler"));

var _WeekTraveler = _interopRequireDefault(require("./WeekTraveler"));

var _MonthTraveler = _interopRequireDefault(require("./MonthTraveler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Context
//Components
const BodyMenu = () => {
  const {
    mode
  } = (0, _react.useContext)(_StateContext.default); //return the right component depending on the actual mmode

  const menu = mode => {
    switch (mode) {
      case _constants.DAY:
        return /*#__PURE__*/_react.default.createElement(_DayTraveler.default, null);

      case _constants.WEEK:
        return /*#__PURE__*/_react.default.createElement(_WeekTraveler.default, null);

      case _constants.MONTH:
        return /*#__PURE__*/_react.default.createElement(_MonthTraveler.default, null);

      default:
        console.log('Error on the mode');
        break;
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, menu(mode));
};

var _default = BodyMenu;
exports.default = _default;