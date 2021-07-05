import React, { useContext, useEffect } from 'react'
import StateContext from '../../StateContext'
import DateTraveler from './GeneralDateTraveler'
import { useImmer } from 'use-immer'
import moment from 'moment'
import { ADD_DAYS } from '../../constants'

const WeekTraveler = props => {
   const { displayedDate } = useContext(StateContext)

   //change when displayed date change
   const [state, setActual] = useImmer({
      actual: '',
      next: '',
      last: ''
   })

   useEffect(() => {
      const actual = 'semaine ' + displayedDate.week() + ' de ' + displayedDate.year()

      const nextWeek = moment(displayedDate).add(7, 'days')
      const next = 'semaine ' + nextWeek.week() + ' de ' + nextWeek.year()

      const lastWeek = moment(displayedDate).add(-7, 'days')
      const last = 'semaine ' + lastWeek.week() + ' de ' + lastWeek.year()

      setActual({ actual, next, last })
   }, [displayedDate, setActual])

   return <DateTraveler daysMove={7} actual={state.actual} next={state.next} last={state.last} addType={ADD_DAYS} />
}

export default WeekTraveler
