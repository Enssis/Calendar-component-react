"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _agenda = require("../../agenda.style");

var _constants = require("../../constants");

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/*
   Component rendering a popup with all the info of the event 
 */
const EventPopup = props => {
  const {
    event,
    trigger,
    left,
    open,
    context
  } = props;
  const {
    start,
    end,
    title,
    description,
    place,
    icon,
    tags
  } = event;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const {
    mode,
    displayedDate,
    debug,
    settings,
    languageFile
  } = (0, _react.useContext)(_StateContext.default);
  const {
    tagsList
  } = settings;
  const {
    Event
  } = languageFile; //stock the duration of the event

  const duration = Math.ceil(Math.abs(start.diff(end) / 900000));
  const [showFullDesc, setShowFullDesc] = (0, _react.useState)(false);
  const [showFullPlace, setShowFullPlace] = (0, _react.useState)(false); //set the displayed day to be the clicked date and switch to day mode

  const goToDay = date => {
    if (!date.isSame(displayedDate, 'day') || mode !== 'jour') {
      appDispatch({
        type: _constants.SET_DISPLAYED_DATE,
        date
      });
      appDispatch({
        type: _constants.SET_MODE,
        data: _constants.DAY
      });
    }
  }; //chanche if in mode trigger component or context component control


  const trigg = () => {
    if (trigger) {
      return {
        trigger: trigger
      };
    } else {
      return {
        context: context,
        open: open
      };
    }
  };

  return /*#__PURE__*/_react.default.createElement(_agenda.DefaultPopup, _extends({}, trigg(), {
    hoverable: true,
    wide: true,
    hideOnScroll: true,
    position: left ? 'left center' : 'left center'
  }), /*#__PURE__*/_react.default.createElement(_agenda.ColoredPopupHeader, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: icon
  }), " ", title), /*#__PURE__*/_react.default.createElement(_agenda.DefaultPopup.Content, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledSegment, {
    basic: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.List, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
    color: "green",
    image: true,
    as: "a",
    onClick: () => goToDay(start)
  }, Event.start, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, " ", start.format('DD/MM/YYYY kk:mm'), " "))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
    color: "red",
    image: true,
    as: "a",
    onClick: () => goToDay(end)
  }, Event.end, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, " ", end.format('DD/MM/YYYY kk:mm'), " "))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
    color: "yellow",
    image: true
  }, Event.duration, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, " ", "".concat(Math.floor(duration / 96) > 0 ? "".concat(Math.floor(duration / 96), " jours ") : '').concat(Math.floor(duration / 4) % 24 > 0 ? "".concat(Math.floor(duration / 4) % 24, " heures ") : '').concat(duration % 4 > 0 ? "".concat(duration % 4 * 15, " minutes") : '', " "), " "))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
    color: "teal",
    image: true,
    onClick: () => setShowFullDesc(!showFullDesc),
    as: "a"
  }, !showFullDesc ? Event.description : '', /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, " ", !showFullDesc && description.length > 20 ? "".concat(description.substring(0, 20), "...") : description, " "))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
    color: "orange",
    image: true,
    onClick: () => setShowFullPlace(!showFullPlace),
    as: "a"
  }, !showFullPlace ? Event.place : '', /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, " ", !showFullPlace && place.length > 20 ? "".concat(place.substring(0, 20), "...") : place, " "))), tags.length > 0 ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledHeader, {
    as: "h5"
  }, Event.tags, " : "), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List, {
    horizontal: true
  }, tags.map(tagKey => {
    const tag = tagsList[tagKey];
    if (tag === undefined) return null;
    return /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, {
      key: tagKey
    }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
      tag: true,
      color: tag.color
    }, tag.name));
  }))) : null,
  /*USED FOR DEBUG TO REMOVE !!!!! */
  debug ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
    color: "blue",
    image: true
  }, "Column", /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, " ", event.timeInfo.column, " "))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
    color: "blue",
    image: true
  }, "Start", /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, " ", event.timeInfo.start.format('DD/MM/YYYY kk:mm'), " "))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
    color: "blue",
    image: true
  }, "End", /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, " ", event.timeInfo.end.format('DD/MM/YYYY kk:mm'), " ")))) : ''))));
};

var _default = EventPopup;
exports.default = _default;