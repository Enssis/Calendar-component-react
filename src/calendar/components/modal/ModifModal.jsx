import React from "react"
import { Modal } from "semantic-ui-react"

const ModifModal = props => {
   const event = props.event
   return (
      <>
         <Modal.Header>Modification</Modal.Header>
         <Modal.Content>{event.title}</Modal.Content>
         <Modal.Actions></Modal.Actions>
      </>
   )
}

export default ModifModal
