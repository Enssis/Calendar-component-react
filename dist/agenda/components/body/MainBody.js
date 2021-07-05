"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _agenda = require("../../agenda.style");

var _semanticUiReact = require("semantic-ui-react");

var _BodyMenu = _interopRequireDefault(require("./BodyMenu"));

var _CalendarGrid = _interopRequireDefault(require("./CalendarGrid"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
   Component used to render all differnt elements inside of the body
*/
const MainBody = () => {
  const {
    settings,
    mode,
    displayedDate
  } = (0, _react.useContext)(_StateContext.default); //use to check if the date is in the dates where the event are defined

  const [eventCharged, setEventCharged] = (0, _react.useState)('totally');
  const [limitDate, setLimitDate] = (0, _react.useState)({
    before: {},
    after: {}
  }); //check if in the mode displayed there is day out of time limit bound

  (0, _react.useEffect)(() => {
    let charged = 'totally';
    const limitBefore = (0, _moment.default)().add(-settings.table.before, 'M');
    const limitAfter = (0, _moment.default)().add(settings.table.after, 'M');
    setLimitDate({
      before: limitBefore,
      after: limitAfter
    }); //if the displayed date isn't in the bound set the charged value to ""

    if (displayedDate.diff(limitBefore) < 0 && !displayedDate.isSame(limitBefore, 'day') || displayedDate.diff(limitAfter) > 0 && !displayedDate.isSame(limitAfter, 'day')) {
      charged = '';
    } //in case of week mode, test if the first day of the displayed date is equal to the first day of limit after or before weeks


    if (mode === _constants.WEEK) {
      //Firsts days of the limit before / limit after and displayed week
      const fdoLimitBeforeWeek = (0, _moment.default)(limitBefore).add(-limitBefore.day(), 'd');
      const fdoLimitAfterWeek = (0, _moment.default)(limitAfter).add(-limitAfter.day(), 'd');
      const fdoDisplayedWeek = (0, _moment.default)(displayedDate).add(-displayedDate.day(), 'd');
      if (fdoLimitAfterWeek.isSame(fdoDisplayedWeek, 'day') || fdoLimitBeforeWeek.isSame(fdoDisplayedWeek, 'day')) charged = 'partially';
    } //in case of month case, test if it's the same month for displayed date and one of the limits


    if (mode === _constants.MONTH) {
      if (limitBefore.isSame(displayedDate, 'month') || limitAfter.isSame(displayedDate, 'month')) {
        charged = 'partially';
      }
    }

    setEventCharged(charged);
  }, [settings, mode, displayedDate]);
  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    container: true,
    centered: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Column, {
    textAlign: "center"
  }, eventCharged !== 'totally' ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Message, {
    warning: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Message.Header, null, "Vous regardez ", mode === 'mois' ? 'un mois' : mode === 'jour' ? 'une date' : 'une semaine', " dont les \xE9vennements n'ont pas \xE9t\xE9 ", eventCharged === 'partially' ? 'totallement' : '', " import\xE9s"), /*#__PURE__*/_react.default.createElement("p", null, "Les dates limites sont le ", limitDate.before.format('DD/MM/YYYY'), " et le ", limitDate.after.format('DD/MM/YYYY'), ' ')) : '', /*#__PURE__*/_react.default.createElement(_agenda.MainSegmentGroup, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Segment, {
    basic: true
  }, /*#__PURE__*/_react.default.createElement(_BodyMenu.default, null)), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Segment, {
    basic: true
  }, /*#__PURE__*/_react.default.createElement(_CalendarGrid.default, null)))));
};

var _default = MainBody;
exports.default = _default;