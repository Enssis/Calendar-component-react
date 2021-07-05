import React, { useState } from 'react'
import { Button, Container, Grid, Header, Modal, Segment } from 'semantic-ui-react'
import { DatePicker } from 'rim-bdsit'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import 'rc-time-picker/assets/index.css'
import { BiggerTimePicker } from '../agenda.style'

const MomentPicker = props => {
   const { date, setSelectedDate, day } = props

   const [modalOpen, setModalOpen] = useState(false)
   const [selectedMoment, setSelectedMoment] = useState(date)

   const handleValidate = () => {
      setSelectedDate(selectedMoment)
      setModalOpen(false)
   }

   const handleDayChange = mom => {
      setSelectedMoment(moment(mom).second(0).millisecond(0))
   }

   const handleTimeChange = mom => {
      console.log(mom)
      if (mom !== null) setSelectedMoment(moment(mom).second(0).millisecond(0))
   }

   //popup to choose the time
   const TimeModal = () => (
      <Modal dimmer open={modalOpen} basic onClose={() => setModalOpen(false)} size="small">
         <Modal.Content>
            <Container text>
               <Segment>
                  {day ? (
                     <DatePicker moment={selectedMoment} onChange={handleDayChange} locale="fr" />
                  ) : (
                     <Segment>
                        <Grid centered container textAlign="center">
                           <Grid.Row>
                              <DatePicker moment={selectedMoment} onChange={handleDayChange} locale="fr" />
                           </Grid.Row>
                           <Grid.Row>
                              <Header as="h2"> Heure : </Header>
                           </Grid.Row>
                           <Grid.Row>
                              <BiggerTimePicker value={selectedMoment} onChange={handleTimeChange} minuteStep={5} showSecond={false} allowEmpty={false} />
                           </Grid.Row>
                        </Grid>
                     </Segment>
                  )}
               </Segment>
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
         <Button onClick={() => setModalOpen(true)}>{date.format(props.day ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm')}</Button>
         <TimeModal />
      </>
   )
}

export default MomentPicker
