import React, { useContext } from "react"
import { Button, Form, Modal } from "semantic-ui-react"
import MomentPicker from "./MomentPicker"
import ColorPicker from "./ColorPicker"
import IconDropdown from "./IconDropdown"
import { useImmer } from "use-immer"
import DispatchContext from "../../DispatchContext"
import moment from "moment"

const CreateModal = props => {
   const appDispatch = useContext(DispatchContext)
   const { event } = props

   const [state, setState] = useImmer({
      entireDay: false,
      selectedColor: "#0ed3ed",
      selectedIcon: "",
      description: "",
      place: "",
      title: "",
      titleError: false,
      titleErrorMessage: { content: "Veuillez rentrez un titre de plus de 4 charactères", pointing: "below" },
      start: moment(event),
      end: moment(event).add(15, "minutes")
   })
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

   const handleValidate = () => {
      let error = false
      if (state.title.length < 1) {
         error = true
         setState(draft => {
            draft.titleError = true
         })
         setState(draft => {
            draft.titleErrorMessage = { content: "Veuillez rentrez un titre de plus de 4 charactères", pointing: "below" }
         })
      }

      if (!error) {
         const event = {
            title: state.title,
            color: state.selectedColor,
            start: state.start,
            end: state.end,
            icon: state.selectedIcon,
            place: state.place,
            key: Math.floor(Math.random() * 1000000),
            description: state.description
         }
         appDispatch({ type: "addEvent", value: event })
         appDispatch({ type: "closeModal" })
      }
   }

   return (
      <>
         <Modal.Header>Création d'un nouvel évennement</Modal.Header>
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
                     label={state.entireDay ? "Jour" : "Début"}
                     day={state.entireDay}
                     date={state.start}
                     setSelectedDate={value =>
                        setState(draft => {
                           draft.start = value
                        })
                     }
                  />
                  {state.entireDay ? (
                     ""
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
            <Button negative onClick={() => appDispatch({ type: "closeModal" })}>
               Annuler
            </Button>
         </Modal.Actions>
      </>
   )
}

export default CreateModal
