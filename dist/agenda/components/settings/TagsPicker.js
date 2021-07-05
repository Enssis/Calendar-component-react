"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _useImmer = require("use-immer");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const TagsPicker = props => {
  const {
    tagsList
  } = (0, _react.useContext)(_StateContext.default).settings;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const {
    tags,
    setTags
  } = props;
  const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
  const colorsDropdown = colors.map(color => ({
    key: color,
    value: color,
    text: color,
    label: {
      color,
      empty: true,
      circular: true
    }
  }));
  const [newTagModal, setNewTagModal] = (0, _react.useState)(false);
  const [newTag, setNewTag] = (0, _useImmer.useImmer)({
    name: '',
    color: 'red'
  }); //list of tags

  const tagDropdown = Object.entries(tagsList).map(_ref => {
    let [key, value] = _ref;
    return {
      key,
      value: key,
      text: value.name,
      label: {
        color: value.color,
        empty: true,
        circular: true
      }
    };
  }).concat({
    key: 'ADD',
    value: 'ADD',
    text: 'Créer un nouveau tag'
  }); //customize render for the labels

  const renderLabel = label => {
    if (label.value !== 'ADD') return {
      color: tagsList[label.value].color,
      content: label.text
    };
  };

  const handleDropdownChange = (_, data) => {
    if (data.value.indexOf('ADD') < 0) setTags(data.value);else setNewTagModal(true);
  };

  const makeKey = len => {
    let res = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLen = chars.length;

    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * charsLen));
    }

    return res;
  };

  const handleCreate = () => {
    if (newTag.name.length > 0) {
      const newTagsList = Object.assign({}, tagsList);
      let key = '';

      do {
        key = makeKey(5);
      } while (newTagsList[key] !== undefined);

      newTagsList[key] = newTag;
      console.log(tags.concat(newTag));
      setTags(tags.concat(key));
      appDispatch({
        type: _constants.SET_TAGS,
        value: newTagsList
      });
      appDispatch({
        type: _constants.ADD_ACTIVE_TAG,
        value: newTag,
        key
      });
      setNewTag({
        name: '',
        color: 'red'
      });
      setNewTagModal(false);
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal, {
    size: "small",
    open: newTagModal,
    onClose: () => setNewTagModal(false)
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal.Header, null, "Cr\xE9er un nouveau tag"), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal.Content, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Form, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Form.Input, {
    label: "Nom",
    placeholder: "Nom",
    text: newTag.name,
    onChange: (_, data) => setNewTag(draft => {
      draft.name = data.value;
    })
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Form.Field, {
    label: "Couleur",
    control: _semanticUiReact.Dropdown,
    value: newTag.color,
    selection: true,
    options: colorsDropdown,
    onChange: (_, data) => setNewTag(draft => {
      draft.color = data.value;
    })
  }))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Modal.Actions, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleCreate
  }, "Cr\xE9er"), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    negative: true,
    onClick: () => setNewTagModal(false)
  }, "Annuler"))), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Dropdown, {
    selection: true,
    fluid: true,
    selectOnNavigation: false,
    noResultsMessage: null,
    multiple: true,
    value: tags,
    search: true,
    placeholder: "Tag",
    renderLabel: renderLabel,
    options: tagDropdown,
    onChange: handleDropdownChange
  }));
};

var _default = TagsPicker;
exports.default = _default;