"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BiggerTimePicker = exports.MargedIcon = exports.MonthListItem = exports.CustomLabel = exports.ColorButton = exports.SizedTableRow = exports.PaddingLessTableCell = exports.PaddingLessGridColumn = exports.SizedSegment = exports.NoPaddingSegment = exports.ScrollableSegment = exports.DaySegment = exports.MainSegmentGroup = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _semanticUiReact = require("semantic-ui-react");

var _colorConvert = _interopRequireDefault(require("color-convert"));

var _rcTimePicker = _interopRequireDefault(require("rc-time-picker"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//function wich get a hexadecimal color and return the color a little bit darker
const darkerColor = (hexColor, darkPercent) => {
  let [h, s, v] = _colorConvert.default.hex.hsv(hexColor);

  v = v - darkPercent;
  return '#' + _colorConvert.default.hsv.hex(h, s, v);
};

const MainSegmentGroup = (0, _styledComponents.default)(_semanticUiReact.Segment.Group)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n   background-color: ", ";\n"])), props => props.backcolor);
exports.MainSegmentGroup = MainSegmentGroup;
const DaySegment = (0, _styledComponents.default)(_semanticUiReact.Segment)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n   max-height: 20px;\n   font-size: 10px !important;\n   padding: 2px !important;\n   &:hover {\n      background-color: ", " !important;\n   }\n"])), props => darkerColor(props.backcolor, 20));
exports.DaySegment = DaySegment;
const ScrollableSegment = (0, _styledComponents.default)(_semanticUiReact.Segment)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n   overflow: auto;\n   max-height: ", "px;\n   padding: ", ";\n"])), props => props.height, props => props.nopadding ? '0!important' : '');
exports.ScrollableSegment = ScrollableSegment;
const NoPaddingSegment = (0, _styledComponents.default)(_semanticUiReact.Segment)({
  padding: '0!important'
});
exports.NoPaddingSegment = NoPaddingSegment;
const SizedSegment = (0, _styledComponents.default)(_semanticUiReact.Segment)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n   overflow: auto;\n   padding: ", ";\n   ", "\n   margin: ", ";\n   background-color: ", " !important;\n   &:hover {\n      background-color: ", " ", ";\n   }\n   ", "\n"])), props => props.nopadding ? '0!important' : '', props => props.height > 0 ? "height: ".concat(props.height, "px;") : '', props => props.nomargin ? '0!important' : '', props => props.backcolor, props => darkerColor(props.backcolor, 10), props => props.nohover ? '' : '!important', props => props.border ? 'border: 1px solid rgba(34, 36, 38, 0.15) !important;' : '');
exports.SizedSegment = SizedSegment;
const PaddingLessGridColumn = (0, _styledComponents.default)(_semanticUiReact.Grid.Column)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n   padding-left: ", ";\n   padding-right: ", ";\n"])), props => props.paddingleft ? '' : '0px!important', props => props.paddingright ? '' : '0px!important');
exports.PaddingLessGridColumn = PaddingLessGridColumn;
const PaddingLessTableCell = (0, _styledComponents.default)(_semanticUiReact.Table.Cell)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n   padding: 0px !important;\n"])));
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
const BiggerTimePicker = (0, _styledComponents.default)(_rcTimePicker.default)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n   .rc-time-picker-input {\n      height: 40px;\n      font-size: 20px;\n      background-color: ", ";\n   }\n"])), props => props.color);
exports.BiggerTimePicker = BiggerTimePicker;