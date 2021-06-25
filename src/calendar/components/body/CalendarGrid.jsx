import React, { useContext, useEffect, useState } from "react"
import { Grid, Header } from "semantic-ui-react"
import DayCase from "./DayCase"
import { DAYS_NAME, MONTH_NAMES } from "../../Calendar"
import StateContext from "../../StateContext"
import moment from "moment"
import HourCase from "./HourCase"
import WeekHourCase from "./WeekHourCase"
import { PaddingLessGridColumn, SizedSegment } from "../calendar.style"
import DispatchContext from "../../DispatchContext"

const CalendarGrid = props => {
   const appState = useContext(StateContext)
   const appDispatch = useContext(DispatchContext)

   const [listDays, setListDays] = useState([0])
   const [monthDateList, setmonthDateList] = useState([])
   const [dayDateList, setDayDateList] = useState([])

   //return the day choosed by it's number on the week
   const getDate = (dayNbr, comparedDate) => {
      if (appState.mode === "jour") {
         return comparedDate
      } else {
         const date = moment(comparedDate)
         date.add(-(((6 + comparedDate.day()) % 7) - dayNbr), "day")
         return date
      }
   }

   //make a list with all the days of the week or only one day if it's in mode day
   useEffect(() => {
      if (appState.mode !== "jour") {
         const newList = DAYS_NAME.concat(DAYS_NAME[0])
         newList.shift()
         setListDays(newList)
      } else {
         setListDays([DAYS_NAME[appState.displayedDate.day()]])
      }
   }, [appState.mode, appState.displayedDate])

   //make a list with all days displayed of a month
   useEffect(() => {
      const res = []
      const firstOfMonth = moment({ month: appState.displayedDate.month(), year: appState.displayedDate.year(), day: 1 })
      let week = 0
      do {
         for (let dayNbr = 0; dayNbr < 7; dayNbr++) {
            res.push(getDate(dayNbr + week * 7, firstOfMonth))
         }
         week++
      } while (res[res.length - 1].month() === firstOfMonth.month() && week < 6)
      setmonthDateList(res)
   }, [appState.displayedDate, appState.mode])

   //make a list with all days displayed off a week
   useEffect(() => {
      const res = []
      for (let dayNbr = 0; dayNbr < 7; dayNbr++) {
         res.push(getDate(dayNbr, appState.displayedDate))
      }
      setDayDateList(res)
   }, [appState.displayedDate, appState.mode])

   //return the date with the good format depending on the mode
   const displayDate = (day, key) => {
      const date = getDate(key, appState.displayedDate)
      return day + (appState.mode !== "mois" ? ` ${date.date() + " " + MONTH_NAMES[date.month()]}` : "")
   }

   const handleDayClick = date => {
      if (appState.mode === "semaine") {
         appDispatch({ type: "setDisplayedDate", date })
         appDispatch({ type: "showJour" })
      }
   }

   //component which create the good number of cols and rows of cases
   const Body = () => {
      if (appState.mode !== "mois") {
         return (
            <Grid.Row columns={listDays.length}>
               <BodyRow row={0} dateArr={appState.mode === "semaine" ? dayDateList : [appState.displayedDate]} />
            </Grid.Row>
         )
      } else {
         return (
            <>
               {Array(monthDateList.length / 7)
                  .fill()
                  .map((_, key) => (
                     <Grid.Row key={key} columns={listDays.length}>
                        <BodyRow row={key} dateArr={monthDateList} />
                     </Grid.Row>
                  ))}
            </>
         )
      }
   }

   //Component which represent which type of case need to be rendered
   const BodyRow = props => {
      const casetype = date => {
         switch (appState.mode) {
            case "mois":
               return <DayCase date={date} />
            case "jour":
               return <HourCase date={date} />
            case "semaine":
               return <WeekHourCase date={date} />
            default:
               console.log("Error on the mode")
               break
         }
      }

      return (
         <>
            {Array(listDays.length)
               .fill()
               .map((_, key) => {
                  const date = appState.mode === "jour" ? props.dateArr[0] : props.dateArr[props.row * 7 + key]
                  return (
                     <PaddingLessGridColumn paddingright={1} key={key}>
                        {casetype(date)}
                     </PaddingLessGridColumn>
                  )
               })}
         </>
      )
   }

   return (
      <Grid centered container>
         <Grid.Row columns={listDays.length}>
            {listDays.map((day, key) => (
               <PaddingLessGridColumn paddingright={1} key={key} textAlign={appState.mode !== "jour" ? "center" : "left"}>
                  <SizedSegment nohover={appState.mode !== "semaine"} backcolor="#fff" onClick={() => handleDayClick(getDate(key, appState.displayedDate))}>
                     <Header as="h5">{displayDate(day, key)}</Header>
                  </SizedSegment>
               </PaddingLessGridColumn>
            ))}
         </Grid.Row>
         <Body />
      </Grid>
   )
}

export default CalendarGrid
