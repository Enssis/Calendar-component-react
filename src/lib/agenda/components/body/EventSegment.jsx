import React, { useContext, useRef, useState } from 'react'
import { CREATE, OPEN_MODAL, MODIF } from '../../constants'

//context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'

//components
import { SizedSegment } from '../../agenda.style'
import { Header, Icon } from 'semantic-ui-react'
import EventPopup from './EventPopup'

//function to create the context where the popup will be rendered
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

/*
   Component rendering an event in day mode, with the popup with the event info rendering where the mouse is 
   if event is null render just an empty case
*/
const EventSegment = props => {
   const { event, size, moment } = props
   const appDispatch = useContext(DispatchContext)
   const { settings, theme } = useContext(StateContext)
   const { caseBackground } = theme
   const contextRef = useRef(null)
   const [open, setOpen] = useState(false)

   //in case event is null, open the create modal with the current moment if creation is allowed
   const handleCreateClick = () => {
      if (settings.allowCreation || settings.allowCreation === undefined) appDispatch({ type: OPEN_MODAL, mode: CREATE, event: moment })
   }

   //in case event isn't null, open the modification modal with the current event if modification is allowed
   const handleModifClick = () => {
      if (settings.allowModification || settings.allowModification === undefined) appDispatch({ type: OPEN_MODAL, mode: MODIF, event })
   }

   //empty case
   if (event == null) {
      return <SizedSegment nohover={!settings.allowCreation ? 1 : 0} nomargin={1} nopadding={1} height={size} vertical onClick={handleCreateClick} light={1}></SizedSegment>
   }

   return (
      <>
         <EventPopup
            trigger={
               <div>
                  <SizedSegment
                     border={1}
                     nomargin={1}
                     height={size}
                     vertical
                     onClick={handleModifClick}
                     backcolor={event.color}
                     onMouseMove={e => {
                        e.preventDefault()
                        contextRef.current = createContextFromEvent(e)
                        setOpen(true)
                     }}
                  >
                     <Header as="h3">
                        {event.icon !== '' ? (
                           <>
                              <Icon name={event.icon} size="tiny" />
                           </>
                        ) : (
                           ''
                        )}
                        {event.title}
                     </Header>
                  </SizedSegment>
               </div>
            }
            event={event}
            open={open}
            onClose={() => setOpen(false)}
         />
      </>
   )
}

export default EventSegment
