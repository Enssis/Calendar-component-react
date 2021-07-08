"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _agenda = require("../../agenda.style");

var _constants = require("../../constants");

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _ColorList = _interopRequireDefault(require("./ColorList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SettingsSidebar = () => {
  const appState = (0, _react.useContext)(_StateContext.default);
  const {
    nbrTimeRange,
    settings,
    settingsOpen,
    languageFile
  } = appState;
  const {
    Settings,
    Actions,
    theme_list
  } = languageFile;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const {
    allowColor,
    allowTimeRange,
    allowThemeChange
  } = settings.settingsModif;
  const [colors, setColors] = (0, _react.useState)(appState.colors);
  const [timeRange, setTimeRange] = (0, _react.useState)(nbrTimeRange * 5);
  const [modalOpen, _setModalOpen] = (0, _react.useState)(false);
  const [theme, setTheme] = (0, _react.useState)(appState.theme.id); //function to handle the color change

  const handleColorChange = colors => {
    setColors(colors);
  }; //function to applied settings changes


  const handleApplied = () => {
    appDispatch({
      type: _constants.SET_COLORS,
      value: colors
    });
    appDispatch({
      type: _constants.SET_TIME_RANGE,
      value: timeRange
    });
    appDispatch({
      type: _constants.SET_THEME,
      value: _constants.applicationTheme[theme]
    });
  }; //function to applied settings change and close the Sidebar


  const handleValidate = () => {
    appDispatch({
      type: _constants.CLOSE_SETTINGS
    });
    handleApplied();
  };

  const handleClose = () => {
    if (!modalOpen) appDispatch({
      type: _constants.CLOSE_SETTINGS
    });
  };

  const timeRangeOptions = [{
    key: '5',
    text: '5 ' + Settings.minutes,
    value: '5'
  }, {
    key: '10',
    text: '10 ' + Settings.minutes,
    value: '10'
  }, {
    key: '15',
    text: '15 ' + Settings.minutes,
    value: '15'
  }, {
    key: '30',
    text: '30 ' + Settings.minutes,
    value: '30'
  }, {
    key: '60',
    text: '60 ' + Settings.minutes,
    value: '60'
  }];
  const themesOptions = theme_list.map((theme, key) => {
    return {
      key,
      value: key,
      text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
        empty: true,
        inline: true,
        circular: true,
        style: {
          backgroundColor: _constants.applicationTheme[key].accentColor
        }
      }), /*#__PURE__*/_react.default.createElement("span", null, theme))
    };
  });
  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Sidebar, {
    style: {
      backgroundColor: appState.theme.darkPrimaryColor
    },
    animation: "overlay",
    page: 1,
    as: _semanticUiReact.Segment,
    inverted: true,
    visible: settingsOpen,
    direction: "right",
    vertical: true,
    onHide: handleClose,
    width: "wide"
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    container: true,
    style: {
      padding: '15px'
    }
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledHeader, {
    inverted: true,
    as: "h3"
  }, Settings.settings, " ", /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "settings"
  }))), allowColor || allowColor === undefined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, {
    inverted: true
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledHeader, {
    as: "h4",
    inverted: true
  }, Settings.colors, " :")), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_ColorList.default, {
    colors: colors,
    setColors: handleColorChange,
    setModalOpen: value => _setModalOpen(value)
  }))))) : null, allowTimeRange || allowTimeRange === undefined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, {
    inverted: true
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledHeader, {
    as: "h4",
    inverted: true
  }, Settings.time, " :")), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, {
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_agenda.StyledDropdown, {
    default: 1,
    button: true,
    options: timeRangeOptions,
    defaultValue: "".concat(timeRange),
    onChange: (_, data) => setTimeRange(data.value)
  }))))) : null, allowThemeChange || allowThemeChange === undefined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, {
    inverted: true
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledHeader, {
    as: "h4",
    inverted: true
  }, Settings.theme, " :")), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_agenda.StyledDropdown, {
    default: 1,
    scrolling: true,
    button: true,
    options: themesOptions,
    defaultValue: theme,
    onChange: (_, data) => setTheme(data.value)
  }))))) : null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, {
    inverted: true
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleApplied
  }, Actions.applied), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleValidate
  }, Actions.confirm), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    negative: true,
    onClick: () => appDispatch({
      type: _constants.CLOSE_SETTINGS
    })
  }, Actions.cancel))));
};

var _default = SettingsSidebar;
exports.default = _default;