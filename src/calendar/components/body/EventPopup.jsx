import React, { useContext, useState } from "react"
import { Label, List, Popup, Segment } from "semantic-ui-react"
import DispatchContext from "../../DispatchContext"
import StateContext from "../../StateContext"

const EventPopup = props => {
   const { event, trigger, left, open, context } = props
   const { start, end, title, description, place } = event

   const appDispatch = useContext(DispatchContext)
   const appState = useContext(StateContext)

   const duration = Math.ceil(Math.abs(start.diff(end) / 900000))

   const [showFullDesc, setShowFullDesc] = useState(false)
   const [showFullPlace, setShowFullPlace] = useState(false)

   const goToDay = date => {
      if (!date.isSame(appState.displayedDate, "day") || appState.mode !== "jour") {
         appDispatch({ type: "setDisplayedDate", date })
         appDispatch({ type: "showJour" })
      }
   }

   const trigg = () => {
      if (trigger) {
         return { trigger: trigger }
      } else {
         return { context: context, open: open }
      }
   }

   return (
      <Popup {...trigg()} hoverable wide position={left ? "left center" : "top center"}>
         <Popup.Header>{title}</Popup.Header>
         <Popup.Content>
            <Segment>
               <List>
                  <List.Item>
                     <Label color="green" image as="a" onClick={() => goToDay(start)}>
                        Début
                        <Label.Detail> {`${start.format("DD/MM/YYYY")} à ${start.format("kk:mm")}h `} </Label.Detail>
                     </Label>
                  </List.Item>
                  <List.Item>
                     <Label color="red" image as="a" onClick={() => goToDay(end)}>
                        Fin
                        <Label.Detail> {`${end.format("DD/MM/YYYY")} à ${end.format("kk:mm")}h `} </Label.Detail>
                     </Label>
                  </List.Item>
                  <List.Item>
                     <Label color="yellow" image>
                        Durée
                        <Label.Detail> {`${Math.floor(duration / 96) > 0 ? `${Math.floor(duration / 96)} jours ` : ""}${Math.floor(duration / 4) % 24 > 0 ? `${Math.floor(duration / 4) % 24} heures ` : ""}${duration % 4 > 0 ? `${(duration % 4) * 15} minutes` : ""} `} </Label.Detail>
                     </Label>
                  </List.Item>
                  <List.Item>
                     <Label color="teal" image onClick={() => setShowFullDesc(!showFullDesc)} as="a">
                        {!showFullDesc ? "Description" : ""}
                        <Label.Detail> {!showFullDesc && description.length > 20 ? `${description.substring(0, 20)}...` : description} </Label.Detail>
                     </Label>
                  </List.Item>
                  <List.Item>
                     <Label color="orange" image onClick={() => setShowFullPlace(!showFullPlace)} as="a">
                        {!showFullPlace ? "Lieu" : ""}
                        <Label.Detail> {!showFullPlace && place.length > 20 ? `${place.substring(0, 20)}...` : place} </Label.Detail>
                     </Label>
                  </List.Item>
               </List>
            </Segment>
         </Popup.Content>
      </Popup>
   )
}

export default EventPopup
