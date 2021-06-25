import React, { useContext, useEffect, useState, useRef } from "react"
import { Table, Dimmer, Loader, Segment, Header, Icon } from "semantic-ui-react"
import { ScrollableSegment, PaddingLessTableCell, SizedSegment } from "../calendar.style"
import { SizedTableRow } from "../calendar.style"
import moment from "moment"
import StateContext from "../../StateContext"
import EventPopup from "./EventPopup"

function createContextFromEvent(e) {
   const left = e.clientX
   const top = e.clientY
   const right = left + 1
   const bottom = top + 1

   return {
      getBoundingClientRect: () => ({
         left,
         top,
         right,
         bottom,

         height: 0,
         width: 0
      })
   }
}

const HourCase = props => {
   const appState = useContext(StateContext)
   const hours = Array.from(Array(24).keys())
   const date = props.date
   const [open, setOpen] = useState(false)
   const contextRef = useRef(null)

   //event by hour
   const [quarterHourEvents, setQuarterHourEvents] = useState(
      Array.from(Array(24 * 4).keys()).map(key => ({
         time: moment({ year: date.year(), month: date.month(), date: date.date(), hour: Math.floor(key / 4), minute: 15 * (key % 4) }),
         event: {}
      }))
   )

   const [isLoading, setIsLoading] = useState(true)
   const [nbCol, setNbCol] = useState(1)
   const [event, setEvent] = useState([])

   useEffect(() => {
      const date = props.date.format("YYYY MM DD")
      const propEvent = appState.event[date]
      setEvent(propEvent ? propEvent : [])
   }, [props.date, appState.event])

   //set the list of event of the day classed by quarter of hours
   useEffect(() => {
      setQuarterHourEvents(q => {
         let nbColMax = 1
         let changedCols = {}
         const newQHE = q.map((element, key) => {
            let filteredEvent = {}
            let nonDisponibleCols = []
            //for each event add it if the quarter of hour contain it
            event.forEach(value => {
               let startDiff = 0
               const { start, end, column } = value.timeInfo
               if ((startDiff = start.diff(element.time)) <= 0 && end.diff(element.time) > 0) {
                  let isStart = false

                  //say if it is the first quarter of the event
                  if (startDiff > -450000) {
                     isStart = true
                  }

                  //check if it take the first col available
                  let col = column

                  //if this event have it's cols already changed assign this value to col
                  if (changedCols[event.key] !== undefined) col = changedCols[event.key]
                  //else, if it's a start and the col before is available, it take it
                  else if (col - 1 >= 0 && nonDisponibleCols.indexOf(col - 1) < 0 && isStart) {
                     col--
                     changedCols[event.key] = col
                  }
                  //add event's col to col which are taken
                  nonDisponibleCols = nonDisponibleCols.concat(col)

                  filteredEvent[col] = { value, isStart }
               }
            })
            if (Object.keys(filteredEvent).length > nbColMax) nbColMax = Object.keys(filteredEvent).length

            return {
               event: filteredEvent,
               time: element.time
            }
         })
         setNbCol(nbColMax)
         return newQHE
      })

      setIsLoading(false)
   }, [event])

   return (
      <ScrollableSegment height={800} nopadding={1} basic>
         <Table>
            <Table.Body>
               <SizedTableRow height={160}>
                  {Array(nbCol)
                     .fill()
                     .map((_, col) => (
                        <PaddingLessTableCell key={col} textAlign="center" width={1}>
                           {isLoading ? (
                              <Dimmer active inverted>
                                 <Loader />
                              </Dimmer>
                           ) : (
                              <Segment.Group>
                                 {quarterHourEvents.map((quarterHourEvent, row) => {
                                    const event = quarterHourEvent.event[col]

                                    if (event) {
                                       const { isStart, value } = event
                                       if (isStart)
                                          return (
                                             <SizedSegment
                                                nomargin={1}
                                                nopadding={1}
                                                height={value.timeInfo.duration * 8}
                                                vertical
                                                backcolor={value.color}
                                                onMouseLeave={() => setOpen(false)}
                                                onMouseMove={e => {
                                                   e.preventDefault()
                                                   contextRef.current = createContextFromEvent(e)
                                                   setOpen(true)
                                                }}
                                             >
                                                <EventPopup context={contextRef} event={value} open={open} onClose={() => setOpen(false)} />
                                                {nbCol <= 2 ? (
                                                   <Header as="h5" style={{ paddingTop: value.timeInfo.duration * 4 - 8 }}>
                                                      <Icon name={value.icon} size="tiny" />
                                                      {" " + value.title}
                                                   </Header>
                                                ) : (
                                                   ""
                                                )}
                                             </SizedSegment>
                                          )
                                       else return ""
                                    }

                                    return <SizedSegment nohover={1} basic nomargin={1} nopadding={1} height={8} vertical backcolor="#ffffff"></SizedSegment>
                                 })}
                              </Segment.Group>
                           )}
                        </PaddingLessTableCell>
                     ))}
               </SizedTableRow>
            </Table.Body>
         </Table>
      </ScrollableSegment>
   )
}

export default HourCase
