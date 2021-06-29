import React, { useContext, useState } from 'react'
import { useImmer } from 'use-immer'
import { MODIF_EVENT, CLOSE_MODAL, DELETE_EVENT } from '../../constants'
//components
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import MomentPicker from './MomentPicker'
import ColorPicker from './ColorPicker'
import IconDropdown from './IconDropdown'
//context
import DispatchContext from '../../DispatchContext'

const CreateModal = props => {
   const appDispatch = useContext(DispatchContext)
   const { event } = props

   const [state, setState] = useImmer({
      entireDay: false,
      selectedColor: event.color,
      selectedIcon: event.icon,
      description: event.description,
      place: event.place,
      title: event.title,
      titleError: false,
      titleErrorMessage: { content: 'Veuillez rentrez un titre de plus de 4 charactères', pointing: 'below' },
      start: event.start,
      end: event.end
   })

   const [confirm, setConfirm] = useState(false)

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

   //Add the event created if there isn't any errors
   const handleValidate = () => {
      let error = false
      if (state.title.length < 1) {
         error = true
         setState(draft => {
            draft.titleError = true
         })
         setState(draft => {
            draft.titleErrorMessage = { content: 'Veuillez rentrez un titre de plus de 4 charactères', pointing: 'below' }
         })
      }

      if (!error) {
         const newEvent = {
            title: state.title,
            color: state.selectedColor,
            start: state.start,
            end: state.end,
            icon: state.selectedIcon,
            place: state.place,
            key: event.key,
            description: state.description
         }
         appDispatch({ type: MODIF_EVENT, value: newEvent })
         appDispatch({ type: CLOSE_MODAL })
      }
   }

   return (
      <>
         <Modal.Header>Modification de "{state.title}"</Modal.Header>
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
                           })
                        }
                     />
                  )}
               </Form.Group>
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
               <Form.Input label="Lieu" placeholder="Lieu" value={state.place} onChange={handlePlaceChange} />
               <Form.TextArea label="Description" value={state.description} onChange={handleDescriptionChange} />
            </Form>
         </Modal.Content>
         <Modal.Actions>
            <Button positive onClick={handleValidate}>
               Valider
            </Button>
            <Button negative onClick={() => setConfirm(true)}>
               Supprimer
            </Button>
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
