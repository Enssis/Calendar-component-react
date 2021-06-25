import React, { useContext } from "react"
import StateContext from "../../StateContext"
import DayTraveler from "./DayTraveler"
import WeekTraveler from "./WeekTraveler"
import MonthTraveler from "./MonthTraveler"

const BodyMenu = props => {
   const appState = useContext(StateContext)

   const menu = mode => {
      switch (mode) {
         case "jour":
            return <DayTraveler />
         case "semaine":
            return <WeekTraveler />
         case "mois":
            return <MonthTraveler />
         default:
            console.log("Error on the mode")
            break
      }
   }

   return <>{menu(appState.mode)}</>
}

export default BodyMenu
