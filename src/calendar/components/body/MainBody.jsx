import React, { useContext, useEffect, useState } from 'react'
import { MainSegmentGroup } from '../calendar.style'
import { Grid, Message, Segment } from 'semantic-ui-react'
import BodyMenu from './BodyMenu'
import CalendarGrid from './CalendarGrid'
import StateContext from '../../StateContext'
import moment from 'moment'
import { MONTH, WEEK } from '../../constants'

/*
   Component used to render all differnt elements inside of the body
*/
const MainBody = () => {
   const { settings, mode, displayedDate } = useContext(StateContext)

   //use to check if the date is in the dates where the event are defined
   const [eventCharged, setEventCharged] = useState('totally')
   const [limitDate, setLimitDate] = useState({ before: {}, after: {} })

   //check if in the mode displayed there is day out of time limit bound
   useEffect(() => {
      let charged = 'totally'
      const limitBefore = moment().add(-settings.table.before, 'M')
      const limitAfter = moment().add(settings.table.after, 'M')

      setLimitDate({ before: limitBefore, after: limitAfter })

      //if the displayed date isn't in the bound set the charged value to ""
      if ((displayedDate.diff(limitBefore) < 0 && !displayedDate.isSame(limitBefore, 'day')) || (displayedDate.diff(limitAfter) > 0 && !displayedDate.isSame(limitAfter, 'day'))) {
         charged = ''
      }

      //in case of week mode, test if the first day of the displayed date is equal to the first day of limit after or before weeks
      if (mode === WEEK) {
         //Firsts days of the limit before / limit after and displayed week
         const fdoLimitBeforeWeek = moment(limitBefore).add(-limitBefore.day(), 'd')
         const fdoLimitAfterWeek = moment(limitAfter).add(-limitAfter.day(), 'd')
         const fdoDisplayedWeek = moment(displayedDate).add(-displayedDate.day(), 'd')

         if (fdoLimitAfterWeek.isSame(fdoDisplayedWeek, 'day') || fdoLimitBeforeWeek.isSame(fdoDisplayedWeek, 'day')) charged = 'partially'
      }

      //in case of month case, test if it's the same month for displayed date and one of the limits
      if (mode === MONTH) {
         if (limitBefore.isSame(displayedDate, 'month') || limitAfter.isSame(displayedDate, 'month')) {
            charged = 'partially'
         }
      }

      setEventCharged(charged)
   }, [settings, mode, displayedDate])

   return (
      <Grid container centered>
         <Grid.Column textAlign="center">
            {eventCharged !== 'totally' ? (
               <Message warning>
                  <Message.Header>
                     Vous regardez {mode === 'mois' ? 'un mois' : mode === 'jour' ? 'une date' : 'une semaine'} dont les évennements n'ont pas été {eventCharged === 'partially' ? 'totallement' : ''} importés
                  </Message.Header>
                  <p>
                     Les dates limites sont le {limitDate.before.format('DD/MM/YYYY')} et le {limitDate.after.format('DD/MM/YYYY')}{' '}
                  </p>
               </Message>
            ) : (
               ''
            )}
            <MainSegmentGroup>
               <Segment basic>
                  <BodyMenu />
               </Segment>
               <Segment basic>
                  <CalendarGrid />
               </Segment>
            </MainSegmentGroup>
         </Grid.Column>
      </Grid>
   )
}

export default MainBody
