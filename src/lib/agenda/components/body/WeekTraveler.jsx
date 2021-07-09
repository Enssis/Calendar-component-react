import React, { useContext, useEffect } from 'react'
import StateContext from '../../StateContext'
import DateTraveler from './GeneralDateTraveler'
import { useImmer } from 'use-immer'
import moment from 'moment'
import { ADD_DAYS } from '../../constants'

const WeekTraveler = props => {
   const { displayedDate, languageFile } = useContext(StateContext)
   const { week_number } = languageFile

   //change when displayed date change
   const [state, setActual] = useImmer({
      actual: '',
      next: '',
      last: ''
   })

   //function to format the string output
   const weekFormat = (weekNb, year) => {
      return week_number.replace('$WW', weekNb).replace('$YYYY', year)
   }

   useEffect(() => {
      const actual = weekFormat(displayedDate.week(), displayedDate.year())

      const nextWeek = moment(displayedDate).add(7, 'days')
      const next = weekFormat(nextWeek.week(), nextWeek.year())

      const lastWeek = moment(displayedDate).add(-7, 'days')
      const last = weekFormat(lastWeek.week(), lastWeek.year())

      setActual({ actual, next, last })
   }, [displayedDate, setActual])

   return <DateTraveler daysMove={7} actual={state.actual} next={state.next} last={state.last} addType={ADD_DAYS} />
}

export default WeekTraveler
