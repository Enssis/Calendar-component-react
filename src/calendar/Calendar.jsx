import React, { useEffect, useState } from 'react'
import { useImmerReducer } from 'use-immer'
import { Element, scroller } from 'react-scroll'
import moment from 'moment'
import { Dimmer, List, Message, Loader } from 'semantic-ui-react'
import { ADD_DAYS, SET_EVENTS, MONTH, SET_DISPLAYED_DATE, SET_MODE, UPDATE_DATE, ADD_MONTHS, OPEN_MODAL, ADD_EVENT, CLOSE_MODAL, MODIF_EVENT, DELETE_EVENT } from './constants'

//components
//header
import CalendarHeader from './components/Header/CalendarHeader'
//body
import MainBody from './components/body/MainBody'
//modal
import MainModal from './components/modal/MainModal'

//context for acces from all childrens
import DispatchContext from './DispatchContext'
import StateContext from './StateContext'

const date = moment()

const Calendar = props => {
   const { settings, eventList, setEvents } = props

   //used in case of options errors
   const [error, setError] = useState({ isError: false, errorMsg: [] })

   //used to stop any action until the options are verified
   const [isLoading, setIsLoading] = useState(true)

   //check if the options doesn't have errors
   useEffect(() => {
      const { table } = settings
      let optionError = false
      let optionErrMess = []

      //table settings
      const { before, after, total } = table

      //check if the total of month is equal to the sum of numbers of months before and after today
      if (before + after !== total) {
         optionError = true
         optionErrMess.push("Number of month before and after doesn't match with the total")
      }

      //check if the total isn't equal to 0
      if (total === 0) {
         optionError = true
         optionErrMess.push('Total is egal to 0')
      }

      setError({
         isError: optionError,
         errorMsg: optionErrMess
      })

      //stop the loading
      setIsLoading(false)
   }, [settings])

   //initials states for the reducer
   const initialState = {
      mode: MONTH,
      date: date,
      displayedDate: date,
      event: {},
      modal: {
         open: false,
         mode: '',
         event: {}
      },
      settings: settings,
      debug: true
   }

   //loop through the events to assign them to each day
   useEffect(() => {
      if (isLoading) {
         return
      }

      const events = {}
      const { before, after } = settings.table
      //dictionnary to associate each event key to a column
      const columnList = {}

      //sort the events from the first in time to the last
      const timeSortedEvents = [...eventList].sort((el1, el2) => {
         const diff = el1.start.diff(el2.start)
         if (diff < 0) return -1
         else if (diff > 0) return 1
         else return 0
      })

      //loop through each events to add it to the final array
      for (const event of timeSortedEvents) {
         const { start, end } = event

         //check if the event is in the limits dates
         if (end.diff(moment().add(-before, 'M')) < 0 || start.diff(moment().add(after, 'M')) > 0) continue

         //column assignation
         //assign to this event the first column or doesn't change anything if it already has one
         if (columnList[event.key] === undefined) {
            columnList[event.key] = 0
         }

         //search all events who have their start between the start and the end of this event
         const sameTimeEvents = timeSortedEvents.filter(element => {
            if (start.diff(element.start) <= 0 && end.diff(element.start) > 0 && element.key != event.key) {
               return true
            }
            return false
         })

         //if there is some, need to assign a column number for each
         if (sameTimeEvents.length > 0) {
            //list of col already taken
            const colTakenList = sameTimeEvents
               .map(el => columnList[el.key])
               .filter(el => el !== undefined)
               .concat(columnList[event.key])
            const usableColumns = Array.from(Array(sameTimeEvents.length + 1).keys()).filter(el => colTakenList.indexOf(el) < 0)

            //assign to each event without a column number a column and remove it from the array with all usable columns numbers
            for (const sameTimeEvent of sameTimeEvents) {
               if (columnList[sameTimeEvent.key] === undefined) {
                  const col = usableColumns.shift()
                  columnList[sameTimeEvent.key] = col
               }
            }
         }

         let nbDays = 0
         let day = {}

         //loop to add the events to each day it is in
         do {
            //wich day we are adding the event
            day = moment(event.start).add(nbDays, 'd')
            nbDays++

            //the key corresponding to a day are on the format "YYYY MM DD", ex : "2021 06 25" for the 25 june 2021
            const dayFormat = day.format('YYYY MM DD')
            if (!events[dayFormat]) events[dayFormat] = []

            //copy of the event to save
            const newEvent = Object.assign({}, event)

            //info of the event linked to the day : hour of start and end, and number of time block (ex : 5 quarter of hours or half hours (depending on the options))
            const timeInfo = { start, end, duration: 0, column: columnList[event.key] }

            //set the start to 00:00 if the real start is before the day
            if (!start.isSame(day, 'day')) {
               timeInfo.start = moment({ year: day.year(), month: day.month(), date: day.date(), hour: 0, minute: 0 })
            }

            //set the end to 23::59 if the real end is after the day
            if (!end.isSame(day, 'day')) {
               timeInfo.end = moment({ year: day.year(), month: day.month(), date: day.date(), hour: 23, minute: 59 })
            }
            //duration in quarters of hours
            timeInfo.duration = Math.ceil(Math.abs(timeInfo.start.diff(timeInfo.end) / 900000))
            newEvent['timeInfo'] = timeInfo

            events[dayFormat].push(newEvent)
         } while (!end.isSame(day, 'day'))
      }

      dispatch({ type: SET_EVENTS, value: events })
   }, [eventList, isLoading, settings.table])

   //Reducer function used to controle all the generals states
   const reducer = (draft, action) => {
      switch (action.type) {
         case SET_MODE:
            draft.mode = action.data
            break
         case UPDATE_DATE:
            const date = moment()
            draft.date = date
            break
         case SET_DISPLAYED_DATE:
            draft.displayedDate = action.date
            break
         case ADD_DAYS:
            draft.displayedDate = moment(draft.displayedDate).add(action.nbDays, 'days')
            break
         case ADD_MONTHS:
            draft.displayedDate = moment(draft.displayedDate).add(action.nbDays, 'month')
            break
         case ADD_EVENT:
            if (eventList.filter(el => el.key === action.value.key).length === 0) {
               setEvents(eventList.concat(action.value))
            }
            break
         case MODIF_EVENT:
            const event = action.value
            const newEventList = [...eventList.filter(el => el.key !== event.key)]
            setEvents(newEventList.concat(event))
            break
         case DELETE_EVENT:
            setEvents([...eventList.filter(el => el.key !== action.value.key)])
            break
         case OPEN_MODAL:
            draft.modal = { open: true, mode: action.mode, event: action.event }
            break
         case CLOSE_MODAL:
            draft.modal.open = false
            break
         case SET_EVENTS:
            draft.event = action.value
            break
         default:
            console.log('unrecognized type')
            break
      }
   }

   const [state, dispatch] = useImmerReducer(reducer, initialState)

   //function to set the scroll to the body component when the mode change
   useEffect(() => {
      scroller.scrollTo('body', {
         duration: 500,
         delay: 0,
         smooth: 'easeInOutQuart'
      })
   }, [state.mode])

   //show a loading icon until settings are verified
   if (isLoading)
      return (
         <Dimmer active inverted>
            <Loader> Loading</Loader>
         </Dimmer>
      )

   //show a error message
   if (error.isError)
      return (
         <Message negative>
            <Message.Header>There is an error with settings</Message.Header>
            <List items={error.errorMsg} />
         </Message>
      )

   return (
      <StateContext.Provider value={state}>
         <DispatchContext.Provider value={dispatch}>
            <CalendarHeader />
            <Element name="body">
               <MainBody />
            </Element>
            <MainModal />
         </DispatchContext.Provider>
      </StateContext.Provider>
   )
}

export default Calendar
