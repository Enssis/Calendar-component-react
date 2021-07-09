import styled from 'styled-components'
import { Segment, Table, Grid, Button, Label, List, Icon, Header, Menu, Popup, Divider, Modal, Form, Dropdown } from 'semantic-ui-react'
import convert from 'color-convert'
import TimePicker from 'rc-time-picker'
import { Element } from 'react-scroll'

//function wich get a hexadecimal color and return the color a little bit darker
const darkerColor = (hexColor, darkPercent) => {
   let [h, s, v] = convert.hex.hsv(hexColor)
   v = v - darkPercent
   return '#' + convert.hsv.hex(h, s, v)
}

export const MainSegmentGroup = styled(Segment.Group)`
   background-color: ${props => props.theme.defaultPrimaryColor};
`

export const DaySegment = styled(Segment)`
   max-height: 20px;
   font-size: 10px !important;
   padding: 2px !important;
   color: ${props => props.theme.textPrimaryColor};
   background-color: ${props => props.theme.darkPrimaryColor} !important;
   &:hover {
      background-color: ${props => darkerColor(props.theme.darkPrimaryColor, 20)} !important;
   }
   border: 1px solid ${props => props.theme.darkPrimaryColor} !important;
`

export const ScrollableSegment = styled(Segment)`
   overflow: auto;
   max-height: ${props => props.height}px;
   padding: ${props => (props.nopadding ? '0!important' : '')};
`

export const NoPaddingSegment = styled(Segment)({
   padding: '0!important'
})

export const SizedSegment = styled(Segment)`
   overflow: auto;
   padding: ${props => (props.nopadding ? '0!important' : '')};
   ${props => (props.height > 0 ? `height: ${props.height}px;` : '')}
   margin: ${props => (props.nomargin ? '0!important' : '')};
   background-color: ${props => (props.backcolor ? props.backcolor : props.dark ? props.theme.darkPrimaryColor : props.light ? props.theme.lightPrimaryColor : props.theme.defaultPrimaryColor)} !important;
   &:hover {
      background-color: ${props => darkerColor(props.backcolor ? props.backcolor : props.dark ? props.theme.darkPrimaryColor : props.light ? props.theme.lightPrimaryColor : props.theme.defaultPrimaryColor, 10)} ${props => (props.nohover ? '' : '!important')};
   }
   ${props => (props.border ? `border: 1px solid ${props => props.theme.darkPrimaryColor} !important;` : '')}
`

export const PaddingLessGridColumn = styled(Grid.Column)`
   padding-left: ${props => (props.paddingleft ? '' : '0px!important')};
   padding-right: ${props => (props.paddingright ? '' : '0px!important')};
`

export const PaddingLessTableCell = styled(Table.Cell)`
   padding: 0px !important;
   background-color: ${props => props.theme.lightPrimaryColor} !important;
`

export const SizedTableRow = styled(Table.Row)`
   height: ${props => props.height}px;
`
export const ColorButton = styled(Button)`
   background-color: ${props => props.backcolor} !important;
   &:hover {
      background-color: ${props => darkerColor(props.backcolor, 10)} !important;
   }
`

export const CustomLabel = styled(Label)`
   background-color: ${props => props.backcolor} !important;
   font-size: 10px !important;
   padding: 7px 4px !important;
   width: ${props => (props.width ? props.width : 100)}% !important;
   margin-left: ${props => (props.margleft ? props.margleft : 0)}% !important;
`

export const MonthListItem = styled(List.Item)`
   padding: 4px 0 !important;
   height: 18px !important;
`

export const MargedIcon = styled(Icon)`
   margin-left: ${props => (props.margleft ? props.margleft : 0)}px !important;
   margin-right: ${props => (props.margright ? props.margright : 0)}px !important;
`

export const BiggerTimePicker = styled(TimePicker)`
   .rc-time-picker-input {
      height: 40px;
      font-size: 20px;
      background-color: ${props => props.theme.defaultPrimaryColor};
      color: ${props => props.theme.textPrimaryColor} !important;
   }
`

export const StyledElement = styled(Element)`
   background-color: ${props => props.theme.lightPrimaryColor};
`

export const StyledSegment = styled(Segment)`
   background-color: ${props => props.theme.defaultPrimaryColor};
`

export const StyledHeader = styled(Header)`
   color: ${props => (props.accent ? props.theme.accentColor : props.theme.textPrimaryColor)};
`

export const StyledGridColumn = styled(Grid.Column)`
   background-color: ${props => props.theme.defaultPrimaryColor};
`

export const StyledMenuItem = styled(Menu.Item)`
   color: ${props => props.theme.textPrimaryColor} !important;
`
export const LightSegment = styled(Segment)`
   background-color: ${props => props.theme.lightPrimaryColor} !important;
`

export const LightPopup = styled(Popup)`
   background-color: ${props => props.theme.lightPrimaryColor} !important;
   &:before {
      background-color: ${props => props.theme.lightPrimaryColor} !important;
   }
`

export const DefaultPopup = styled(Popup)`
   background-color: ${props => props.theme.defaultPrimaryColor} !important;
   &:before {
      background-color: ${props => props.theme.defaultPrimaryColor} !important;
   }
`
export const ColoredPopupHeader = styled(Popup.Header)`
   color: ${props => props.theme.textPrimaryColor} !important;
`

export const StyledButton = styled(Button)`
   background-color: ${props => (props.light ? props.theme.lightPrimaryColor : props.theme.darkPrimaryColor)} !important;
   color: ${props => props.theme.textPrimaryColor} !important;
`

export const DarkTableCell = styled(Table.Cell)`
   background-color: ${props => props.theme.darkPrimaryColor} !important;
   color: ${props => props.theme.textPrimaryColor} !important;
`

export const StyledDivider = styled(Divider)`
   background-color: ${props => props.theme.dividerColor} !important;
`

export const StyledModalHeader = styled(Modal.Header)`
   background-color: ${props => props.theme.defaultPrimaryColor} !important;
   color: ${props => props.theme.textPrimaryColor} !important;
`

export const StyledModalContent = styled(Modal.Content)`
   background-color: ${props => (props.light ? props.theme.lightPrimaryColor : props.theme.defaultPrimaryColor)} !important;
   color: ${props => props.theme.textPrimaryColor} !important;
`

export const StyledModalActions = styled(Modal.Actions)`
   background-color: ${props => (props.light ? props.theme.lightPrimaryColor : props.theme.defaultPrimaryColor)} !important;
`

export const StyledFormInput = styled(Form.Input)`
   input {
      background-color: ${props => props.theme.darkPrimaryColor} !important;
      color: ${props => props.theme.textPrimaryColor} !important;
   }
   label,
   input::placeholder {
      color: ${props => props.theme.textPrimaryColor} !important;
   }
`

export const StyledFormCheckbox = styled(Form.Checkbox)`
   label::before {
      background-color: ${props => props.theme.darkPrimaryColor} !important;
   }
   label {
      color: ${props => props.theme.textPrimaryColor} !important;
   }
`

export const StyledFormTextArea = styled(Form.TextArea)`
   textArea {
      background-color: ${props => props.theme.darkPrimaryColor} !important;
      color: ${props => props.theme.textPrimaryColor} !important;
   }
   label,
   textArea::placeholder {
      color: ${props => props.theme.textPrimaryColor} !important;
   }
`

export const StyledFormField = styled(Form.Field)`
   label {
      color: ${props => props.theme.textPrimaryColor} !important;
   }
`

export const StyledDropdown = styled(Dropdown)`
   background-color: ${props => (props.default ? props.theme.defaultPrimaryColor : props.theme.darkPrimaryColor)} !important;
   & > div > .item {
      background-color: ${props => (props.default ? props.theme.defaultPrimaryColor : props.theme.darkPrimaryColor)} !important;
      color: ${props => props.theme.textPrimaryColor} !important;
   }
   & > div > .item:hover {
      background-color: ${props => (props.default ? props.theme.darkPrimaryColor : props.theme.defaultPrimaryColor)} !important;
   }

   & > div {
      border-color: ${props => props.theme.accentColor} !important;
      background-color: ${props => (props.default ? props.theme.defaultPrimaryColor : props.theme.darkPrimaryColor)} !important;
      color: ${props => props.theme.textPrimaryColor} !important;
   }
   border-color: ${props => props.theme.accentColor} !important;
`
