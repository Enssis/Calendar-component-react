import React, { useEffect, useState } from "react"
import { useImmerReducer } from "use-immer"
import { Element, scroller } from "react-scroll"
import moment from "moment"

//components
//header
import CalendarHeader from "./components/Header/CalendarHeader"
//body
import MainBody from "./components/body/MainBody"
//modal
import MainModal from "./components/modal/MainModal"

//context for acces from all childrens
import DispatchContext from "./DispatchContext"
import StateContext from "./StateContext"
import { Dimmer, List, Message, Loader } from "semantic-ui-react"

const date = moment()

const Calendar = props => {
   const { settings, eventList, addEvent } = props

   const [error, setError] = useState({ isError: false, errorMsg: [] })
   const [isLoading, setIsLoading] = useState(true)

   //function to set the scroll
   const scrollToBody = () => {
      scroller.scrollTo("body", {
         duration: 500,
         delay: 0,
         smooth: "easeInOutQuart"
      })
   }

   useEffect(() => {
      const { table } = settings
      let optionError = false
      let optionErrMess = []

      //table settings
      const { before, after, total } = table
      if (before + after !== total) {
         optionError = true
         optionErrMess.push("Number of month before and after doesn't match with the total")
      }

      if (total === 0) {
         optionError = true
         optionErrMess.push("Total is egal to 0")
      }

      setError({
         isError: optionError,
         errorMsg: optionErrMess
      })

      setIsLoading(false)
   }, [settings])

   const initialState = {
      mode: "mois",
      date: date,
      displayedDate: date,
      event: {},
      modal: {
         open: false,
         mode: "",
         event: {}
      },
      settings: settings
   }

   const diffDate = (mom, mom2) => mom2.date() !== mom.date() || mom2.month() !== mom.month() || mom2.year() !== mom.year()

   //loop through the events to assign them to each day
   useEffect(() => {
      if (isLoading) {
         return
      }
      const events = {}

      const { before, after } = settings.table
      for (const event of eventList) {
         const { start, end } = event

         if (end.diff(moment().add(-before, "M")) < 0 || start.diff(moment().add(after, "M")) > 0) continue

         let nbDays = 0
         let day = {}
         do {
            day = moment(event.start).add(nbDays, "d")
            nbDays++

            const dayFormat = day.format("YYYY MM DD")
            if (!events[dayFormat]) events[dayFormat] = []

            const newEvent = Object.assign({}, event)

            const timeInfo = { start, end, duration: 0 }

            //set the start to 00:00 if the real start is before the day
            if (diffDate(start, day)) {
               timeInfo.start = moment({ year: day.year(), month: day.month(), date: day.date(), hour: 0, minute: 0 })
            }

            //set the end to 23::59 if the real end is after the day
            if (diffDate(end, day)) {
               timeInfo.end = moment({ year: day.year(), month: day.month(), date: day.date(), hour: 23, minute: 59 })
            }
            //duration in quarters of hours
            timeInfo.duration = Math.ceil(Math.abs(timeInfo.start.diff(timeInfo.end) / 900000))
            newEvent["timeInfo"] = timeInfo
            events[dayFormat].push(newEvent)
         } while (diffDate(end, day))
      }
      for (const key in events) {
         if (Object.hasOwnProperty.call(events, key)) {
            const element = events[key]
            element.sort((firstEl, secondEl) => {
               if (firstEl.start.diff(secondEl.start) > 0) return 1
               else if (firstEl.start.diff(secondEl.start) < 0) return -1
               else return 0
            })
         }
      }

      dispatch({ type: "setEvents", value: events })
      console.log(events)
   }, [eventList, isLoading, settings.table])

   //reducer
   const reducer = (draft, action) => {
      switch (action.type) {
         case "showMois":
            draft.mode = "mois"
            break
         case "showSemaine":
            draft.mode = "semaine"
            break
         case "showJour":
            draft.mode = "jour"
            break
         case "updateDate":
            const date = moment()
            draft.date = date
            break
         case "setDisplayedDate":
            draft.displayedDate = action.date
            break
         case "addDays":
            draft.displayedDate = moment(draft.displayedDate).add(action.nbDays, "days")
            break
         case "addMonths":
            draft.displayedDate = moment(draft.displayedDate).add(action.nbDays, "month")
            break
         case "addEvent":
            addEvent(action.value)
            break
         case "openModal":
            draft.modal = { open: true, mode: action.mode, event: action.event }
            break
         case "closeModal":
            draft.modal.open = false
            break
         case "setEvents":
            draft.event = action.value
            break
         default:
            console.log("unrecognized type")
            break
      }
   }

   const [state, dispatch] = useImmerReducer(reducer, initialState)

   useEffect(() => {
      scrollToBody()
   }, [state.mode])

   if (isLoading)
      return (
         <Dimmer active inverted>
            <Loader> Loading</Loader>
         </Dimmer>
      )

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

const DAYS_NAME = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
const MONTH_NAMES = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"]
export { DAYS_NAME, MONTH_NAMES }
