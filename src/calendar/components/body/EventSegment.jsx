import React, { useContext, useRef, useState } from "react"
import { Header, Icon } from "semantic-ui-react"
import DispatchContext from "../../DispatchContext"
import { SizedSegment } from "../calendar.style"
import StateContext from "../../StateContext"
import EventPopup from "./EventPopup"

function createContextFromEvent(e) {
   const left = e.clientX
   const top = e.clientY
   const right = left + 1
   const bottom = top + 1

   return {
      getBoundingClientRect: () => ({
         left,
         top,
         right,
         bottom,

         height: 0,
         width: 0
      })
   }
}

const EventSegment = props => {
   const event = props.event
   const appDispatch = useContext(DispatchContext)
   const { settings } = useContext(StateContext)
   const contextRef = useRef(null)
   const [open, setOpen] = useState(false)

   const handleCreateClick = () => {
      if (settings.allowCreation) appDispatch({ type: "openModal", mode: "create", event: props.moment })
   }

   const handleModifClick = () => {
      if (settings.allowModification) appDispatch({ type: "openModal", mode: "modif", event })
   }

   if (event == null) {
      return <SizedSegment nohover={!settings.allowCreation} nomargin={1} height={40} vertical onClick={handleCreateClick} backcolor="#ffffff"></SizedSegment>
   }

   return (
      <>
         <SizedSegment
            border={1}
            nomargin={1}
            height={props.size}
            vertical
            onClick={handleModifClick}
            backcolor={event.color}
            onMouseLeave={() => setOpen(false)}
            onMouseMove={e => {
               e.preventDefault()
               contextRef.current = createContextFromEvent(e)
               setOpen(true)
            }}
         >
            <EventPopup context={contextRef} event={event} open={open} onClose={() => setOpen(false)} />
            <Header as="h3">
               {event.icon !== "" ? (
                  <>
                     <Icon name={event.icon} size="tiny" />
                  </>
               ) : (
                  ""
               )}
               {event.title}
            </Header>
         </SizedSegment>
      </>
   )
}

export default EventSegment
