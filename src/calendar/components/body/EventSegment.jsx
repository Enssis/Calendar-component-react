import React, { useContext } from "react"
import { Header, Icon } from "semantic-ui-react"
import DispatchContext from "../../DispatchContext"
import { SizedSegment } from "../calendar.style"

const EventSegment = props => {
   const event = props.event
   const appDispatch = useContext(DispatchContext)

   if (event == null) {
      return <SizedSegment nomargin={1} height={40} vertical onClick={() => appDispatch({ type: "openModal", mode: "create", event: props.moment })} backcolor="#ffffff"></SizedSegment>
   }

   return (
      <>
         <SizedSegment nomargin={1} height={props.size} vertical onClick={() => appDispatch({ type: "openModal", mode: "modif", event })} backcolor={event.color}>
            <Header as="h5">
               <Icon name={event.icon} size="tiny" />
               {" " + event.title}
            </Header>
         </SizedSegment>
      </>
   )
}

export default EventSegment
