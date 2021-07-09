"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.sort.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _agenda = require("../../agenda.style");

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../../constants");

var _EventPopup = _interopRequireDefault(require("./EventPopup"));

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//components
//Context

/*
   Component rendering one day when on the month mode
*/
const DayCase = props => {
  const {
    date
  } = props;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const {
    event,
    nbrTimeRange
  } = (0, _react.useContext)(_StateContext.default);
  const [rows, setRows] = (0, _react.useState)([]); //set the events of the day

  (0, _react.useEffect)(() => {
    const ndate = date.format('YYYY MM DD');
    const propEvent = event[ndate];

    if (propEvent) {
      //sort all the events by column number
      const events = [...propEvent].sort((el1, el2) => {
        return el1.timeInfo.column > el2.timeInfo.column ? 1 : -1;
      });
      const rows = []; //for each event while the length of row isn't is col number add a null event

      for (const event of events) {
        const col = event.timeInfo.column;

        while (rows.length < col) {
          rows.push('');
        }

        if (rows.length > col) {
          rows[col].push(event);
        } else {
          rows.push([event]);
        }
      }

      setRows(rows);
    } else {
      setRows([]);
    }
  }, [date, event]); //set the displayed day to be the clicked date and switch to day mode

  const goToDay = date => {
    appDispatch({
      type: _constants.SET_DISPLAYED_DATE,
      date
    });
    appDispatch({
      type: _constants.SET_MODE,
      data: _constants.DAY
    });
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_agenda.DaySegment, {
    size: 'mini',
    attached: "top",
    onClick: () => goToDay(date)
  }, date.date()), /*#__PURE__*/_react.default.createElement(_agenda.SizedSegment, {
    height: "120",
    nopadding: 1,
    attached: "bottom",
    border: 1,
    light: 1,
    nohover: 1
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.List, null, rows.map((events, row) => {
    if (events === '') return /*#__PURE__*/_react.default.createElement("div", {
      key: row,
      style: {
        padding: 9
      }
    });
    return /*#__PURE__*/_react.default.createElement(_agenda.MonthListItem, {
      key: row
    }, //loop through all event on the same row
    events.map((event, key) => {
      const {
        start,
        duration
      } = event.timeInfo;
      const nbStep = 288 / nbrTimeRange; //calculate the distance between the start of the element and the last element / the start of the case

      const margleft = key > 0 ? Math.floor(Math.abs(events[key - 1].timeInfo.end.diff(start) / (300000 * nbrTimeRange)) * 100 / nbStep) : Math.floor(Math.abs((0, _moment.default)({
        year: start.year(),
        month: start.month(),
        date: start.date()
      }).diff(start) / (300000 * nbrTimeRange)) * 100 / nbStep);
      const width = Math.max(Math.floor(duration * 100 / nbStep), 1);
      console.log({
        width,
        title: event.title
      });
      return /*#__PURE__*/_react.default.createElement(_EventPopup.default, {
        key: key,
        left: true,
        trigger: /*#__PURE__*/_react.default.createElement("div", {
          style: {
            display: 'inline list-item'
          }
        }, /*#__PURE__*/_react.default.createElement(_agenda.CustomLabel, {
          onClick: () => appDispatch({
            type: _constants.OPEN_MODAL,
            mode: _constants.MODIF,
            event
          }),
          margleft: margleft,
          width: width,
          backcolor: event.color
        })),
        event: event
      });
    }));
  }))));
};

var _default = DayCase;
exports.default = _default;