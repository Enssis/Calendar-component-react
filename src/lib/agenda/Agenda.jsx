import React, { useEffect, useState } from 'react'
import { useImmerReducer } from 'use-immer'
import { Element, scroller } from 'react-scroll'
import moment from 'moment'
import 'semantic-ui-css/semantic.min.css'
import { Dimmer, List, Message, Loader, Sidebar, Modal } from 'semantic-ui-react'
import { ADD_DAYS, SET_EVENTS, MONTH, SET_EVENTLIST, SET_SETTINGS, SET_TAGS, OPEN_SETTINGS, CLOSE_SETTINGS, SET_DISPLAYED_DATE, SET_MODE, UPDATE_DATE, ADD_MONTHS, OPEN_MODAL, ADD_EVENT, CLOSE_MODAL, MODIF_EVENT, DELETE_EVENT, SET_TIME_RANGE, SET_COLORS, OPEN_TAGS, CLOSE_TAGS, SET_ACTIVE_TAG, ADD_ACTIVE_TAG, ZOOM_MINUS } from './constants'

//components
//header
import CalendarHeader from './components/header/CalendarHeader'
//body
import MainBody from './components/body/MainBody'
//modal
import SettingsSidebar from './components/settings/SettingsSidebar'

//context for acces from all childrens
import DispatchContext from './DispatchContext'
import StateContext from './StateContext'
import TagsSidebar from './components/settings/TagsSidebar'
import CreateModal from './components/settings/CreateModal'
import { ZOOM_PLUS } from './constants'

const date = moment()

const Agenda = props => {
   const { settings, eventList, handlers, theme } = props

   //used in case of options errors
   const [error, setError] = useState({ isError: false, errorMsg: [] })

   //used to stop any action until the options are verified
   const [isLoading, setIsLoading] = useState(true)

   //Default settings in case settings are undefined
   const defaultSettings = {
      settingsModif: {
         allowed: false,
         allowColor: false,
         allowTimeRange: false
      },
      table: {
         before: 1,
         after: 11,
         total: 12
      },
      title: {
         isImage: false,
         value: 'Calendrier',
         hasLogo: false,
         logoPath: ''
      },
      allowCreation: true,
      allowModification: true,
      timeRange: 15,
      tagsList: {}
   }

   const defaultTheme = {
      pageBackground: '#fff', //what you want
      headerBackground: 'blue', //list of color (segments color)
      mainBackground: '#e3fcfc', //wyw
      travelerColor: 'default', //button color + 'default' or ''
      dayDateColor: '#fff', //wyw
      caseBackground: 'white', //wyw
      createBackground: '#fff' // wyw
   }

   //initials states for the reducer
   const initialState = settings
      ? {
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
           debug: false,
           colors: settings.eventColors ? settings.eventColors : ['#0ed3ed', '#00c21d', '#ff87c3', '#ffd438', '#ff1c14', '#ff7919', '#0055ff', '#cc00ff'],
           nbrTimeRange: settings.timeRange / 5,
           settingsOpen: false,
           tagsOpen: false,
           activeTags: settings.tagsList,
           zoom: 0.6,
           eventList,
           theme: theme !== undefined ? theme : defaultTheme
        }
      : {
           mode: MONTH,
           date: date,
           displayedDate: date,
           event: {},
           modal: {
              open: false,
              mode: '',
              event: {}
           },
           settings: defaultSettings,
           debug: false,
           colors: defaultSettings.eventColors ? settings.eventColors : ['#0ed3ed', '#00c21d', '#ff87c3', '#ffd438', '#ff1c14', '#ff7919', '#0055ff', '#cc00ff'],
           nbrTimeRange: defaultSettings.timeRange / 5,
           settingsOpen: false,
           tagsOpen: false,
           activeTags: defaultSettings.tagsList,
           zoom: 1,
           eventList,
           theme: theme !== undefined ? theme : defaultTheme
        }

   //Reducer function used to controle all the generals states
   const reducer = (draft, action) => {
      const { handleEvent, handleColors, handleTimeRange, handleTagList } = handlers

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
               handleEvent(eventList.concat(action.value))
            }
            break
         case MODIF_EVENT:
            const event = action.value
            const newEventList = [...eventList.filter(el => el.key !== event.key)]
            handleEvent(newEventList.concat(event))
            break
         case DELETE_EVENT:
            handleEvent([...eventList.filter(el => el.key !== action.value.key)])
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
         case SET_COLORS:
            handleColors(action.value)
            draft.colors = action.value
            break
         case SET_TIME_RANGE:
            handleTimeRange(action.value)
            draft.nbrTimeRange = action.value / 5
            break
         case SET_SETTINGS:
            draft.settings = action.value
            break
         case SET_TAGS:
            draft.settings.tagsList = action.value
            handleTagList(action.value)
            handleEvent(
               eventList.map(el => {
                  if (el.tags.length === 0) return el
                  const newEvent = Object.assign({}, el)
                  newEvent.tags = newEvent.tags.filter(tag => action.value[tag] !== undefined)
                  return newEvent
               })
            )
            break
         case OPEN_SETTINGS:
            draft.settingsOpen = true
            break
         case CLOSE_SETTINGS:
            draft.settingsOpen = false
            break
         case OPEN_TAGS:
            draft.tagsOpen = true
            break
         case CLOSE_TAGS:
            draft.tagsOpen = false
            break
         case ADD_ACTIVE_TAG:
            draft.activeTags[action.key] = action.value
            break
         case SET_ACTIVE_TAG:
            draft.activeTags = action.value
            break
         case ZOOM_MINUS:
            if (draft.zoom > 0.4) draft.zoom -= 0.2
            break
         case ZOOM_PLUS:
            if (draft.zoom < 2) draft.zoom += 0.2
            break
         case SET_EVENTLIST:
            draft.eventList = eventList
            break
         default:
            console.log('unrecognized type')
            break
      }
   }

   const [state, dispatch] = useImmerReducer(reducer, initialState)

   //check if the options doesn't have errors
   useEffect(() => {
      if (settings !== undefined) {
         const { table, timeRange } = settings
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

         //check if the time part is usable
         if (timeRange % 5 !== 0) {
            optionError = true
            optionErrMess.push("Time range isn't a multiple of 5")
         } else {
            const nbTimeRange = timeRange / 5
            if (nbTimeRange < 1) {
               optionError = true
               optionErrMess.push('Time range is too small')
            } else if (nbTimeRange > 12) {
               optionError = true
               optionErrMess.push('Time range is too big')
            }

            if (300 % nbTimeRange !== 0) {
               optionError = true
               optionErrMess.push("A day isn't divisible in equal part with the time range given")
            }
         }

         setError({
            isError: optionError,
            errorMsg: optionErrMess
         })

         //stop the loading
      }
      setIsLoading(false)
   }, [state.settings])

   //loop through the events to assign them to each day
   useEffect(() => {
      if (isLoading) {
         return
      }

      const events = {}
      const { before, after } = state.settings.table
      //dictionnary to associate each event key to a column
      const columnList = {}

      //sort the events from the first in time to the last and remove these with all tags non active
      const timeSortedEvents = [...eventList]
         .filter(el => {
            if (el.tags.length === 0 || settings === undefined) return true
            for (const tagKey of el.tags) {
               if (state.activeTags[tagKey] !== undefined) return true
            }
            return false
         })
         .sort((el1, el2) => {
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
         //start considering the time division
         const startByPart = moment(start).minutes(start.minutes() - (start.minutes() % (5 * state.nbrTimeRange)))
         const endByPart = moment(end).minutes(end.minutes() + 5 * state.nbrTimeRange - (end.minutes() % (5 * state.nbrTimeRange)))

         const sameTimeEvents = timeSortedEvents.filter(element => {
            if (startByPart.diff(element.start) <= 0 && endByPart.diff(element.start) > 0 && element.key !== event.key) {
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

            //set the end to 23:59 if the real end is after the day
            if (!end.isSame(day, 'day')) {
               timeInfo.end = moment({ year: day.year(), month: day.month(), date: day.date(), hour: 23, minute: 59 })
            }
            //duration in part of hours
            const dayStart = moment({ year: timeInfo.start.year(), month: timeInfo.start.month(), date: timeInfo.start.date() })
            timeInfo.duration = Math.ceil(Math.abs(dayStart.diff(timeInfo.end) / (300000 * state.nbrTimeRange))) - Math.floor(Math.abs(dayStart.diff(timeInfo.start) / (300000 * state.nbrTimeRange)))
            newEvent['timeInfo'] = timeInfo

            events[dayFormat].push(newEvent)
         } while (!end.isSame(day, 'day'))
      }

      dispatch({ type: SET_EVENTS, value: events })
      dispatch({ type: SET_EVENTLIST, value: eventList })
   }, [eventList, isLoading, state.settings.table, state.nbrTimeRange, state.activeTags])

   useEffect(() => {
      if (settings) {
         dispatch({ type: SET_SETTINGS, value: settings })
      }
   }, [settings])

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
            <Loader>Loading</Loader>
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
            <Sidebar.Pushable style={{ minHeight: '100vh' }}>
               <Sidebar.Pusher dimmed={state.settingsOpen || state.tagsOpen}>
                  <div style={{ minHeight: '100vh' }}>
                     <CalendarHeader />
                     <Element name="body" style={{ backgroundColor: state.theme.pageBackground }}>
                        <MainBody />
                     </Element>
                  </div>
               </Sidebar.Pusher>
               <Modal dimmer open={state.modal.open} onClose={() => dispatch({ type: CLOSE_MODAL })}>
                  <CreateModal event={state.modal.event} />
               </Modal>
               <SettingsSidebar />
               <TagsSidebar />
            </Sidebar.Pushable>
         </DispatchContext.Provider>
      </StateContext.Provider>
   )
}

export default Agenda
