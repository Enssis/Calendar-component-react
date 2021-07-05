"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _semanticUiReact = require("semantic-ui-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IconDropdown = props => {
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
    placeholder: "Aucune Icone",
    onChange: (_, data) => setSelectedIcon(data.value)
  });
};

var _default = IconDropdown; //aray of al the icons option and the way they render

exports.default = _default;
const iconsOption = [{
  key: 'birthday cake',
  value: 'birthday cake',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "birthday cake"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Anniversaire"))
}, {
  key: 'coffee',
  value: 'coffee',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "coffee"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Caf\xE9"))
}, {
  key: 'phone',
  value: 'phone',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "phone"
  }), /*#__PURE__*/_react.default.createElement("span", null, "T\xE9l\xE9phone"))
}, {
  key: 'suitcase',
  value: 'suitcase',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "suitcase"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Voyage"))
}, {
  key: 'hospital',
  value: 'hospital',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "hospital"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Hopital"))
}, {
  key: 'plane',
  value: 'plane',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "plane"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Avion"))
}, {
  key: 'taxi',
  value: 'taxi',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "taxi"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Taxi"))
}, {
  key: 'train',
  value: 'train',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "train"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Train"))
}, {
  key: 'utensils',
  value: 'utensils',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "utensils"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Repas"))
}, {
  key: 'exclamation',
  value: 'exclamation',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "exclamation"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Important"))
}, {
  key: 'address book',
  value: 'address book',
  text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "address book"
  }), /*#__PURE__*/_react.default.createElement("span", null, "Contact"))
}];