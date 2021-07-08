"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledDropdown = exports.StyledFormField = exports.StyledFormTextArea = exports.StyledFormCheckbox = exports.StyledFormInput = exports.StyledModalActions = exports.StyledModalContent = exports.StyledModalHeader = exports.StyledDivider = exports.DarkTableCell = exports.StyledButton = exports.ColoredPopupHeader = exports.DefaultPopup = exports.LightPopup = exports.LightSegment = exports.StyledMenuItem = exports.StyledGridColumn = exports.StyledHeader = exports.StyledSegment = exports.StyledElement = exports.BiggerTimePicker = exports.MargedIcon = exports.MonthListItem = exports.CustomLabel = exports.ColorButton = exports.SizedTableRow = exports.PaddingLessTableCell = exports.PaddingLessGridColumn = exports.SizedSegment = exports.NoPaddingSegment = exports.ScrollableSegment = exports.DaySegment = exports.MainSegmentGroup = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _semanticUiReact = require("semantic-ui-react");

var _colorConvert = _interopRequireDefault(require("color-convert"));

var _rcTimePicker = _interopRequireDefault(require("rc-time-picker"));

var _reactScroll = require("react-scroll");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//function wich get a hexadecimal color and return the color a little bit darker
const darkerColor = (hexColor, darkPercent) => {
  let [h, s, v] = _colorConvert.default.hex.hsv(hexColor);

  v = v - darkPercent;
  return '#' + _colorConvert.default.hsv.hex(h, s, v);
};

const MainSegmentGroup = (0, _styledComponents.default)(_semanticUiReact.Segment.Group)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n   background-color: ", ";\n"])), props => props.theme.defaultPrimaryColor);
exports.MainSegmentGroup = MainSegmentGroup;
const DaySegment = (0, _styledComponents.default)(_semanticUiReact.Segment)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n   max-height: 20px;\n   font-size: 10px !important;\n   padding: 2px !important;\n   color: ", ";\n   background-color: ", " !important;\n   &:hover {\n      background-color: ", " !important;\n   }\n   border: 1px solid ", " !important;\n"])), props => props.theme.textPrimaryColor, props => props.theme.darkPrimaryColor, props => darkerColor(props.theme.darkPrimaryColor, 20), props => props.theme.darkPrimaryColor);
exports.DaySegment = DaySegment;
const ScrollableSegment = (0, _styledComponents.default)(_semanticUiReact.Segment)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n   overflow: auto;\n   max-height: ", "px;\n   padding: ", ";\n"])), props => props.height, props => props.nopadding ? '0!important' : '');
exports.ScrollableSegment = ScrollableSegment;
const NoPaddingSegment = (0, _styledComponents.default)(_semanticUiReact.Segment)({
  padding: '0!important'
});
exports.NoPaddingSegment = NoPaddingSegment;
const SizedSegment = (0, _styledComponents.default)(_semanticUiReact.Segment)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n   overflow: auto;\n   padding: ", ";\n   ", "\n   margin: ", ";\n   background-color: ", " !important;\n   &:hover {\n      background-color: ", " ", ";\n   }\n   ", "\n"])), props => props.nopadding ? '0!important' : '', props => props.height > 0 ? "height: ".concat(props.height, "px;") : '', props => props.nomargin ? '0!important' : '', props => props.backcolor ? props.backcolor : props.dark ? props.theme.darkPrimaryColor : props.light ? props.theme.lightPrimaryColor : props.theme.defaultPrimaryColor, props => darkerColor(props.backcolor ? props.backcolor : props.dark ? props.theme.darkPrimaryColor : props.light ? props.theme.lightPrimaryColor : props.theme.defaultPrimaryColor, 10), props => props.nohover ? '' : '!important', props => props.border ? "border: 1px solid ".concat(props => props.theme.darkPrimaryColor, " !important;") : '');
exports.SizedSegment = SizedSegment;
const PaddingLessGridColumn = (0, _styledComponents.default)(_semanticUiReact.Grid.Column)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n   padding-left: ", ";\n   padding-right: ", ";\n"])), props => props.paddingleft ? '' : '0px!important', props => props.paddingright ? '' : '0px!important');
exports.PaddingLessGridColumn = PaddingLessGridColumn;
const PaddingLessTableCell = (0, _styledComponents.default)(_semanticUiReact.Table.Cell)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n   padding: 0px !important;\n   background-color: ", " !important;\n"])), props => props.theme.lightPrimaryColor);
exports.PaddingLessTableCell = PaddingLessTableCell;
const SizedTableRow = (0, _styledComponents.default)(_semanticUiReact.Table.Row)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n   height: ", "px;\n"])), props => props.height);
exports.SizedTableRow = SizedTableRow;
const ColorButton = (0, _styledComponents.default)(_semanticUiReact.Button)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   &:hover {\n      background-color: ", " !important;\n   }\n"])), props => props.backcolor, props => darkerColor(props.backcolor, 10));
exports.ColorButton = ColorButton;
const CustomLabel = (0, _styledComponents.default)(_semanticUiReact.Label)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   font-size: 10px !important;\n   padding: 7px 4px !important;\n   width: ", "% !important;\n   margin-left: ", "% !important;\n"])), props => props.backcolor, props => props.width ? props.width : 100, props => props.margleft ? props.margleft : 0);
exports.CustomLabel = CustomLabel;
const MonthListItem = (0, _styledComponents.default)(_semanticUiReact.List.Item)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n   padding: 4px 0 !important;\n   height: 18px !important;\n"])));
exports.MonthListItem = MonthListItem;
const MargedIcon = (0, _styledComponents.default)(_semanticUiReact.Icon)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n   margin-left: ", "px !important;\n   margin-right: ", "px !important;\n"])), props => props.margleft ? props.margleft : 0, props => props.margright ? props.margright : 0);
exports.MargedIcon = MargedIcon;
const BiggerTimePicker = (0, _styledComponents.default)(_rcTimePicker.default)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n   .rc-time-picker-input {\n      height: 40px;\n      font-size: 20px;\n      background-color: ", ";\n      color: ", " !important;\n   }\n"])), props => props.theme.defaultPrimaryColor, props => props.theme.textPrimaryColor);
exports.BiggerTimePicker = BiggerTimePicker;
const StyledElement = (0, _styledComponents.default)(_reactScroll.Element)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n   background-color: ", ";\n"])), props => props.theme.lightPrimaryColor);
exports.StyledElement = StyledElement;
const StyledSegment = (0, _styledComponents.default)(_semanticUiReact.Segment)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n   background-color: ", ";\n"])), props => props.theme.defaultPrimaryColor);
exports.StyledSegment = StyledSegment;
const StyledHeader = (0, _styledComponents.default)(_semanticUiReact.Header)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n   color: ", ";\n"])), props => props.accent ? props.theme.accentColor : props.theme.textPrimaryColor);
exports.StyledHeader = StyledHeader;
const StyledGridColumn = (0, _styledComponents.default)(_semanticUiReact.Grid.Column)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n   background-color: ", ";\n"])), props => props.theme.defaultPrimaryColor);
exports.StyledGridColumn = StyledGridColumn;
const StyledMenuItem = (0, _styledComponents.default)(_semanticUiReact.Menu.Item)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["\n   color: ", " !important;\n"])), props => props.theme.textPrimaryColor);
exports.StyledMenuItem = StyledMenuItem;
const LightSegment = (0, _styledComponents.default)(_semanticUiReact.Segment)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n"])), props => props.theme.lightPrimaryColor);
exports.LightSegment = LightSegment;
const LightPopup = (0, _styledComponents.default)(_semanticUiReact.Popup)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   &:before {\n      background-color: ", " !important;\n   }\n"])), props => props.theme.lightPrimaryColor, props => props.theme.lightPrimaryColor);
exports.LightPopup = LightPopup;
const DefaultPopup = (0, _styledComponents.default)(_semanticUiReact.Popup)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   &:before {\n      background-color: ", " !important;\n   }\n"])), props => props.theme.defaultPrimaryColor, props => props.theme.defaultPrimaryColor);
exports.DefaultPopup = DefaultPopup;
const ColoredPopupHeader = (0, _styledComponents.default)(_semanticUiReact.Popup.Header)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["\n   color: ", " !important;\n"])), props => props.theme.textPrimaryColor);
exports.ColoredPopupHeader = ColoredPopupHeader;
const StyledButton = (0, _styledComponents.default)(_semanticUiReact.Button)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   color: ", " !important;\n"])), props => props.light ? props.theme.lightPrimaryColor : props.theme.darkPrimaryColor, props => props.theme.textPrimaryColor);
exports.StyledButton = StyledButton;
const DarkTableCell = (0, _styledComponents.default)(_semanticUiReact.Table.Cell)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   color: ", " !important;\n"])), props => props.theme.darkPrimaryColor, props => props.theme.textPrimaryColor);
exports.DarkTableCell = DarkTableCell;
const StyledDivider = (0, _styledComponents.default)(_semanticUiReact.Divider)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n"])), props => props.theme.dividerColor);
exports.StyledDivider = StyledDivider;
const StyledModalHeader = (0, _styledComponents.default)(_semanticUiReact.Modal.Header)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   color: ", " !important;\n"])), props => props.theme.defaultPrimaryColor, props => props.theme.textPrimaryColor);
exports.StyledModalHeader = StyledModalHeader;
const StyledModalContent = (0, _styledComponents.default)(_semanticUiReact.Modal.Content)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   color: ", " !important;\n"])), props => props.light ? props.theme.lightPrimaryColor : props.theme.defaultPrimaryColor, props => props.theme.textPrimaryColor);
exports.StyledModalContent = StyledModalContent;
const StyledModalActions = (0, _styledComponents.default)(_semanticUiReact.Modal.Actions)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n"])), props => props.light ? props.theme.lightPrimaryColor : props.theme.defaultPrimaryColor);
exports.StyledModalActions = StyledModalActions;
const StyledFormInput = (0, _styledComponents.default)(_semanticUiReact.Form.Input)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["\n   input {\n      background-color: ", " !important;\n   }\n   label,\n   input::placeholder {\n      color: ", " !important;\n   }\n"])), props => props.theme.darkPrimaryColor, props => props.theme.textPrimaryColor);
exports.StyledFormInput = StyledFormInput;
const StyledFormCheckbox = (0, _styledComponents.default)(_semanticUiReact.Form.Checkbox)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["\n   label::before {\n      background-color: ", " !important;\n   }\n   label {\n      color: ", " !important;\n   }\n"])), props => props.theme.darkPrimaryColor, props => props.theme.textPrimaryColor);
exports.StyledFormCheckbox = StyledFormCheckbox;
const StyledFormTextArea = (0, _styledComponents.default)(_semanticUiReact.Form.TextArea)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["\n   textArea {\n      background-color: ", " !important;\n   }\n   label,\n   textArea::placeholder {\n      color: ", " !important;\n   }\n"])), props => props.theme.darkPrimaryColor, props => props.theme.textPrimaryColor);
exports.StyledFormTextArea = StyledFormTextArea;
const StyledFormField = (0, _styledComponents.default)(_semanticUiReact.Form.Field)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["\n   label {\n      color: ", " !important;\n   }\n"])), props => props.theme.textPrimaryColor);
exports.StyledFormField = StyledFormField;
const StyledDropdown = (0, _styledComponents.default)(_semanticUiReact.Dropdown)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["\n   background-color: ", " !important;\n   & > div > .item {\n      background-color: ", " !important;\n      color: ", " !important;\n   }\n   & > div > .item:hover {\n      background-color: ", " !important;\n   }\n\n   & > div {\n      border-color: ", " !important;\n      background-color: ", " !important;\n      color: ", " !important;\n   }\n   border-color: ", " !important;\n"])), props => props.default ? props.theme.defaultPrimaryColor : props.theme.darkPrimaryColor, props => props.default ? props.theme.defaultPrimaryColor : props.theme.darkPrimaryColor, props => props.theme.textPrimaryColor, props => props.default ? props.theme.darkPrimaryColor : props.theme.defaultPrimaryColor, props => props.theme.accentColor, props => props.default ? props.theme.defaultPrimaryColor : props.theme.darkPrimaryColor, props => props.theme.textPrimaryColor, props => props.theme.accentColor);
exports.StyledDropdown = StyledDropdown;