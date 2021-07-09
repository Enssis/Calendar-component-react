"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactScroll = require("react-scroll");

var _moment = _interopRequireDefault(require("moment"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _semanticUiReact = require("semantic-ui-react");

var _agenda = require("../../agenda.style");

var _EventSegment = _interopRequireDefault(require("./EventSegment"));

var _EventPopup = _interopRequireDefault(require("./EventPopup"));

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _constants = require("../../constants");

var _useImmer = require("use-immer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//context
//components

/*
   Component rendering all the events of the day by time block defined
*/
const HourCase = props => {
  const {
    event,
    nbrTimeRange,
    settings,
    activeTags,
    zoom
  } = (0, _react.useContext)(_StateContext.default);
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const hours = Array.from(Array(24).keys());
  const {
    date,
    week
  } = props; // open the modification modal with the current event if modification is allowed

  const handleModifClick = ev => {
    if (settings.allowModification || settings.allowModification === undefined) appDispatch({
      type: _constants.OPEN_MODAL,
      mode: _constants.MODIF,
      event: ev
    });
  }; //event in each time block


  const [partHourEvents, setPartHourEvents] = (0, _useImmer.useImmer)(Array.from(Array(288 / nbrTimeRange).keys()).map(key => ({
    time: (0, _moment.default)({
      year: date.year(),
      month: date.month(),
      date: date.date(),
      hour: Math.floor(nbrTimeRange * key / 12),
      minute: nbrTimeRange * 5 * (key % (12 / nbrTimeRange))
    }),
    event: {}
  }))); //used to show nothing if all events haven't finished to load

  const [isLoading, setIsLoading] = (0, _react.useState)(true); //nb max de columns

  const [nbCol, setNbCol] = (0, _react.useState)(1); //list of events in this day

  const [events, setEvents] = (0, _react.useState)([]); //used to know if the first event has been mounted

  const [firstEventReady, setFirstEventReady] = (0, _react.useState)(false); //set the events of the day and remove these wich the tags aren't actives

  (0, _react.useEffect)(() => {
    const dateFormat = (0, _moment.default)(date).format('YYYY MM DD');
    const propEvent = event[dateFormat];
    setEvents(propEvent ? propEvent : []);
    setFirstEventReady(false);
  }, [date, event, activeTags]); //fill all part of the day with the good event

  (0, _react.useEffect)(() => {
    //well sized divided day
    let tempDivisDay = Array.from(Array(288 / nbrTimeRange).keys()).map(key => ({
      time: (0, _moment.default)({
        year: date.year(),
        month: date.month(),
        date: date.date(),
        hour: Math.floor(nbrTimeRange * key / 12),
        minute: nbrTimeRange * 5 * (key % (12 / nbrTimeRange))
      }),
      event: {}
    })); //keep in memory the number of col max

    let nbColMax = 1; //loop through the events and fill the goods time divisions

    for (let evNbr = 0; evNbr < events.length; evNbr++) {
      const value = events[evNbr];
      const {
        start,
        duration,
        column
      } = value.timeInfo; //find all index of time division contained in the event
      //find the start moment depending on the nbrTimeRange

      const divisStart = (0, _moment.default)(start).minutes(start.minutes() - start.minutes() % (5 * nbrTimeRange)); //find the index of the start

      const startIndex = 12 / nbrTimeRange * divisStart.hour() + divisStart.minutes() / (5 * nbrTimeRange); //set the column and check if there is a column disponible

      let col = column;
      const divisLength = Object.entries(tempDivisDay[startIndex].event).length;

      if (divisLength < col) {
        for (let colCheck = 0; colCheck <= divisLength; colCheck++) {
          const filteredEntries = Object.entries(tempDivisDay[startIndex].event).filter(_ref => {
            let [key, value] = _ref;
            return key === colCheck;
          });

          if (filteredEntries.length === 0) {
            col = colCheck;
            break;
          }
        }
      }

      if (col + 1 > nbColMax) nbColMax = col + 1; //fill the temp divis day

      for (let row = startIndex; row < duration + startIndex; row++) {
        tempDivisDay[row].event[col] = {
          value,
          isStart: row === startIndex,
          firstElement: evNbr === 0
        };
      }
    }

    setNbCol(nbColMax);
    setPartHourEvents(tempDivisDay);
    setIsLoading(false);
  }, [events, nbrTimeRange]); //function to set the scroll

  const scrollToFirstElement = () => {
    _reactScroll.scroller.scrollTo('firstEvent', {
      duration: 0,
      delay: 0,
      smooth: 'easeInOutQuart',
      containerId: 'container'
    });
  };

  (0, _react.useEffect)(() => {
    if (firstEventReady && events.length > 0) {
      scrollToFirstElement();
    }
  }, [firstEventReady, events.length]);
  return /*#__PURE__*/_react.default.createElement(_agenda.ScrollableSegment, {
    height: week ? 900 : 800,
    nopadding: 1,
    basic: true,
    id: "container"
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Table, {
    definition: !week
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Table.Body, null, /*#__PURE__*/_react.default.createElement(_agenda.SizedTableRow, {
    height: 800
  }, !week && zoom > 0.4 ? hours.map((hour, key) => {
    return /*#__PURE__*/_react.default.createElement(_agenda.SizedTableRow, {
      key: key,
      height: 180 * zoom
    }, isLoading ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Dimmer, {
      active: true
    }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Loader, null)) : /*#__PURE__*/_react.default.createElement(_agenda.DarkTableCell, {
      textAlign: "center",
      width: 1,
      verticalAlign: "top"
    }, /*#__PURE__*/_react.default.createElement(_agenda.StyledDivider, {
      fitted: true
    }), hour));
  }) : null, Array(nbCol).fill().map((_, col) => /*#__PURE__*/_react.default.createElement(_agenda.PaddingLessTableCell, {
    key: col,
    textAlign: "center",
    width: week ? 1 : Math.ceil(15 / nbCol)
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Dimmer, {
    active: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Loader, null)) : /*#__PURE__*/_react.default.createElement(_semanticUiReact.Segment.Group, null, partHourEvents.map((quarterHourEvent, row) => {
    const event = quarterHourEvent.event[col];

    if (event) {
      const {
        isStart,
        value,
        firstElement
      } = event;

      if (isStart) {
        if (week) {
          return /*#__PURE__*/_react.default.createElement(_EventPopup.default, {
            trigger: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_agenda.SizedSegment, {
              nomargin: 1,
              nopadding: 1,
              height: value.timeInfo.duration * 3 * nbrTimeRange,
              vertical: true,
              backcolor: value.color,
              onClick: () => handleModifClick(value)
            }, nbCol <= 2 && nbrTimeRange > 2 && value.timeInfo.duration * nbrTimeRange > 50 ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Header, {
              as: "h5",
              style: {
                paddingTop: value.timeInfo.duration * 4 - 8
              }
            }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
              name: value.icon,
              size: "tiny"
            }), ' ' + value.title) : '')),
            event: value
          });
        } else {
          if (firstElement) {
            if (!firstEventReady) setFirstEventReady(true);
            return /*#__PURE__*/_react.default.createElement(_reactScroll.Element, {
              key: row,
              name: "firstEvent"
            }, /*#__PURE__*/_react.default.createElement(_EventSegment.default, {
              moment: quarterHourEvent.time,
              event: value,
              size: value.timeInfo.duration * 15 * nbrTimeRange * zoom
            }));
          } else return /*#__PURE__*/_react.default.createElement(_EventSegment.default, {
            key: row,
            moment: quarterHourEvent.time,
            event: value,
            size: value.timeInfo.duration * 15 * nbrTimeRange * zoom
          });
        }
      } else return '';
    }

    if (week) return /*#__PURE__*/_react.default.createElement(_agenda.SizedSegment, {
      light: 1,
      key: row,
      nohover: 1,
      basic: true,
      nomargin: 1,
      nopadding: 1,
      height: 3 * nbrTimeRange,
      vertical: true
    });
    return /*#__PURE__*/_react.default.createElement(_EventSegment.default, {
      key: row,
      event: null,
      moment: quarterHourEvent.time,
      size: 15 * nbrTimeRange * zoom
    });
  }))))))));
};

var _default = HourCase;
exports.default = _default;