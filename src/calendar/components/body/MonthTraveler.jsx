import React, { useContext, useEffect } from 'react'
import { ADD_MONTHS, MONTH_NAMES } from '../../constants'
import { useImmer } from 'use-immer'
import moment from 'moment'
//context
import StateContext from '../../StateContext'
//components
import DateTraveler from './GeneralDateTraveler'

/*
   Component used to adapts the Date traveler to month traveling
*/
const DayTraveler = () => {
   const { displayedDate } = useContext(StateContext)

   //change when displayed date change
   const [state, setActual] = useImmer({
      actual: '',
      next: '',
      last: ''
   })

   //set the actual, next and previous day name
   //change when displayed date change
   useEffect(() => {
      const actual = MONTH_NAMES[displayedDate.month()] + ' ' + displayedDate.year()

      const tomorrow = moment(displayedDate).add(1, 'month')
      const next = MONTH_NAMES[tomorrow.month()] + ' ' + tomorrow.year()

      const yesterday = moment(displayedDate).add(-1, 'month')
      const last = MONTH_NAMES[yesterday.month()] + ' ' + yesterday.year()

      setActual({ actual, next, last })
   }, [displayedDate])

   return <DateTraveler daysMove={1} actual={state.actual} next={state.next} last={state.last} addType={ADD_MONTHS} />
}

export default DayTraveler
