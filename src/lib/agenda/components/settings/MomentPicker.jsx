import React, { useContext, useState } from 'react'
import { Button, Container, Grid, Header, Modal, Segment } from 'semantic-ui-react'
import { DatePicker } from 'rim-bdsit'
import moment from 'moment'
import 'rc-time-picker/assets/index.css'
import { BiggerTimePicker, StyledButton, StyledHeader, StyledModalActions, StyledModalContent, StyledSegment } from '../../agenda.style'
import StateContext from '../../StateContext'

const MomentPicker = props => {
   const { date, setSelectedDate, day } = props

   const { languageFile } = useContext(StateContext)
   const { hour } = languageFile.Creation

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
      <Modal dimmer basic open={modalOpen} onClose={() => setModalOpen(false)} size="small">
         <StyledModalContent light={1} style={{ padding: 10 }}>
            <Container text>
               <StyledSegment basic>
                  {day ? (
                     <DatePicker moment={selectedMoment} onChange={handleDayChange} locale="fr" />
                  ) : (
                     <StyledSegment basic>
                        <Grid centered container textAlign="center">
                           <Grid.Row>
                              <DatePicker moment={selectedMoment} onChange={handleDayChange} locale="fr" />
                           </Grid.Row>
                           <Grid.Row>
                              <StyledHeader accent={1} as="h2">
                                 {' '}
                                 {hour} :{' '}
                              </StyledHeader>
                           </Grid.Row>
                           <Grid.Row>
                              <BiggerTimePicker value={selectedMoment} onChange={handleTimeChange} minuteStep={5} showSecond={false} allowEmpty={false} />
                           </Grid.Row>
                        </Grid>
                     </StyledSegment>
                  )}
               </StyledSegment>
            </Container>
         </StyledModalContent>
         <StyledModalActions light={1}>
            <Button positive onClick={handleValidate}>
               Valider
            </Button>
            <Button negative onClick={() => setModalOpen(false)}>
               Annuler
            </Button>
         </StyledModalActions>
      </Modal>
   )

   return (
      <>
         <StyledButton onClick={() => setModalOpen(true)}>{date.format(props.day ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm')}</StyledButton>
         <TimeModal />
      </>
   )
}

export default MomentPicker
