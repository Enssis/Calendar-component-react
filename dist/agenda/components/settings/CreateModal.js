"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.replace.js");

var _react = _interopRequireWildcard(require("react"));

var _useImmer = require("use-immer");

var _moment = _interopRequireDefault(require("moment"));

var _constants = require("../../constants");

var _semanticUiReact = require("semantic-ui-react");

var _MomentPicker = _interopRequireDefault(require("./MomentPicker"));

var _ColorPicker = _interopRequireDefault(require("./ColorPicker"));

var _IconDropdown = _interopRequireDefault(require("./IconDropdown"));

var _TagsPicker = _interopRequireDefault(require("./TagsPicker"));

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _agenda = require("../../agenda.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//components
//context
const CreateModal = props => {
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const {
    modal,
    eventList,
    languageFile,
    colors,
    settings
  } = (0, _react.useContext)(_StateContext.default);
  const {
    Event,
    Creation,
    Actions
  } = languageFile;
  const {
    create_title,
    modif_title,
    entire_day,
    color,
    icon,
    Errors,
    Confirm
  } = Creation;
  const {
    event
  } = props;
  const createMode = modal.mode === _constants.CREATE;
  const initialState = createMode ? {
    entireDay: false,
    selectedColor: colors[0],
    selectedIcon: '',
    description: '',
    place: '',
    title: '',
    titleError: false,
    titleErrorMessage: {},
    start: (0, _moment.default)(event),
    end: (0, _moment.default)(event).add(15, 'minutes'),
    tags: [],
    timeError: '',
    timeErrorMessage: ''
  } : {
    entireDay: false,
    selectedColor: event.color,
    selectedIcon: event.icon,
    description: event.description,
    place: event.place,
    title: event.title,
    titleError: false,
    tags: event.tags,
    titleErrorMessage: {},
    start: event.start,
    end: event.end
  };
  const [confirm, setConfirm] = (0, _react.useState)(false);
  const [state, setState] = (0, _useImmer.useImmer)(initialState); //for the three functions : change the value of the place when something is typed

  const handleDescriptionChange = (e, data) => {
    setState(draft => {
      draft.description = data.value;
    });
  };

  const handleTitleChange = (e, data) => {
    setState(draft => {
      draft.titleError = false;
      draft.title = data.value;
    });
  };

  const handlePlaceChange = (e, data) => {
    setState(draft => {
      draft.place = data.value;
    });
  }; //Delete the event from the list


  const handleDelete = () => {
    setConfirm(false);
    appDispatch({
      type: _constants.DELETE_EVENT,
      value: event
    });
    appDispatch({
      type: _constants.CLOSE_MODAL
    });
  }; //function to set a certain moment to a certain time


  function setTime(time) {
    let hour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    let min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
    let sec = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
    let millis = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : -1;
    const newTime = (0, _moment.default)(time);
    if (hour >= 0) newTime.hour(hour);
    if (min >= 0) newTime.minutes(min);
    if (sec >= 0) newTime.seconds(sec);
    if (millis >= 0) newTime.millisecond(millis);
    return newTime;
  } //function to create key


  const makeKey = len => {
    let res = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLen = chars.length;

    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * charsLen));
    }

    return res;
  }; //Add the event created if there isn't any errors


  const handleValidate = () => {
    let error = false; //if there is no title => error

    if (state.title.length < 1) {
      error = true;
      setState(draft => {
        draft.titleError = true;
      });
      setState(draft => {
        draft.titleErrorMessage = {
          content: Errors.short_title,
          pointing: 'below'
        };
      });
    } //if the start is after the end


    if (state.start.diff(state.end) > 0 && !state.entireDay) {
      error = true;
      setState(draft => {
        draft.timeError = true;
      });
      setState(draft => {
        draft.timeErrorMessage = Errors.start_end;
      });
    }

    if (!error) {
      let key = createMode ? makeKey(10) : event.key;

      if (createMode) {
        while (eventList.filter(el => el.key === key).length > 0) {
          key = makeKey(10);
        }
      }

      const newEvent = {
        title: state.title,
        color: state.selectedColor,
        start: state.entireDay ? setTime(state.start, 0, 0, 0, 0) : state.start,
        end: state.entireDay ? setTime(state.start, 23, 59, 0, 0) : state.end,
        icon: state.selectedIcon,
        place: state.place,
        tags: state.tags,
        key,
        description: state.description
      };
      appDispatch({
        type: createMode ? _constants.ADD_EVENT : _constants.MODIF_EVENT,
        value: newEvent
      });
      appDispatch({
        type: _constants.CLOSE_MODAL
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledModalHeader, null, createMode ? create_title : modif_title.replace('$', state.title)), /*#__PURE__*/_react.default.createElement(_agenda.StyledModalContent, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Form, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledFormInput, {
    error: state.titleError ? state.titleErrorMessage : null,
    label: Event.title,
    placeholder: Event.title,
    value: state.title,
    onChange: handleTitleChange
  }), /*#__PURE__*/_react.default.createElement(_agenda.StyledFormCheckbox, {
    label: entire_day,
    onChange: (e, _ref) => {
      let {
        checked
      } = _ref;
      return setState(draft => {
        draft.entireDay = checked;
      });
    }
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Form.Group, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledFormField, {
    control: _MomentPicker.default,
    label: state.entireDay ? languageFile.day : Event.start,
    day: state.entireDay,
    date: state.start,
    setSelectedDate: value => setState(draft => {
      draft.start = value;
      draft.timeError = false;
    })
  }), state.entireDay ? '' : /*#__PURE__*/_react.default.createElement(_agenda.StyledFormField, {
    control: _MomentPicker.default,
    label: Event.end,
    date: state.end,
    setSelectedDate: value => setState(draft => {
      draft.end = value;
      draft.timeError = false;
    })
  })), state.timeError ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Message, {
    negative: true
  }, state.timeErrorMessage) : '', /*#__PURE__*/_react.default.createElement(_semanticUiReact.Form.Group, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledFormField, {
    control: _ColorPicker.default,
    label: color + ' :',
    color: state.selectedColor,
    setColor: value => setState(draft => {
      draft.selectedColor = value;
    })
  }), /*#__PURE__*/_react.default.createElement(_agenda.StyledFormField, {
    label: icon + ' :',
    control: _IconDropdown.default,
    selectedIcon: state.selectedIcon,
    setSelectedIcon: value => setState(draft => {
      draft.selectedIcon = value;
    })
  })), settings.allowTags || settings.allowTags === undefined ? /*#__PURE__*/_react.default.createElement(_agenda.StyledFormField, {
    label: Event.tags,
    control: _TagsPicker.default,
    tags: state.tags,
    setTags: value => setState(draft => {
      draft.tags = value;
    })
  }) : null, /*#__PURE__*/_react.default.createElement(_agenda.StyledFormInput, {
    label: Event.place,
    placeholder: Event.place,
    value: state.place,
    onChange: handlePlaceChange
  }), /*#__PURE__*/_react.default.createElement(_agenda.StyledFormTextArea, {
    label: Event.description,
    placeholder: Event.description,
    value: state.description,
    onChange: handleDescriptionChange
  }))), /*#__PURE__*/_react.default.createElement(_agenda.StyledModalActions, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleValidate
  }, Actions.confirm), createMode ? null : /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    negative: true,
    onClick: () => setConfirm(true)
  }, Actions.delete), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    negative: true,
    onClick: () => appDispatch({
      type: _constants.CLOSE_MODAL
    })
  }, Actions.cancel)), confirm ? /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal, {
    open: true,
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_agenda.StyledModalHeader, null, Confirm.sure), /*#__PURE__*/_react.default.createElement(_agenda.StyledModalContent, null, Confirm.irrevocable), /*#__PURE__*/_react.default.createElement(_agenda.StyledModalActions, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleDelete
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "checkmark"
  }), " ", Confirm.yes), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    negative: true,
    onClick: () => setConfirm(false)
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "remove"
  }), " ", Confirm.no))) : '');
};

var _default = CreateModal;
exports.default = _default;