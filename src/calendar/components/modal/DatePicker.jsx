import React, { useState } from "react"
import { Button, Container, Modal } from "semantic-ui-react"
import { BigInputMoment } from "rim-bdsit"

const DatePicker = props => {
   const { date, setSelectedDate } = props

   const [modalOpen, setModalOpen] = useState(false)
   const [selectedMoment, setSelectedMoment] = useState(date)

   const handleValidate = () => {
      setSelectedDate(selectedMoment)
      setModalOpen(false)
   }

   //popup to choose the time
   const TimeModal = () => (
      <Modal dimmer="blurring" open={modalOpen} onClose={() => setModalOpen(false)} size="mini">
         <Modal.Header>Choix de la date</Modal.Header>
         <Modal.Content>
            <Container text>
               <BigInputMoment moment={selectedMoment} onChange={mom => setSelectedMoment(mom)} locale="fr" />
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

export default DatePicker
