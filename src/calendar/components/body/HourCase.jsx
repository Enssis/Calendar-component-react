import React, { useContext, useEffect, useState } from "react"
import { Divider, Table, Dimmer, Loader, Segment } from "semantic-ui-react"
import { ScrollableSegment, PaddingLessTableCell } from "../calendar.style"
import EventSegment from "./EventSegment"
import { SizedTableRow } from "../calendar.style"
import moment from "moment"
import StateContext from "../../StateContext"
import { Element, scroller } from "react-scroll"

const HourCase = props => {
   const appState = useContext(StateContext)
   const hours = Array.from(Array(24).keys())
   const { date } = props

   //event in each time block
   const [quarterHourEvents, setQuarterHourEvents] = useState(
      Array.from(Array(24 * 4).keys()).map(key => ({
         time: moment({ year: date.year(), month: date.month(), date: date.date(), hour: Math.floor(key / 4), minute: 15 * (key % 4) }),
         event: {}
      }))
   )

   //used to show nothing if all events haven't finished to load
   const [isLoading, setIsLoading] = useState(true)
   //nb max de columns
   const [nbCol, setNbCol] = useState(1)
   //list of events in this day
   const [event, setEvent] = useState([])
   //used to know if the first event has been mounted
   const [firstEventReady, setFirstEventReady] = useState(false)

   //set the events of the day
   useEffect(() => {
      const dateFormat = date.format("YYYY MM DD")
      const propEvent = appState.event[dateFormat]
      setEvent(propEvent ? propEvent : [])
      setFirstEventReady(false)
   }, [date, appState.event])

   //set the list of event of the day by quarter of hours
   useEffect(() => {
      setQuarterHourEvents(q => {
         let nbColMax = 1
         let firstElement = true
         let changedCols = {}
         const newQHE = q.map(element => {
            let nonDisponibleCols = []
            let filteredEvent = {}
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

                  filteredEvent[col] = { value, isStart, firstElement }
                  if (firstElement) firstElement = false
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

   //function to set the scroll
   const scrollToFirstElement = () => {
      scroller.scrollTo("firstEvent", {
         duration: 400,
         delay: 0,
         smooth: "easeInOutQuart",
         containerId: "container"
      })
   }

   useEffect(() => {
      if (firstEventReady && event.length > 0) {
         scrollToFirstElement()
      }
   }, [firstEventReady, event.length])

   return (
      <ScrollableSegment height={800} nopadding={1} basic id="container">
         <Table celled definition>
            <Table.Body>
               <SizedTableRow height={160}>
                  {hours.map((hour, key) => {
                     return (
                        <SizedTableRow key={key} height={160}>
                           {isLoading ? (
                              <Dimmer active inverted>
                                 <Loader />
                              </Dimmer>
                           ) : (
                              <Table.Cell textAlign="center" width={1} verticalAlign="top">
                                 <Divider fitted />
                                 {hour}
                              </Table.Cell>
                           )}
                        </SizedTableRow>
                     )
                  })}

                  {Array(nbCol)
                     .fill()
                     .map((_, col) => (
                        <PaddingLessTableCell key={col} textAlign="center" width={Math.ceil(15 / nbCol)}>
                           {isLoading ? (
                              <Dimmer active inverted>
                                 <Loader />
                              </Dimmer>
                           ) : (
                              <Segment.Group>
                                 {quarterHourEvents.map((quarterHourEvent, row) => {
                                    const event = quarterHourEvent.event[col]

                                    if (event) {
                                       const { isStart, value, firstElement } = event
                                       if (isStart) {
                                          if (firstElement) {
                                             if (!firstEventReady) setFirstEventReady(true)
                                             return (
                                                <Element name="firstEvent">
                                                   <EventSegment moment={quarterHourEvent.time} event={value} size={value.timeInfo.duration * 40} />
                                                </Element>
                                             )
                                          } else return <EventSegment moment={quarterHourEvent.time} event={value} size={value.timeInfo.duration * 40} />
                                       } else return ""
                                    }
                                    return <EventSegment key={row} event={null} moment={quarterHourEvent.time} size={40} />
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
