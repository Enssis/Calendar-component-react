"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _constants = require("../../constants");

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _agenda = require("../../agenda.style");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DateDisplay = props => {
  const {
    listDays
  } = props;
  const {
    zoom,
    mode,
    displayedDate,
    theme,
    languageFile
  } = (0, _react.useContext)(_StateContext.default);
  const {
    dayDateColor
  } = theme;
  const {
    Month_names
  } = languageFile;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const [showZoom, setShowZoom] = (0, _react.useState)(false); //return the day choosed by it's number on the week

  const getDate = (dayNbr, comparedDate) => {
    if (mode === _constants.DAY) {
      return comparedDate;
    } else {
      const date = (0, _moment.default)(comparedDate);
      date.add(-((6 + comparedDate.day()) % 7 - dayNbr), 'day');
      return date;
    }
  }; //show the zoom when it change


  (0, _react.useEffect)(() => {
    setShowZoom(true);
    const delay = setTimeout(() => setShowZoom(false), 1000);
    return () => clearTimeout(delay);
  }, [zoom]); //return the date with the good format depending on the mode

  const displayDate = (day, key) => {
    const date = getDate(key, displayedDate);
    return day + (mode !== _constants.MONTH ? " ".concat(date.date() + ' ' + Month_names[date.month()]) : '');
  };

  const handleDayClick = date => {
    if (mode === _constants.WEEK) {
      appDispatch({
        type: _constants.SET_DISPLAYED_DATE,
        date
      });
      appDispatch({
        type: _constants.SET_MODE,
        data: _constants.DAY
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, {
    columns: listDays.length
  }, listDays.map((day, key) => /*#__PURE__*/_react.default.createElement(_agenda.PaddingLessGridColumn, {
    paddingright: 1,
    key: key,
    textAlign: mode !== _constants.DAY ? 'center' : 'left'
  }, /*#__PURE__*/_react.default.createElement(_agenda.SizedSegment, {
    nohover: mode !== _constants.WEEK ? 1 : 0,
    backcolor: dayDateColor,
    onClick: () => handleDayClick(getDate(key, displayedDate))
  }, mode === _constants.DAY ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu, {
    icon: true,
    secondary: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu.Item, {
    header: true
  }, displayDate(day, key)), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu.Menu, {
    position: "right"
  }, showZoom ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu.Item, {
    header: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, null, "".concat(Math.floor(zoom * 100), "%"))) : null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu.Item, {
    as: "a",
    icon: "add",
    onClick: () => appDispatch({
      type: _constants.OPEN_MODAL,
      mode: _constants.CREATE,
      event: getDate(key, displayedDate)
    })
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu.Item, {
    as: "a",
    icon: "plus circle",
    onClick: () => appDispatch({
      type: _constants.ZOOM_PLUS
    })
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu.Item, {
    as: "a",
    icon: "minus circle",
    onClick: () => appDispatch({
      type: _constants.ZOOM_MINUS
    })
  }))) : /*#__PURE__*/_react.default.createElement(_semanticUiReact.Header, {
    as: "h5"
  }, displayDate(day, key))))));
};

var _default = DateDisplay;
exports.default = _default;