import React, { useContext, useEffect, useState } from "react"
import { Table, Dimmer, Loader, Segment, Header, Icon } from "semantic-ui-react"
import { ScrollableSegment, PaddingLessTableCell, SizedSegment } from "../calendar.style"
import { SizedTableRow } from "../calendar.style"
import moment from "moment"
import StateContext from "../../StateContext"
import EventPopup from "./EventPopup"

const HourCase = props => {
   const appState = useContext(StateContext)
   const hours = Array.from(Array(24).keys())
   const date = props.date

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
         const eventKeyCol = {}
         const colEvent = Array(24 * 4).fill([])
         let nbColMax = 1
         const newQHE = q.map((element, key) => {
            let filteredEvent = {}
            //for each event add it if the quarter of hour contain it

            event.forEach(value => {
               let startDiff = 0
               const { start, end, duration } = value.timeInfo
               if ((startDiff = start.diff(element.time)) <= 0 && end.diff(element.time) > 0) {
                  let isStart = false

                  //say if it is the first quarter of the event
                  if (startDiff > -450000) {
                     isStart = true
                  }

                  let col = 0
                  if (eventKeyCol[value.key] || eventKeyCol[value.key] === 0) {
                     col = eventKeyCol[value.key]
                  } else {
                     col = colEvent[key].length
                     eventKeyCol[value.key] = col
                     for (let i = key; i < key + (duration - 1); i++) {
                        colEvent[i][col] = value
                     }
                  }

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
                                             <EventPopup
                                                trigger={
                                                   <div>
                                                      <SizedSegment nomargin={1} nopadding={1} height={value.timeInfo.duration * 8} vertical backcolor={value.color}>
                                                         {nbCol <= 2 ? (
                                                            <Header as="h5" style={{ paddingTop: value.timeInfo.duration * 4 - 8 }}>
                                                               <Icon name={value.icon} size="tiny" />
                                                               {" " + value.title}
                                                            </Header>
                                                         ) : (
                                                            ""
                                                         )}
                                                      </SizedSegment>
                                                   </div>
                                                }
                                                event={value}
                                             />
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
