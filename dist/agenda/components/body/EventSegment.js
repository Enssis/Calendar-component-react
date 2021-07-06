"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../constants");

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _agenda = require("../../agenda.style");

var _semanticUiReact = require("semantic-ui-react");

var _EventPopup = _interopRequireDefault(require("./EventPopup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//context
//components
//function to create the context where the popup will be rendered
function createContextFromEvent(e) {
  const left = e.clientX;
  const top = e.clientY;
  const right = left + 1;
  const bottom = top + 1;
  return {
    getBoundingClientRect: () => ({
      left,
      top,
      right,
      bottom,
      height: 0,
      width: 0
    })
  };
}
/*
   Component rendering an event in day mode, with the popup with the event info rendering where the mouse is 
   if event is null render just an empty case
*/


const EventSegment = props => {
  const {
    event,
    size,
    moment
  } = props;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const {
    settings,
    theme
  } = (0, _react.useContext)(_StateContext.default);
  const {
    caseBackground
  } = theme;
  const contextRef = (0, _react.useRef)(null);
  const [open, setOpen] = (0, _react.useState)(false); //in case event is null, open the create modal with the current moment if creation is allowed

  const handleCreateClick = () => {
    if (settings.allowCreation) appDispatch({
      type: _constants.OPEN_MODAL,
      mode: _constants.CREATE,
      event: moment
    });
  }; //in case event isn't null, open the modification modal with the current event if modification is allowed


  const handleModifClick = () => {
    if (settings.allowModification) appDispatch({
      type: _constants.OPEN_MODAL,
      mode: _constants.MODIF,
      event
    });
  }; //empty case


  if (event == null) {
    return /*#__PURE__*/_react.default.createElement(_agenda.SizedSegment, {
      nohover: !settings.allowCreation,
      nomargin: 1,
      nopadding: 1,
      height: size,
      vertical: true,
      onClick: handleCreateClick,
      backcolor: caseBackground
    });
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_EventPopup.default, {
    trigger: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_agenda.SizedSegment, {
      border: 1,
      nomargin: 1,
      height: size,
      vertical: true,
      onClick: handleModifClick,
      backcolor: event.color,
      onMouseLeave: () =>
      /*setOpen(false)*/
      '',
      onMouseMove: e => {
        e.preventDefault();
        contextRef.current = createContextFromEvent(e);
        setOpen(true);
      }
    }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Header, {
      as: "h3"
    }, event.icon !== '' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
      name: event.icon,
      size: "tiny"
    })) : '', event.title))),
    event: event,
    open: open,
    onClose: () => setOpen(false)
  }));
};

var _default = EventSegment;
exports.default = _default;