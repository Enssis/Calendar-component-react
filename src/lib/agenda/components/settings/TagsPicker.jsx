import React, { useContext, useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'semantic-ui-react'
import StateContext from '../../StateContext'
import DispatchContext from '../../DispatchContext'
import { useImmer } from 'use-immer'
import { ADD_ACTIVE_TAG, SET_TAGS } from '../../constants'

const TagsPicker = props => {
   const { tagsList } = useContext(StateContext).settings
   const appDispatch = useContext(DispatchContext)

   const { tags, setTags } = props

   const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black']

   const colorsDropdown = colors.map(color => ({
      key: color,
      value: color,
      text: color,
      label: { color, empty: true, circular: true }
   }))

   const [newTagModal, setNewTagModal] = useState(false)
   const [newTag, setNewTag] = useImmer({ name: '', color: 'red' })

   //list of tags
   const tagDropdown = Object.entries(tagsList)
      .map(([key, value]) => {
         return { key, value: key, text: value.name, label: { color: value.color, empty: true, circular: true } }
      })
      .concat({ key: 'ADD', value: 'ADD', text: 'Créer un nouveau tag' })

   //customize render for the labels
   const renderLabel = label => {
      if (label.value !== 'ADD')
         return {
            color: tagsList[label.value].color,
            content: label.text
         }
   }

   const handleDropdownChange = (_, data) => {
      if (data.value.indexOf('ADD') < 0) setTags(data.value)
      else setNewTagModal(true)
   }

   const makeKey = len => {
      let res = ''
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charsLen = chars.length
      for (let i = 0; i < len; i++) {
         res += chars.charAt(Math.floor(Math.random() * charsLen))
      }
      return res
   }

   const handleCreate = () => {
      if (newTag.name.length > 0) {
         const newTagsList = Object.assign({}, tagsList)
         let key = ''
         do {
            key = makeKey(5)
         } while (newTagsList[key] !== undefined)
         newTagsList[key] = newTag
         console.log(tags.concat(newTag))
         setTags(tags.concat(key))
         appDispatch({ type: SET_TAGS, value: newTagsList })
         appDispatch({ type: ADD_ACTIVE_TAG, value: newTag, key })
         setNewTag({ name: '', color: 'red' })
         setNewTagModal(false)
      }
   }
   return (
      <>
         <Modal size="small" open={newTagModal} onClose={() => setNewTagModal(false)}>
            <Modal.Header>Créer un nouveau tag</Modal.Header>
            <Modal.Content>
               <Form>
                  <Form.Input
                     label="Nom"
                     placeholder="Nom"
                     text={newTag.name}
                     onChange={(_, data) =>
                        setNewTag(draft => {
                           draft.name = data.value
                        })
                     }
                  />
                  <Form.Field
                     label="Couleur"
                     control={Dropdown}
                     value={newTag.color}
                     selection
                     options={colorsDropdown}
                     onChange={(_, data) =>
                        setNewTag(draft => {
                           draft.color = data.value
                        })
                     }
                  />
               </Form>
            </Modal.Content>
            <Modal.Actions>
               <Button positive onClick={handleCreate}>
                  Créer
               </Button>
               <Button negative onClick={() => setNewTagModal(false)}>
                  Annuler
               </Button>
            </Modal.Actions>
         </Modal>
         <Dropdown selection fluid selectOnNavigation={false} noResultsMessage={null} multiple value={tags} search placeholder="Tag" renderLabel={renderLabel} options={tagDropdown} onChange={handleDropdownChange}></Dropdown>
      </>
   )
}

export default TagsPicker
