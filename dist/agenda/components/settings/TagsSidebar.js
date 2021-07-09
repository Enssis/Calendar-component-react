"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _useImmer = require("use-immer");

var _constants = require("../../constants");

var _DispatchContext = _interopRequireDefault(require("../../DispatchContext"));

var _StateContext = _interopRequireDefault(require("../../StateContext"));

var _agenda = require("../../agenda.style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const TagsSidebar = () => {
  const appState = (0, _react.useContext)(_StateContext.default);
  const {
    tagsOpen,
    activeTags,
    languageFile,
    theme
  } = appState;
  const {
    active_tags,
    Actions
  } = languageFile;
  const appDispatch = (0, _react.useContext)(_DispatchContext.default);
  const [checkedTags, setCheckedTags] = (0, _useImmer.useImmer)(activeTags);
  const [tagsList, setTagsList] = (0, _useImmer.useImmer)(appState.tagsList);

  const handleClose = () => {
    appDispatch({
      type: _constants.CLOSE_TAGS
    });
  };

  const handleCheckboxChange = (key, data) => setCheckedTags(draft => {
    if (data.checked) draft[key] = tagsList[key];else delete draft[key];
  });

  const handleDeleteTag = key => {
    setTagsList(draft => {
      delete draft[key];
    });
  };

  const handleValidate = () => {
    appDispatch({
      type: _constants.SET_ACTIVE_TAG,
      value: checkedTags
    });
    appDispatch({
      type: _constants.SET_TAGS,
      value: tagsList
    });
    appDispatch({
      type: _constants.CLOSE_TAGS
    });
  };

  (0, _react.useEffect)(() => {
    setCheckedTags(activeTags);
    setTagsList(appState.tagsList);
  }, [tagsOpen]);
  return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Sidebar, {
    style: {
      backgroundColor: theme.darkPrimaryColor
    },
    animation: "overlay",
    as: _semanticUiReact.Segment,
    inverted: true,
    visible: tagsOpen,
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
    as: "h3"
  }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Icon, {
    name: "tags"
  }), " ", active_tags)), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, null), Object.entries(tagsList).map(_ref => {
    let [key, tag] = _ref;
    return /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, {
      key: key
    }, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label, {
      inverted: 1,
      image: true,
      as: "a",
      color: tag.color,
      onClick: () => handleDeleteTag(key)
    }, /*#__PURE__*/_react.default.createElement(_agenda.MargedIcon, {
      name: "cancel"
    }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Label.Detail, null, tag.name)), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Checkbox, {
      style: {
        paddingLeft: '10px',
        paddingTop: 4
      },
      onChange: (_, data) => handleCheckboxChange(key, data),
      checked: checkedTags[key] !== undefined
    }));
  }), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Divider, null), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Grid.Row, null, /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    positive: true,
    onClick: handleValidate
  }, Actions.confirm), /*#__PURE__*/_react.default.createElement(_semanticUiReact.Button, {
    negative: true,
    onClick: handleClose
  }, Actions.cancel))));
};

var _default = TagsSidebar;
exports.default = _default;