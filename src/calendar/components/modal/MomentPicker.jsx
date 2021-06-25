import React, { useState } from "react"
import { Button, Container, Modal, Segment } from "semantic-ui-react"
import { BigInputMoment, DatePicker } from "rim-bdsit"

const MomentPicker = props => {
   const { date, setSelectedDate, day } = props

   const [modalOpen, setModalOpen] = useState(false)
   const [selectedMoment, setSelectedMoment] = useState(date)

   const handleValidate = () => {
      setSelectedDate(selectedMoment)
      setModalOpen(false)
   }

   const handleMomentChange = mom => {
      setSelectedMoment(mom)
   }

   //popup to choose the time
   const TimeModal = () => (
      <Modal dimmer="blurring" open={modalOpen} basic onClose={() => setModalOpen(false)} size="small">
         <Modal.Content>
            <Container text>
               <Segment>{day ? <DatePicker moment={selectedMoment} onChange={handleMomentChange} locale="fr" /> : <BigInputMoment moment={selectedMoment} onChange={handleMomentChange} locale="fr" />}</Segment>
            </Container>
         </Modal.Content>
         <Modal.Actions>
            <Button positive onClick={handleValidate}>
               Valider
            </Button>
            <Button negative onClick={() => setModalOpen(false)}>
               Annuler
            </Button>
         </Modal.Actions>
      </Modal>
   )

   return (
      <>
         <Button onClick={() => setModalOpen(true)}>{date.format(props.day ? "DD/MM/YYYY" : "DD/MM/YYYY HH:mm")}</Button>
         <TimeModal />
      </>
   )
}

export default MomentPicker
