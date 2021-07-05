import React, { useContext } from 'react'
import { DAY, MONTH, WEEK } from '../../constants'

//Context
import StateContext from '../../StateContext'

//Components
import DayTraveler from './DayTraveler'
import WeekTraveler from './WeekTraveler'
import MonthTraveler from './MonthTraveler'

const BodyMenu = () => {
   const { mode } = useContext(StateContext)

   //return the right component depending on the actual mmode
   const menu = mode => {
      switch (mode) {
         case DAY:
            return <DayTraveler />
         case WEEK:
            return <WeekTraveler />
         case MONTH:
            return <MonthTraveler />
         default:
            console.log('Error on the mode')
            break
      }
   }

   return <>{menu(mode)}</>
}

export default BodyMenu
