import React, { useContext, useState } from 'react'
import { useImmer } from 'use-immer'
import moment from 'moment'
import { ADD_EVENT, CLOSE_MODAL, CREATE, DELETE_EVENT, MODIF, MODIF_EVENT } from '../../constants'
//components
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react'
import MomentPicker from './MomentPicker'
import ColorPicker from './ColorPicker'
import IconDropdown from './IconDropdown'
import TagsPicker from './TagsPicker'
//context
import DispatchContext from '../../DispatchContext'
import StateContext from '../../StateContext'

const CreateModal = props => {
   const appDispatch = useContext(DispatchContext)
   const { modal } = useContext(StateContext)
   const { event } = props
   const createMode = modal.mode === CREATE

   const initialState = createMode
      ? {
           entireDay: false,
           selectedColor: '#0ed3ed',
           selectedIcon: '',
           description: '',
           place: '',
           title: '',
           titleError: false,
           titleErrorMessage: { content: 'Veuillez rentrez un titre de plus de 4 charactères', pointing: 'below' },
           start: moment(event),
           end: moment(event).add(15, 'minutes'),
           tags: [],
           timeError: '',
           timeErrorMessage: ''
        }
      : {
           entireDay: false,
           selectedColor: event.color,
           selectedIcon: event.icon,
           description: event.description,
           place: event.place,
           title: event.title,
           titleError: false,
           tags: event.tags,
           titleErrorMessage: { content: 'Veuillez rentrez un titre de plus de 4 charactères', pointing: 'below' },
           start: event.start,
           end: event.end
        }

   const [confirm, setConfirm] = useState(false)
   const [state, setState] = useImmer(initialState)

   //for the three functions : change the value of the place when something is typed

   const handleDescriptionChange = (e, data) => {
      setState(draft => {
         draft.description = data.value
      })
   }

   const handleTitleChange = (e, data) => {
      setState(draft => {
         draft.titleError = false
         draft.title = data.value
      })
   }

   const handlePlaceChange = (e, data) => {
      setState(draft => {
         draft.place = data.value
      })
   }

   //Delete the event from the list
   const handleDelete = () => {
      setConfirm(false)
      appDispatch({ type: DELETE_EVENT, value: event })
      appDispatch({ type: CLOSE_MODAL })
   }

   //function to set a certain moment to a certain time
   function setTime(time, hour = -1, min = -1, sec = -1, millis = -1) {
      const newTime = moment(time)
      if (hour >= 0) newTime.hour(hour)
      if (min >= 0) newTime.minutes(min)
      if (sec >= 0) newTime.seconds(sec)
      if (millis >= 0) newTime.millisecond(millis)
      return newTime
   }

   //Add the event created if there isn't any errors
   const handleValidate = () => {
      let error = false
      //if there is no title => error
      if (state.title.length < 1) {
         error = true
         setState(draft => {
            draft.titleError = true
         })
         setState(draft => {
            draft.titleErrorMessage = { content: 'Veuillez rentrez un titre de plus de 4 charactères', pointing: 'below' }
         })
      }

      //if the start is after the end
      if (state.start.diff(state.end) > 0 && !state.entireDay) {
         error = true
         setState(draft => {
            draft.timeError = true
         })
         setState(draft => {
            draft.timeErrorMessage = "Le début de l'évennement doit se passer avant la fin"
         })
      }

      if (!error) {
         const newEvent = {
            title: state.title,
            color: state.selectedColor,
            start: state.entireDay ? setTime(state.start, 0, 0, 0, 0) : state.start,
            end: state.entireDay ? setTime(state.start, 23, 59, 0, 0) : state.end,
            icon: state.selectedIcon,
            place: state.place,
            tags: state.tags,
            key: createMode ? Math.floor(Math.random() * 1000000) : event.key,
            description: state.description
         }
         appDispatch({ type: createMode ? ADD_EVENT : MODIF_EVENT, value: newEvent })
         appDispatch({ type: CLOSE_MODAL })
      }
   }

   return (
      <>
         <Modal.Header>{createMode ? "Création d'un nouvel évennement" : `Modification de "${state.title}"`}</Modal.Header>
         <Modal.Content>
            <Form>
               <Form.Input error={state.titleError ? state.titleErrorMessage : null} label="Titre" placeholder="Titre" value={state.title} onChange={handleTitleChange} />
               <Form.Checkbox
                  label="Jour entier"
                  onChange={(e, { checked }) =>
                     setState(draft => {
                        draft.entireDay = checked
                     })
                  }
               />
               <Form.Group>
                  <Form.Field
                     control={MomentPicker}
                     label={state.entireDay ? 'Jour' : 'Début'}
                     day={state.entireDay}
                     date={state.start}
                     setSelectedDate={value =>
                        setState(draft => {
                           draft.start = value
                           draft.timeError = false
                        })
                     }
                  />
                  {state.entireDay ? (
                     ''
                  ) : (
                     <Form.Field
                        control={MomentPicker}
                        label="Fin"
                        date={state.end}
                        setSelectedDate={value =>
                           setState(draft => {
                              draft.end = value
                              draft.timeError = false
                           })
                        }
                     />
                  )}
               </Form.Group>
               {state.timeError ? <Message negative>{state.timeErrorMessage}</Message> : ''}
               <Form.Group>
                  <Form.Field
                     control={ColorPicker}
                     label="Couleur :"
                     color={state.selectedColor}
                     setColor={value =>
                        setState(draft => {
                           draft.selectedColor = value
                        })
                     }
                  />
                  <Form.Field
                     label="Icone :"
                     control={IconDropdown}
                     selectedIcon={state.selectedIcon}
                     setSelectedIcon={value =>
                        setState(draft => {
                           draft.selectedIcon = value
                        })
                     }
                  />
               </Form.Group>
               <Form.Field
                  label="Tags"
                  control={TagsPicker}
                  tags={state.tags}
                  setTags={value =>
                     setState(draft => {
                        draft.tags = value
                     })
                  }
               />
               <Form.Input label="Lieu" placeholder="Lieu" value={state.place} onChange={handlePlaceChange} />
               <Form.TextArea label="Description" value={state.description} onChange={handleDescriptionChange} />
            </Form>
         </Modal.Content>
         <Modal.Actions>
            <Button positive onClick={handleValidate}>
               Valider
            </Button>
            {createMode ? null : (
               <Button negative onClick={() => setConfirm(true)}>
                  Supprimer
               </Button>
            )}

            <Button negative onClick={() => appDispatch({ type: CLOSE_MODAL })}>
               Annuler
            </Button>
         </Modal.Actions>
         {confirm ? (
            <Modal open size="small">
               <Modal.Header>Êtes vous sur de vouloir supprimer cet évennement ?</Modal.Header>
               <Modal.Content>Cette action est irréversible</Modal.Content>
               <Modal.Actions>
                  <Button positive onClick={handleDelete}>
                     <Icon name="checkmark" /> Oui
                  </Button>
                  <Button negative onClick={() => setConfirm(false)}>
                     <Icon name="remove" /> Non
                  </Button>
               </Modal.Actions>
            </Modal>
         ) : (
            ''
         )}
      </>
   )
}

export default CreateModal
