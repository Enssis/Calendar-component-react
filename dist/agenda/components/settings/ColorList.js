"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _reactColor = require("react-color");

var _StateContext = _interopRequireDefault(require("../../StateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ColorList = props => {
  const {
    colors,
    setColors,
    setModalOpen
  } = props;
  const {
    new_color
  } = (0, _react.useContext)(_StateContext.default).languageFile;
  const [showKey, setShowKey] = (0, _react.useState)(-1);
  const [openColorModal, setOpenColorModal] = (0, _react.useState)(false);
  const [color, setColor] = (0, _react.useState)('#fff'); //check if the color doesn't already exist, add it and close the modal

  const handleAccept = () => {
    if (colors.indexOf(color.hex) < 0) {
      setColors(colors.concat(color.hex));
    }

    handleModalChange(false);
  };

  const handleRemove = color => {
    setColors(colors.filter(el => el !== color));
  };

  const handleModalChange = value => {
    if (value) setModalOpen(value);else setTimeout(() => setModalOpen(value), 200);
    setOpenColorModal(value);
  };

  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Segment, {
    basic: true,
    style: {
      margin: 0,
      paddingTop: 0
    }
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.List, {
    horizontal: true
  }, colors.map((color, key) => {
    return /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, {
      key: key
    }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
      icon: showKey === key ? 'remove' : '',
      style: {
        backgroundColor: color,
        padding: 10
      },
      onMouseEnter: () => setShowKey(key),
      onMouseLeave: () => setShowKey(-1),
      onClick: () => handleRemove(color)
    }));
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.List.Item, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    icon: "add",
    style: {
      backgroundColor: '#eee',
      padding: 10
    },
    onClick: () => handleModalChange(true)
  }))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal, {
    basic: true,
    size: "tiny",
    open: openColorModal,
    onClose: () => handleModalChange(false)
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal.Content, null, /*#__PURE__*/_react.default.createElement(_reactColor.PhotoshopPicker, {
    color: color,
    onChange: color => setColor(color),
    header: new_color,
    onAccept: handleAccept,
    onCancel: () => handleModalChange(false)
  }))));
};

var _default = ColorList;
exports.default = _default;