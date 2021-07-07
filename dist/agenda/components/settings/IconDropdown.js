"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _StateContext = _interopRequireDefault(require("../../StateContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const IconDropdown = props => {
  const {
    Icones
  } = (0, _react.useContext)(_StateContext.default).languageFile.Creation; //aray of al the icons option and the way they render

  const iconKeys = ['birthday cake', 'coffee', 'phone', 'suitcase', 'hospital', 'plane', 'taxi', 'train', 'utensils', 'exclamation', 'address book'];
  const iconsOption = iconKeys.map(key => ({
    key: key,
    value: key,
    text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
      name: key
    }), /*#__PURE__*/_react.default.createElement("span", null, Icones[key]))
  }));
  const {
    selectedIcon,
    setSelectedIcon
  } = props;
  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Dropdown, {
    button: true,
    className: "icon",
    defaultValue: selectedIcon,
    floating: true,
    labeled: true,
    options: iconsOption,
    clearable: true,
    placeholder: Icones.none,
    onChange: (_, data) => setSelectedIcon(data.value)
  });
};

var _default = IconDropdown;
exports.default = _default;