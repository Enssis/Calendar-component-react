import styled from 'styled-components'
import { Segment, Table, Grid, Button, Label, List, Icon, Header, Menu } from 'semantic-ui-react'
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
   background-color: ${props => props.backcolor};
`

export const DaySegment = styled(Segment)`
   max-height: 20px;
   font-size: 10px !important;
   padding: 2px !important;
   &:hover {
      background-color: ${props => darkerColor(props.theme.lightPrimaryColor, 20)} !important;
   }
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
   background-color: ${props => props.theme.defaultPrimaryColor} !important;
   &:hover {
      background-color: ${props => darkerColor(props.theme.defaultPrimaryColor, 10)} ${props => (props.nohover ? '' : '!important')};
   }
   ${props => (props.border ? 'border: 1px solid rgba(34, 36, 38, 0.15) !important;' : '')}
`

export const PaddingLessGridColumn = styled(Grid.Column)`
   padding-left: ${props => (props.paddingleft ? '' : '0px!important')};
   padding-right: ${props => (props.paddingright ? '' : '0px!important')};
`

export const PaddingLessTableCell = styled(Table.Cell)`
   padding: 0px !important;
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
      background-color: ${props => props.theme.lightPrimaryColor};
   }
`

export const StyledElement = styled(Element)`
   background-color: ${props => props.theme.lightPrimaryColor};
`

export const StyledSegment = styled(Segment)`
   background-color: ${props => props.theme.defaultPrimaryColor};
`

export const StyledHeader = styled(Header)`
   color: ${props => props.theme.textPrimaryColor};
`

export const StyledGridColumn = styled(Grid.Column)`
   background-color: ${props => props.theme.defaultPrimaryColor};
`

export const StyledMenuItem = styled(Menu.Item)`
   color: ${props => props.theme.textPrimaryColor} !important;
`
