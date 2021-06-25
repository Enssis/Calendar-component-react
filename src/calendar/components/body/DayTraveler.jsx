import React, { useContext, useEffect } from "react"
import StateContext from "../../StateContext"
import DateTraveler from "./GeneralDateTraveler"
import { DAYS_NAME, MONTH_NAMES } from "../../Calendar"
import { useImmer } from "use-immer"
import moment from "moment"

const DayTraveler = props => {
   const appState = useContext(StateContext)

   //change when displayed date change
   const [state, setActual] = useImmer({
      actual: "",
      next: "",
      last: ""
   })

   useEffect(() => {
      let dayOfTheWeek = appState.displayedDate.day()
      const actual = DAYS_NAME[dayOfTheWeek] + " " + appState.displayedDate.date() + " " + MONTH_NAMES[appState.displayedDate.month()] + " " + appState.displayedDate.year()

      const tomorrow = moment(appState.displayedDate).add(1, "days")
      dayOfTheWeek = tomorrow.day()
      const next = DAYS_NAME[dayOfTheWeek] + " " + tomorrow.date() + " " + MONTH_NAMES[tomorrow.month()] + " " + tomorrow.year()

      const yesterday = moment(appState.displayedDate).add(-1, "days")
      dayOfTheWeek = yesterday.day()
      const last = DAYS_NAME[dayOfTheWeek] + " " + yesterday.date() + " " + MONTH_NAMES[yesterday.month()] + " " + yesterday.year()

      setActual({ actual, next, last })
   }, [appState.displayedDate, setActual])

   return <DateTraveler daysMove={1} actual={state.actual} next={state.next} last={state.last} addType="addDays" />
}

export default DayTraveler
