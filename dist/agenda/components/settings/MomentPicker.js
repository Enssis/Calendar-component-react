"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _rimBdsit = require("rim-bdsit");

var _moment = _interopRequireDefault(require("moment"));

require("rc-time-picker/assets/index.css");

var _agenda = require("../../agenda.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const MomentPicker = props => {
  const {
    date,
    setSelectedDate,
    day
  } = props;
  const [modalOpen, setModalOpen] = (0, _react.useState)(false);
  const [selectedMoment, setSelectedMoment] = (0, _react.useState)(date);

  const handleValidate = () => {
    setSelectedDate(selectedMoment);
    setModalOpen(false);
  };

  const handleDayChange = mom => {
    setSelectedMoment((0, _moment.default)(mom).second(0).millisecond(0));
  };

  const handleTimeChange = mom => {
    console.log(mom);
    if (mom !== null) setSelectedMoment((0, _moment.default)(mom).second(0).millisecond(0));
  }; //popup to choose the time


  const TimeModal = () => /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal, {
    dimmer: true,
    open: modalOpen,
    basic: true,
    onClose: () => setModalOpen(false),
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal.Content, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Container, {
    text: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Segment, null, day ? /*#__PURE__*/_react.default.createElement(_rimBdsit.DatePicker, {
    moment: selectedMoment,
    onChange: handleDayChange,
    locale: "fr"
  }) : /*#__PURE__*/_react.default.createElement(_semanticUiReact.Segment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    centered: true,
    container: true,
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_rimBdsit.DatePicker, {
    moment: selectedMoment,
    onChange: handleDayChange,
    locale: "fr"
  })), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Header, {
    as: "h2"
  }, " Heure : ")), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_agenda.BiggerTimePicker, {
    value: selectedMoment,
    onChange: handleTimeChange,
    minuteStep: 5,
    showSecond: false,
    allowEmpty: false
  }))))))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal.Actions, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleValidate
  }, "Valider"), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    negative: true,
    onClick: () => setModalOpen(false)
  }, "Annuler")));

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    onClick: () => setModalOpen(true)
  }, date.format(props.day ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm')), /*#__PURE__*/_react.default.createElement(TimeModal, null));
};

var _default = MomentPicker;
exports.default = _default;