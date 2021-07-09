"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _constants = require("../../constants");

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _agenda = require("../../agenda.style");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//context
const HeaderMenu = () => {
  const {
    settings,
    mode,
    languageFile,
    tagsList
  } = (0, _react.useContext)(_StateContext.default);
  const {
    month,
    week,
    day
  } = languageFile;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);

  const handleOpenSettings = () => {
    appDispatch({
      type: _constants.OPEN_SETTINGS
    });
  };

  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu, {
    secondary: true
  }, /*#__PURE__*/_react.default.createElement(_agenda.StyledMenuItem, {
    name: month,
    active: mode === _constants.MONTH,
    onClick: () => appDispatch({
      type: _constants.SET_MODE,
      data: _constants.MONTH
    })
  }), /*#__PURE__*/_react.default.createElement(_agenda.StyledMenuItem, {
    name: week,
    active: mode === _constants.WEEK,
    onClick: () => appDispatch({
      type: _constants.SET_MODE,
      data: _constants.WEEK
    })
  }), /*#__PURE__*/_react.default.createElement(_agenda.StyledMenuItem, {
    name: day,
    active: mode === _constants.DAY,
    onClick: () => appDispatch({
      type: _constants.SET_MODE,
      data: _constants.DAY
    })
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Menu.Menu, {
    position: "right"
  }, Object.entries(tagsList).length > 0 ? /*#__PURE__*/_react.default.createElement(_agenda.StyledMenuItem, {
    name: "tag",
    onClick: () => appDispatch({
      type: _constants.OPEN_TAGS
    })
  }, /*#__PURE__*/_react.default.createElement(_agenda.MargedIcon, {
    name: "tags"
  })) : null, //add icon used to open the create modal only if it's allowed in the settings
  settings.allowCreation || settings.allowCreation === undefined ? /*#__PURE__*/_react.default.createElement(_agenda.StyledMenuItem, {
    name: "add",
    onClick: () => appDispatch({
      type: _constants.OPEN_MODAL,
      mode: _constants.CREATE,
      event: (0, _moment.default)().minute((0, _moment.default)().minute() - (0, _moment.default)().minute() % 5)
    })
  }, /*#__PURE__*/_react.default.createElement(_agenda.MargedIcon, {
    name: "add"
  })) : null, //add icon used to open the Settings modal only if it's allowed in the settings
  settings.settingsModif.allowed ? /*#__PURE__*/_react.default.createElement(_agenda.StyledMenuItem, {
    name: "settings",
    onClick: handleOpenSettings
  }, /*#__PURE__*/_react.default.createElement(_agenda.MargedIcon, {
    name: "setting"
  })) : null));
};

var _default = HeaderMenu;
exports.default = _default;