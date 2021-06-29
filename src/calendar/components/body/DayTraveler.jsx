import React, { useContext, useEffect, useState } from 'react'
import { ADD_DAYS, DAYS_NAME, MONTH_NAMES } from '../../constants'
import moment from 'moment'

//Context
import StateContext from '../../StateContext'

//Components
import DateTraveler from './GeneralDateTraveler'

/*
   Component used to adapts the Date traveler to day traveling
*/
const DayTraveler = () => {
   const { displayedDate } = useContext(StateContext)

   //stock the actual, next and previous day name
   const [state, setActual] = useState({
      actual: '',
      next: '',
      last: ''
   })

   //set the actual, next and previous day name
   //change when displayed date change
   useEffect(() => {
      let dayOfTheWeek = displayedDate.day()
      const actual = DAYS_NAME[dayOfTheWeek] + ' ' + displayedDate.date() + ' ' + MONTH_NAMES[displayedDate.month()] + ' ' + displayedDate.year()

      const tomorrow = moment(displayedDate).add(1, 'days')
      dayOfTheWeek = tomorrow.day()
      const next = DAYS_NAME[dayOfTheWeek] + ' ' + tomorrow.date() + ' ' + MONTH_NAMES[tomorrow.month()] + ' ' + tomorrow.year()

      const yesterday = moment(displayedDate).add(-1, 'days')
      dayOfTheWeek = yesterday.day()
      const last = DAYS_NAME[dayOfTheWeek] + ' ' + yesterday.date() + ' ' + MONTH_NAMES[yesterday.month()] + ' ' + yesterday.year()

      setActual({ actual, next, last })
   }, [displayedDate])

   return <DateTraveler daysMove={1} actual={state.actual} next={state.next} last={state.last} addType={ADD_DAYS} />
}

export default DayTraveler
