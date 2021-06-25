import React, { useContext, useEffect, useState } from "react"
import { Divider, Table, Dimmer, Loader, Segment } from "semantic-ui-react"
import { ScrollableSegment, PaddingLessTableCell } from "../calendar.style"
import EventSegment from "./EventSegment"
import { SizedTableRow } from "../calendar.style"
import moment from "moment"
import StateContext from "../../StateContext"
import { Element, scroller } from "react-scroll"
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
   const [firstEventReady, setFirstEventReady] = useState(false)

   //set the events of the day
   useEffect(() => {
      const date = props.date.format("YYYY MM DD")
      const propEvent = appState.event[date]
      setEvent(propEvent ? propEvent : [])
      setFirstEventReady(false)
   }, [props.date, appState.event])

   //set the list of event of the day classed by quarter of hours
   useEffect(() => {
      setQuarterHourEvents(q => {
         const eventKeyCol = {}
         const colEvent = Array(24 * 4).fill([])
         let nbColMax = 1
         let firstElement = true
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
                                                <EventPopup
                                                   key={row}
                                                   trigger={
                                                      <Element name="firstEvent">
                                                         <EventSegment moment={quarterHourEvent.time} event={value} size={value.timeInfo.duration * 40} />
                                                      </Element>
                                                   }
                                                   event={value}
                                                />
                                             )
                                          } else
                                             return (
                                                <EventPopup
                                                   key={row}
                                                   trigger={
                                                      <div>
                                                         <EventSegment moment={quarterHourEvent.time} event={value} size={value.timeInfo.duration * 40} />
                                                      </div>
                                                   }
                                                   event={value}
                                                ></EventPopup>
                                             )
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
