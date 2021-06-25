import React, { useContext, useEffect } from "react"
import StateContext from "../../StateContext"
import DateTraveler from "./GeneralDateTraveler"
import { MONTH_NAMES } from "../../Calendar"
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
      const actual = MONTH_NAMES[appState.displayedDate.month()] + " " + appState.displayedDate.year()

      const tomorrow = moment(appState.displayedDate).add(1, "month")
      const next = MONTH_NAMES[tomorrow.month()] + " " + tomorrow.year()

      const yesterday = moment(appState.displayedDate).add(-1, "month")
      const last = MONTH_NAMES[yesterday.month()] + " " + yesterday.year()

      setActual({ actual, next, last })
   }, [appState.displayedDate, setActual])

   return <DateTraveler daysMove={1} actual={state.actual} next={state.next} last={state.last} addType="addMonths" />
}

export default DayTraveler
