import React, { useContext, useEffect } from "react"
import StateContext from "../../StateContext"
import DateTraveler from "./GeneralDateTraveler"
import { useImmer } from "use-immer"
import moment from "moment"

const WeekTraveler = props => {
   const appState = useContext(StateContext)

   //change when displayed date change
   const [state, setActual] = useImmer({
      actual: "",
      next: "",
      last: ""
   })

   useEffect(() => {
      const actual = "semaine " + appState.displayedDate.week() + " de " + appState.displayedDate.year()

      const nextWeek = moment(appState.displayedDate).add(7, "days")
      const next = "semaine " + nextWeek.week() + " de " + nextWeek.year()

      const lastWeek = moment(appState.displayedDate).add(-7, "days")
      const last = "semaine " + lastWeek.week() + " de " + lastWeek.year()

      setActual({ actual, next, last })
   }, [appState.displayedDate, setActual])

   return <DateTraveler daysMove={7} actual={state.actual} next={state.next} last={state.last} addType="addDays" />
}

export default WeekTraveler
