import React, { useContext, useState } from 'react'

//components
import { Header, Icon, Label, List, Popup, Segment } from 'semantic-ui-react'
import { DAY, SET_DISPLAYED_DATE, SET_MODE } from '../../constants'

//context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'

/*
   Component rendering a popup with all the info of the event 
 */
const EventPopup = props => {
   const { event, trigger, left, open, context } = props
   const { start, end, title, description, place, icon, tags } = event

   const appDispatch = useContext(DispatchContext)
   const { mode, displayedDate, debug, settings } = useContext(StateContext)
   const { tagsList } = settings

   //stock the duration of the event
   const duration = Math.ceil(Math.abs(start.diff(end) / 900000))

   const [showFullDesc, setShowFullDesc] = useState(false)
   const [showFullPlace, setShowFullPlace] = useState(false)

   //set the displayed day to be the clicked date and switch to day mode
   const goToDay = date => {
      if (!date.isSame(displayedDate, 'day') || mode !== 'jour') {
         appDispatch({ type: SET_DISPLAYED_DATE, date })
         appDispatch({ type: SET_MODE, data: DAY })
      }
   }

   //chanche if in mode trigger component or context component control
   const trigg = () => {
      if (trigger) {
         return { trigger: trigger }
      } else {
         return { context: context, open: open }
      }
   }

   return (
      <Popup {...trigg()} hoverable wide hideOnScroll position={left ? 'left center' : 'left center'}>
         <Popup.Header>
            <Icon name={icon} /> {title}
         </Popup.Header>
         <Popup.Content>
            <Segment>
               <List>
                  <List.Item>
                     <Label color="green" image as="a" onClick={() => goToDay(start)}>
                        Début
                        <Label.Detail> {`${start.format('DD/MM/YYYY')} à ${start.format('kk:mm')}h `} </Label.Detail>
                     </Label>
                  </List.Item>
                  <List.Item>
                     <Label color="red" image as="a" onClick={() => goToDay(end)}>
                        Fin
                        <Label.Detail> {`${end.format('DD/MM/YYYY')} à ${end.format('kk:mm')}h `} </Label.Detail>
                     </Label>
                  </List.Item>
                  <List.Item>
                     <Label color="yellow" image>
                        Durée
                        <Label.Detail> {`${Math.floor(duration / 96) > 0 ? `${Math.floor(duration / 96)} jours ` : ''}${Math.floor(duration / 4) % 24 > 0 ? `${Math.floor(duration / 4) % 24} heures ` : ''}${duration % 4 > 0 ? `${(duration % 4) * 15} minutes` : ''} `} </Label.Detail>
                     </Label>
                  </List.Item>
                  <List.Item>
                     <Label color="teal" image onClick={() => setShowFullDesc(!showFullDesc)} as="a">
                        {!showFullDesc ? 'Description' : ''}
                        <Label.Detail> {!showFullDesc && description.length > 20 ? `${description.substring(0, 20)}...` : description} </Label.Detail>
                     </Label>
                  </List.Item>
                  <List.Item>
                     <Label color="orange" image onClick={() => setShowFullPlace(!showFullPlace)} as="a">
                        {!showFullPlace ? 'Lieu' : ''}
                        <Label.Detail> {!showFullPlace && place.length > 20 ? `${place.substring(0, 20)}...` : place} </Label.Detail>
                     </Label>
                  </List.Item>
                  {tags.length > 0 ? (
                     <List.Item>
                        <Header as="h5">Tags : </Header>
                        <List horizontal>
                           {tags.map(tagKey => {
                              const tag = tagsList[tagKey]
                              return (
                                 <List.Item key={tagKey}>
                                    <Label tag color={tag.color}>
                                       {tag.name}
                                    </Label>
                                 </List.Item>
                              )
                           })}
                        </List>
                     </List.Item>
                  ) : null}

                  {
                     /*USED FOR DEBUG TO REMOVE !!!!! */
                     debug ? (
                        <>
                           <List.Item>
                              <Label color="blue" image>
                                 Column
                                 <Label.Detail> {event.timeInfo.column} </Label.Detail>
                              </Label>
                           </List.Item>
                           <List.Item>
                              <Label color="blue" image>
                                 Start
                                 <Label.Detail> {`${event.timeInfo.start.format('DD/MM/YYYY')} à ${event.timeInfo.start.format('kk:mm')}h `} </Label.Detail>
                              </Label>
                           </List.Item>
                           <List.Item>
                              <Label color="blue" image>
                                 End
                                 <Label.Detail> {`${event.timeInfo.end.format('DD/MM/YYYY')} à ${event.timeInfo.end.format('kk:mm')}h `} </Label.Detail>
                              </Label>
                           </List.Item>
                        </>
                     ) : (
                        ''
                     )
                  }
               </List>
            </Segment>
         </Popup.Content>
      </Popup>
   )
}

export default EventPopup