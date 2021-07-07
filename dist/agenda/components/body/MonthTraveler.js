"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../constants");

var _useImmer = require("use-immer");

var _moment = _interopRequireDefault(require("moment"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _GeneralDateTraveler = _interopRequireDefault(require("./GeneralDateTraveler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//context
//components

/*
   Component used to adapts the Date traveler to month traveling
*/
const DayTraveler = () => {
  const {
    displayedDate,
    languageFile
  } = (0, _react.useContext)(_StateContext.default);
  const {
    Month_names
  } = languageFile; //change when displayed date change

  const [state, setActual] = (0, _useImmer.useImmer)({
    actual: '',
    next: '',
    last: ''
  }); //set the actual, next and previous day name
  //change when displayed date change

  (0, _react.useEffect)(() => {
    const actual = Month_names[displayedDate.month()] + ' ' + displayedDate.year();
    const tomorrow = (0, _moment.default)(displayedDate).add(1, 'month');
    const next = Month_names[tomorrow.month()] + ' ' + tomorrow.year();
    const yesterday = (0, _moment.default)(displayedDate).add(-1, 'month');
    const last = Month_names[yesterday.month()] + ' ' + yesterday.year();
    setActual({
      actual,
      next,
      last
    });
  }, [displayedDate]);
  return /*#__PURE__*/_react.default.createElement(_GeneralDateTraveler.default, {
    daysMove: 1,
    actual: state.actual,
    next: state.next,
    last: state.last,
    addType: _constants.ADD_MONTHS
  });
};

var _default = DayTraveler;
exports.default = _default;