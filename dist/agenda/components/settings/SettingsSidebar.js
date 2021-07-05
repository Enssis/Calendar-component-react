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

var _ColorList = _interopRequireDefault(require("./ColorList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const SettingsSidebar = props => {
  const appState = (0, _react.useContext)(_StateContext.default);
  const {
    nbrTimeRange,
    settings,
    settingsOpen
  } = appState;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const {
    allowColor,
    allowTimeRange
  } = settings.settingsModif;
  const [colors, setColors] = (0, _react.useState)(appState.colors);
  const [timeRange, setTimeRange] = (0, _react.useState)(nbrTimeRange * 5);
  const [modalOpen, _setModalOpen] = (0, _react.useState)(false); //function to handle the color change

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

  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Sidebar, {
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
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Header, {
    inverted: true,
    as: "h3"
  }, "Param\xE8tres ", /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "settings"
  }))), allowColor || allowColor === undefined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, {
    inverted: true
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Header, {
    as: "h4",
    inverted: true
  }, "Palette de couleur des \xE9vennements :")), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_ColorList.default, {
    colors: colors,
    setColors: handleColorChange,
    setModalOpen: value => _setModalOpen(value)
  }))))) : null, allowTimeRange || allowTimeRange === undefined ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, {
    inverted: true
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Header, {
    as: "h4",
    inverted: true
  }, "Ecart de temps :")), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, {
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Dropdown, {
    button: true,
    options: timeRangeOptions,
    defaultValue: "".concat(timeRange),
    onChange: (_, data) => setTimeRange(data.value)
  }))))) : null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, {
    inverted: true
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleApplied
  }, "Appliquer"), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleValidate
  }, "Valider"), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    negative: true,
    onClick: () => appDispatch({
      type: _constants.CLOSE_SETTINGS
    })
  }, "Annuler"))));
};

var _default = SettingsSidebar;
exports.default = _default;
const timeRangeOptions = [{
  key: '5',
  text: '5 minutes',
  value: '5'
}, {
  key: '10',
  text: '10 minutes',
  value: '10'
}, {
  key: '15',
  text: '15 minutes',
  value: '15'
}, {
  key: '30',
  text: '30 minutes',
  value: '30'
}, {
  key: '60',
  text: '60 minutes',
  value: '60'
}];