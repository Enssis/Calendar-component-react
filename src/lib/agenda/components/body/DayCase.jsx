import React, { useContext, useState, useEffect } from 'react'
import { List } from 'semantic-ui-react'
import { DaySegment, SizedSegment, CustomLabel, MonthListItem } from '../../agenda.style'
import moment from 'moment'
import { SET_DISPLAYED_DATE, SET_MODE, DAY, OPEN_MODAL, MODIF } from '../../constants'

//components
import EventPopup from './EventPopup'

//Context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'

/*
   Component rendering one day when on the month mode
*/
const DayCase = props => {
   const { date } = props

   const appDispatch = useContext(DispatchContext)
   const { event, nbrTimeRange } = useContext(StateContext)

   const [rows, setRows] = useState([])

   //set the events of the day
   useEffect(() => {
      const ndate = date.format('YYYY MM DD')
      const propEvent = event[ndate]
      if (propEvent) {
         //sort all the events by column number
         const events = [...propEvent].sort((el1, el2) => {
            return el1.timeInfo.column > el2.timeInfo.column ? 1 : -1
         })
         const rows = []
         //for each event while the length of row isn't is col number add a null event
         for (const event of events) {
            const col = event.timeInfo.column
            while (rows.length < col) {
               rows.push('')
            }

            if (rows.length > col) {
               rows[col].push(event)
            } else {
               rows.push([event])
            }
         }
         setRows(rows)
      } else {
         setRows([])
      }
   }, [date, event])

   //set the displayed day to be the clicked date and switch to day mode
   const goToDay = date => {
      appDispatch({ type: SET_DISPLAYED_DATE, date })
      appDispatch({ type: SET_MODE, data: DAY })
   }

   return (
      <>
         <DaySegment size={'mini'} attached="top" onClick={() => goToDay(date)}>
            {date.date()}
         </DaySegment>
         <SizedSegment height="120" nopadding={1} attached="bottom" border={1} light={1} nohover={1}>
            <List>
               {rows.map((events, row) => {
                  if (events === '') return <div key={row} style={{ padding: 9 }}></div>
                  return (
                     <MonthListItem key={row}>
                        {
                           //loop through all event on the same row
                           events.map((event, key) => {
                              const { start, duration } = event.timeInfo
                              const nbStep = 288 / nbrTimeRange
                              //calculate the distance between the start of the element and the last element / the start of the case
                              const margleft = key > 0 ? Math.floor((Math.abs(events[key - 1].timeInfo.end.diff(start) / (300000 * nbrTimeRange)) * 100) / nbStep) : Math.floor((Math.abs(moment({ year: start.year(), month: start.month(), date: start.date() }).diff(start) / (300000 * nbrTimeRange)) * 100) / nbStep)
                              const width = Math.floor((duration * 100) / nbStep)
                              return (
                                 <EventPopup
                                    key={key}
                                    left
                                    trigger={
                                       <div style={{ display: 'inline list-item' }}>
                                          <CustomLabel onClick={() => appDispatch({ type: OPEN_MODAL, mode: MODIF, event })} margleft={margleft} width={width} backcolor={event.color}></CustomLabel>
                                       </div>
                                    }
                                    event={event}
                                 />
                              )
                           })
                        }
                     </MonthListItem>
                  )
               })}
            </List>
         </SizedSegment>
      </>
   )
}

export default DayCase
