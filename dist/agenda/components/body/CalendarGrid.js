"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _agenda = require("../../agenda.style");

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../../constants");

var _DayCase = _interopRequireDefault(require("./DayCase"));

var _HourCase = _interopRequireDefault(require("./HourCase"));

var _DateDisplay = _interopRequireDefault(require("./DateDisplay"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//components
//Context

/*
   Component creating the grid of day depending on the mode
   mode Day : 1 column with the displayed date
   mode Week : 7 columns with all days of the week of the displayed date
   mode Month : 7 columns and some rows with all days of the month of the displayed date
*/
const CalendarGrid = () => {
  const {
    mode,
    displayedDate,
    languageFile
  } = (0, _react.useContext)(_StateContext.default);
  const {
    Days_names
  } = languageFile;
  const [listDays, setListDays] = (0, _react.useState)([0]);
  const [monthDateList, setmonthDateList] = (0, _react.useState)([]);
  const [dayDateList, setDayDateList] = (0, _react.useState)([]); //return the day choosed by it's number on the week

  const getDate = (dayNbr, comparedDate) => {
    if (mode === _constants.DAY) {
      return comparedDate;
    } else {
      const date = (0, _moment.default)(comparedDate);
      date.add(-((6 + comparedDate.day()) % 7 - dayNbr), 'day');
      return date;
    }
  };

  (0, _react.useEffect)(() => {
    //make a list with all days displayed of a month
    const res = [];
    const firstOfMonth = (0, _moment.default)({
      month: displayedDate.month(),
      year: displayedDate.year(),
      day: 1
    });
    let week = 0;

    do {
      for (let dayNbr = 0; dayNbr < 7; dayNbr++) {
        res.push(getDate(dayNbr + week * 7, firstOfMonth));
      }

      week++;
    } while (res[res.length - 1].month() === firstOfMonth.month() && week < 6);

    setmonthDateList(res); //make a list with all the days of the week or only one day if it's in mode day

    if (mode !== _constants.DAY) {
      const newList = Days_names.concat(Days_names[0]);
      newList.shift();
      setListDays(newList);
    } else {
      setListDays([Days_names[displayedDate.day()]]);
    } //make a list with all days displayed off a week


    const resDisplayed = [];

    for (let dayNbr = 0; dayNbr < 7; dayNbr++) {
      resDisplayed.push(getDate(dayNbr, displayedDate));
    }

    setDayDateList(resDisplayed);
  }, [displayedDate, mode]); //Component which represent which type of case need to be rendered

  const casetype = date => {
    switch (mode) {
      case _constants.MONTH:
        return /*#__PURE__*/_react.default.createElement(_DayCase.default, {
          date: date
        });

      case _constants.DAY:
        return /*#__PURE__*/_react.default.createElement(_HourCase.default, {
          week: false,
          date: date
        });

      case _constants.WEEK:
        return /*#__PURE__*/_react.default.createElement(_HourCase.default, {
          week: true,
          date: date
        });

      default:
        console.log('Error on the mode');
        break;
    }
  };

  const BodyRow = props => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  };

  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    centered: true,
    style: {
      marginLeft: '2px'
    }
  }, /*#__PURE__*/_react.default.createElement(_DateDisplay.default, {
    listDays: listDays
  }), mode !== _constants.MONTH ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, {
    columns: listDays.length
  }, //loop to create each column corresponding to the day displayed
  Array(listDays.length).fill().map((_, key) => {
    const dateList = mode === _constants.WEEK ? dayDateList : [displayedDate];
    const date = mode === _constants.DAY ? dateList[0] : dateList[key];
    return /*#__PURE__*/_react.default.createElement(_agenda.PaddingLessGridColumn, {
      paddingright: 1,
      key: key
    }, casetype(date));
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, Array(monthDateList.length / 7).fill().map((_, key) => /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, {
    key: key,
    columns: listDays.length
  }, //loop to create each column corresponding to the day displayed
  Array(listDays.length).fill().map((_, keyB) => {
    const date = mode === _constants.DAY ? monthDateList[0] : monthDateList[key * 7 + keyB];
    return /*#__PURE__*/_react.default.createElement(_agenda.PaddingLessGridColumn, {
      paddingright: 1,
      key: keyB
    }, casetype(date));
  })))));
};

var _default = CalendarGrid;
exports.default = _default;