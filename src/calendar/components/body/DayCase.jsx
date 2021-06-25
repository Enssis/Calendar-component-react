import React, { useContext, useState, useEffect } from "react"
import { List } from "semantic-ui-react"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"
import { DaySegment, SizedSegment, CustomLabel, MonthListItem } from "../calendar.style"
import moment from "moment"
import EventPopup from "./EventPopup"

const DayCase = props => {
   const { date } = props

   const appDispatch = useContext(DispatchContext)
   const appState = useContext(StateContext)

   const [events, setEvents] = useState([])

   //set the events of the day
   useEffect(() => {
      const ndate = date.format("YYYY MM DD")
      const propEvent = appState.event[ndate]

      setEvents(propEvent ? propEvent : [])
   }, [date, appState.event])

   const goToDay = date => {
      appDispatch({ type: "setDisplayedDate", date })
      appDispatch({ type: "showJour" })
   }

   return (
      <>
         <DaySegment tertiary size={"mini"} attached="top" backcolor="#fff" onClick={() => goToDay(date)}>
            {date.date()}
         </DaySegment>
         <SizedSegment height="100" nopadding={1} attached="bottom" backcolor="#fff" nohover>
            <List>
               {events.map(event => {
                  const { start, duration } = event.timeInfo
                  return (
                     <EventPopup
                        left
                        trigger={
                           <div>
                              <MonthListItem>
                                 <CustomLabel margLeft={Math.ceil((Math.abs(moment({ year: start.year(), month: start.month(), date: start.date() }).diff(start) / 900000) * 100) / 96)} width={Math.floor((duration * 100) / 96)} backcolor={event.color}></CustomLabel>
                              </MonthListItem>
                           </div>
                        }
                        event={event}
                     />
                  )
               })}
            </List>
         </SizedSegment>
      </>
   )
}

export default DayCase
