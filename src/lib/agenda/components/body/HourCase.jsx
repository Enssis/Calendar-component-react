import React, { useContext, useEffect, useState } from 'react'
import { Element, scroller } from 'react-scroll'
import moment from 'moment'
//context
import StateContext from '../../StateContext'
//components
import { Divider, Table, Dimmer, Loader, Segment, Icon, Header } from 'semantic-ui-react'
import { ScrollableSegment, PaddingLessTableCell, SizedTableRow, SizedSegment, DarkTableCell, StyledDivider } from '../../agenda.style'
import EventSegment from './EventSegment'
import EventPopup from './EventPopup'
import DispatchContext from '../../DispatchContext'
import { MODIF, OPEN_MODAL } from '../../constants'
import { useImmer } from 'use-immer'

/*
   Component rendering all the events of the day by time block defined
*/
const HourCase = props => {
   const { event, nbrTimeRange, settings, activeTags, zoom, theme } = useContext(StateContext)
   const { caseBackground } = theme
   const appDispatch = useContext(DispatchContext)
   const hours = Array.from(Array(24).keys())
   const { date, week } = props

   // open the modification modal with the current event if modification is allowed
   const handleModifClick = ev => {
      if (settings.allowModification || settings.allowModification === undefined) appDispatch({ type: OPEN_MODAL, mode: MODIF, event: ev })
   }

   //event in each time block
   const [partHourEvents, setPartHourEvents] = useImmer(
      Array.from(Array(288 / nbrTimeRange).keys()).map(key => ({
         time: moment({ year: date.year(), month: date.month(), date: date.date(), hour: Math.floor((nbrTimeRange * key) / 12), minute: nbrTimeRange * 5 * (key % (12 / nbrTimeRange)) }),
         event: {}
      }))
   )

   //used to show nothing if all events haven't finished to load
   const [isLoading, setIsLoading] = useState(true)
   //nb max de columns
   const [nbCol, setNbCol] = useState(1)
   //list of events in this day
   const [events, setEvents] = useState([])
   //used to know if the first event has been mounted
   const [firstEventReady, setFirstEventReady] = useState(false)

   //set the events of the day and remove these wich the tags aren't actives
   useEffect(() => {
      const dateFormat = moment(date).format('YYYY MM DD')
      const propEvent = event[dateFormat]
      setEvents(propEvent ? propEvent : [])
      setFirstEventReady(false)
   }, [date, event, activeTags])

   //fill all part of the day with the good event
   useEffect(() => {
      //well sized divided day
      let tempDivisDay = Array.from(Array(288 / nbrTimeRange).keys()).map(key => ({
         time: moment({ year: date.year(), month: date.month(), date: date.date(), hour: Math.floor((nbrTimeRange * key) / 12), minute: nbrTimeRange * 5 * (key % (12 / nbrTimeRange)) }),
         event: {}
      }))
      //keep in memory the number of col max
      let nbColMax = 1

      //loop through the events and fill the goods time divisions
      for (let evNbr = 0; evNbr < events.length; evNbr++) {
         const value = events[evNbr]
         const { start, duration, column } = value.timeInfo

         //find all index of time division contained in the event
         //find the start moment depending on the nbrTimeRange
         const divisStart = moment(start).minutes(start.minutes() - (start.minutes() % (5 * nbrTimeRange)))
         //find the index of the start
         const startIndex = (12 / nbrTimeRange) * divisStart.hour() + divisStart.minutes() / (5 * nbrTimeRange)
         //set the column and check if there is a column disponible
         let col = column
         const divisLength = Object.entries(tempDivisDay[startIndex].event).length
         if (divisLength < col) {
            for (let colCheck = 0; colCheck <= divisLength; colCheck++) {
               const filteredEntries = Object.entries(tempDivisDay[startIndex].event).filter(([key, value]) => key === colCheck)
               if (filteredEntries.length === 0) {
                  col = colCheck
                  break
               }
            }
         }
         if (col + 1 > nbColMax) nbColMax = col + 1
         //fill the temp divis day
         for (let row = startIndex; row < duration + startIndex; row++) {
            tempDivisDay[row].event[col] = { value, isStart: row === startIndex, firstElement: evNbr === 0 }
         }
      }
      setNbCol(nbColMax)
      setPartHourEvents(tempDivisDay)
      setIsLoading(false)
   }, [events, nbrTimeRange])

   //function to set the scroll
   const scrollToFirstElement = () => {
      scroller.scrollTo('firstEvent', {
         duration: 0,
         delay: 0,
         smooth: 'easeInOutQuart',
         containerId: 'container'
      })
   }

   useEffect(() => {
      if (firstEventReady && events.length > 0) {
         scrollToFirstElement()
      }
   }, [firstEventReady, events.length])

   return (
      <ScrollableSegment height={week ? 900 : 800} nopadding={1} basic id="container">
         <Table definition={!week}>
            <Table.Body>
               <SizedTableRow height={800}>
                  {!week && zoom > 0.4
                     ? hours.map((hour, key) => {
                          return (
                             <SizedTableRow key={key} height={180 * zoom}>
                                {isLoading ? (
                                   <Dimmer active>
                                      <Loader />
                                   </Dimmer>
                                ) : (
                                   <DarkTableCell textAlign="center" width={1} verticalAlign="top">
                                      <StyledDivider fitted />
                                      {hour}
                                   </DarkTableCell>
                                )}
                             </SizedTableRow>
                          )
                       })
                     : null}

                  {Array(nbCol)
                     .fill()
                     .map((_, col) => (
                        <PaddingLessTableCell key={col} textAlign="center" width={week ? 1 : Math.ceil(15 / nbCol)}>
                           {isLoading ? (
                              <Dimmer active>
                                 <Loader />
                              </Dimmer>
                           ) : (
                              <Segment.Group>
                                 {partHourEvents.map((quarterHourEvent, row) => {
                                    const event = quarterHourEvent.event[col]
                                    if (event) {
                                       const { isStart, value, firstElement } = event
                                       if (isStart) {
                                          if (week) {
                                             return (
                                                <EventPopup
                                                   trigger={
                                                      <div>
                                                         <SizedSegment nomargin={1} nopadding={1} height={value.timeInfo.duration * 3 * nbrTimeRange} vertical backcolor={value.color} onClick={() => handleModifClick(value)}>
                                                            {nbCol <= 2 && nbrTimeRange > 2 && value.timeInfo.duration * nbrTimeRange > 50 ? (
                                                               <Header as="h5" style={{ paddingTop: value.timeInfo.duration * 4 - 8 }}>
                                                                  <Icon name={value.icon} size="tiny" />
                                                                  {' ' + value.title}
                                                               </Header>
                                                            ) : (
                                                               ''
                                                            )}
                                                         </SizedSegment>
                                                      </div>
                                                   }
                                                   event={value}
                                                />
                                             )
                                          } else {
                                             if (firstElement) {
                                                if (!firstEventReady) setFirstEventReady(true)
                                                return (
                                                   <Element key={row} name="firstEvent">
                                                      <EventSegment moment={quarterHourEvent.time} event={value} size={value.timeInfo.duration * 15 * nbrTimeRange * zoom} />
                                                   </Element>
                                                )
                                             } else return <EventSegment key={row} moment={quarterHourEvent.time} event={value} size={value.timeInfo.duration * 15 * nbrTimeRange * zoom} />
                                          }
                                       } else return ''
                                    }

                                    if (week) return <SizedSegment key={row} nohover={1} basic nomargin={1} nopadding={1} height={3 * nbrTimeRange} vertical backcolor={caseBackground}></SizedSegment>
                                    return <EventSegment key={row} event={null} moment={quarterHourEvent.time} size={15 * nbrTimeRange * zoom} />
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
