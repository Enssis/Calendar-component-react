import React, { useContext, useState } from 'react'
import { useImmer } from 'use-immer'
import moment from 'moment'
import { ADD_EVENT, CLOSE_MODAL, CREATE, DELETE_EVENT, MODIF_EVENT } from '../../constants'
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
   const { modal, eventList, theme, languageFile } = useContext(StateContext)
   const { Event, Creation, Actions } = languageFile
   const { create_title, modif_title, entire_day, color, icon, Errors, Confirm } = Creation
   const { createBackground } = theme
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
           titleErrorMessage: {},
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
           titleErrorMessage: {},
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

   //function to create key
   const makeKey = len => {
      let res = ''
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charsLen = chars.length
      for (let i = 0; i < len; i++) {
         res += chars.charAt(Math.floor(Math.random() * charsLen))
      }
      return res
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
            draft.titleErrorMessage = { content: Errors.short_title, pointing: 'below' }
         })
      }

      //if the start is after the end
      if (state.start.diff(state.end) > 0 && !state.entireDay) {
         error = true
         setState(draft => {
            draft.timeError = true
         })
         setState(draft => {
            draft.timeErrorMessage = Errors.start_end
         })
      }

      if (!error) {
         let key = createMode ? makeKey(10) : event.key

         if (createMode) {
            while (eventList.filter(el => el.key === key).length > 0) {
               key = makeKey(10)
            }
         }

         const newEvent = {
            title: state.title,
            color: state.selectedColor,
            start: state.entireDay ? setTime(state.start, 0, 0, 0, 0) : state.start,
            end: state.entireDay ? setTime(state.start, 23, 59, 0, 0) : state.end,
            icon: state.selectedIcon,
            place: state.place,
            tags: state.tags,
            key,
            description: state.description
         }
         appDispatch({ type: createMode ? ADD_EVENT : MODIF_EVENT, value: newEvent })
         appDispatch({ type: CLOSE_MODAL })
      }
   }

   return (
      <>
         <Modal.Header style={{ backgroundColor: createBackground }}>{createMode ? create_title : modif_title.replace('$', state.title)}</Modal.Header>
         <Modal.Content style={{ backgroundColor: createBackground }}>
            <Form>
               <Form.Input error={state.titleError ? state.titleErrorMessage : null} label={Event.title} placeholder={Event.title} value={state.title} onChange={handleTitleChange} />
               <Form.Checkbox
                  label={entire_day}
                  onChange={(e, { checked }) =>
                     setState(draft => {
                        draft.entireDay = checked
                     })
                  }
               />
               <Form.Group>
                  <Form.Field
                     control={MomentPicker}
                     label={state.entireDay ? languageFile.day : Event.start}
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
                        label={Event.end}
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
                     label={color + ' :'}
                     color={state.selectedColor}
                     setColor={value =>
                        setState(draft => {
                           draft.selectedColor = value
                        })
                     }
                  />
                  <Form.Field
                     label={icon + ' :'}
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
                  label={Event.tags}
                  control={TagsPicker}
                  tags={state.tags}
                  setTags={value =>
                     setState(draft => {
                        draft.tags = value
                     })
                  }
               />
               <Form.Input label={Event.place} placeholder={Event.place} value={state.place} onChange={handlePlaceChange} />
               <Form.TextArea label={Event.description} value={state.description} onChange={handleDescriptionChange} />
            </Form>
         </Modal.Content>
         <Modal.Actions style={{ backgroundColor: createBackground }}>
            <Button positive onClick={handleValidate}>
               {Actions.confirm}
            </Button>
            {createMode ? null : (
               <Button negative onClick={() => setConfirm(true)}>
                  {Actions.delete}
               </Button>
            )}

            <Button negative onClick={() => appDispatch({ type: CLOSE_MODAL })}>
               {Actions.cancel}
            </Button>
         </Modal.Actions>
         {confirm ? (
            <Modal open size="small">
               <Modal.Header style={{ backgroundColor: createBackground }}>{Confirm.sure}</Modal.Header>
               <Modal.Content style={{ backgroundColor: createBackground }}>{Confirm.irrevocable}</Modal.Content>
               <Modal.Actions style={{ backgroundColor: createBackground }}>
                  <Button positive onClick={handleDelete}>
                     <Icon name="checkmark" /> {Confirm.yes}
                  </Button>
                  <Button negative onClick={() => setConfirm(false)}>
                     <Icon name="remove" /> {Confirm.no}
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
