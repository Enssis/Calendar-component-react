import styled from "styled-components"
import { Segment, Table, Grid, Button, Label, List } from "semantic-ui-react"
import convert from "color-convert"

//function wich get a hexadecimal color and return the color a little bit darker
const darkerColor = (hexColor, darkPercent) => {
   let [h, s, v] = convert.hex.hsv(hexColor)
   v = v - darkPercent
   return "#" + convert.hsv.hex(h, s, v)
}

const MainSegmentGroup = styled(Segment.Group)({
   background: "#e3fcfc"
})

const DaySegment = styled(Segment)`
   max-height: 20px;
   font-size: 10px !important;
   padding: 2px !important;
   &:hover {
      background-color: ${props => darkerColor(props.backcolor, 20)} !important;
   }
`

const ScrollableSegment = styled(Segment)`
   overflow: auto;
   max-height: ${props => props.height}px;
   padding: ${props => (props.nopadding ? "0!important" : "")};
`

const NoPaddingSegment = styled(Segment)({
   padding: "0!important"
})

const SizedSegment = styled(Segment)`
   overflow: auto;
   padding: ${props => (props.nopadding ? "0!important" : "")};
   ${props => (props.height > 0 ? `height: ${props.height}px;` : "")}
   margin: ${props => (props.nomargin ? "0!important" : "")};
   background-color: ${props => props.backcolor} !important;
   &:hover {
      background-color: ${props => darkerColor(props.backcolor, 10)} ${props => (props.nohover ? "" : "!important")};
   }
   ${props => (props.border ? "border: 1px solid rgba(34, 36, 38, 0.15) !important;" : "")}
`

const PaddingLessGridColumn = styled(Grid.Column)`
   padding-left: ${props => (props.paddingleft ? "" : "0px!important")};
   padding-right: ${props => (props.paddingright ? "" : "0px!important")};
`

const PaddingLessTableCell = styled(Table.Cell)`
   padding: 0px !important;
`

const SizedTableRow = styled(Table.Row)`
   height: ${props => props.height}px;
`
const ColorButton = styled(Button)`
   background-color: ${props => props.backcolor} !important;
   &:hover {
      background-color: ${props => darkerColor(props.backcolor, 10)} !important;
   }
`

const CustomLabel = styled(Label)`
   background-color: ${props => props.backcolor} !important;
   font-size: 10px !important;
   padding: 4px !important;
   width: ${props => (props.width ? props.width : 100)}% !important;
   margin-left: ${props => (props.margLeft ? props.margLeft : 0)}% !important;
`

const MonthListItem = styled(List.Item)`
   padding: 0px !important;
   height: 12px !important;
`

export { MainSegmentGroup, DaySegment, ScrollableSegment, PaddingLessGridColumn, PaddingLessTableCell, NoPaddingSegment, SizedTableRow, SizedSegment, ColorButton, CustomLabel, MonthListItem }
