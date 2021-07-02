import React, { useState } from 'react'
import { List, Segment, Button, Modal } from 'semantic-ui-react'
import { PhotoshopPicker } from 'react-color'

const ColorList = props => {
   const { colors, setColors, setModalOpen } = props

   const [showKey, setShowKey] = useState(-1)
   const [openColorModal, setOpenColorModal] = useState(false)
   const [color, setColor] = useState('#fff')

   //check if the color doesn't already exist, add it and close the modal
   const handleAccept = () => {
      if (colors.indexOf(color.hex) < 0) {
         setColors(colors.concat(color.hex))
      }
      handleModalChange(false)
   }

   const handleRemove = color => {
      setColors(colors.filter(el => el !== color))
   }

   const handleModalChange = value => {
      if (value) setModalOpen(value)
      else setTimeout(() => setModalOpen(value), 200)

      setOpenColorModal(value)
   }

   return (
      <Segment basic style={{ margin: 0, paddingTop: 0 }}>
         <List horizontal>
            {colors.map((color, key) => {
               return (
                  <List.Item key={key}>
                     <Button icon={showKey === key ? 'remove' : ''} style={{ backgroundColor: color, padding: 10 }} onMouseEnter={() => setShowKey(key)} onMouseLeave={() => setShowKey(-1)} onClick={() => handleRemove(color)} />
                  </List.Item>
               )
            })}
            <List.Item>
               <Button icon="add" style={{ backgroundColor: '#eee', padding: 10 }} onClick={() => handleModalChange(true)} />
            </List.Item>
         </List>
         <Modal basic size="tiny" open={openColorModal} onClose={() => handleModalChange(false)}>
            <Modal.Content>
               <PhotoshopPicker color={color} onChange={color => setColor(color)} header="Nouvelle Couleur" onAccept={handleAccept} onCancel={() => handleModalChange(false)} />
            </Modal.Content>
         </Modal>
      </Segment>
   )
}

export default ColorList
