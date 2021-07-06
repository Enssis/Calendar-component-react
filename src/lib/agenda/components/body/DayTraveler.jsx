import React, { useContext, useEffect, useState } from 'react'
import { ADD_DAYS } from '../../constants'
import moment from 'moment'

//Context
import StateContext from '../../StateContext'

//Components
import DateTraveler from './GeneralDateTraveler'

/*
   Component used to adapts the Date traveler to day traveling
*/
const DayTraveler = () => {
   const { displayedDate, languageFile } = useContext(StateContext)

   const { Days_names, Month_names } = languageFile
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
      const actual = Days_names[dayOfTheWeek] + ' ' + displayedDate.date() + ' ' + Month_names[displayedDate.month()] + ' ' + displayedDate.year()

      const tomorrow = moment(displayedDate).add(1, 'days')
      dayOfTheWeek = tomorrow.day()
      const next = Days_names[dayOfTheWeek] + ' ' + tomorrow.date() + ' ' + Month_names[tomorrow.month()] + ' ' + tomorrow.year()

      const yesterday = moment(displayedDate).add(-1, 'days')
      dayOfTheWeek = yesterday.day()
      const last = Days_names[dayOfTheWeek] + ' ' + yesterday.date() + ' ' + Month_names[yesterday.month()] + ' ' + yesterday.year()

      setActual({ actual, next, last })
   }, [displayedDate])

   return <DateTraveler daysMove={1} actual={state.actual} next={state.next} last={state.last} addType={ADD_DAYS} />
}

export default DayTraveler
